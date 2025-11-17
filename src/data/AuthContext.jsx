


import { createContext, useState, useEffect, useContext } from "react";
import {
  loginRequest,
  getUsers,
  getUniversities,
  getBoardMembers,
  logoutRequest,
  fetchUserRole,
  getEvents,
  getPosts,
  getUsersProfiles,
  getBoardMembers_Admin,
  getMyProfile,
  checkTokenValidity, 
  getActivateVersions,
  getAvailableService
} from "../services/authService";
import i18n from "../i18n";

export const AuthContext = createContext();

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // --- LANGUAGE STATE ---
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");
  const changeLanguage = (lang) => setLanguage(lang);

  // --- AUTH STATE ---
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myProfile, setMyProfile] = useState(null);
  
  // service Availbility
  const [activeAirport, setActiveAirport] = useState(false);
  const [activeGuidence, setActiveGuidence] = useState(false);

  // --- APPLICATION DATA STATE (Public & Private) ---
  const [universities, setUniversities] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]); // Public
  const [versions , setVersions] = useState({})
  const [events, setEvents] = useState([]); // Member
  const [posts, setPosts] = useState([]); // Public/News
  const [users, setUsers] = useState([]); // Admin
  const [profiles, setProfiles] = useState([]); // Admin
  const [boardMembers_A, setBoardMembers_A] = useState([]); // Admin

  // ===============================================
  // 1. SIDE EFFECT: Language Change
  // ===============================================
  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", language);
  }, [language]);

  // ===============================================
  // 2. LOGOUT FUNCTION
  // ===============================================
  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Logout API error, proceeding with client-side cleanup:", error.message);
    }
    
    // Clear all client-side state
    setUser(null);
    setIsLoggedIn(false);
    setMyProfile(null);
    setEvents([]);
    setUsers([]);
    setProfiles([]);
    setBoardMembers_A([]);

    // [FIX 1: CRITICAL SECURITY FIX]
    // Token *must* be cleared from state and storage, 
    // otherwise initializeAuth will log the user back in.
    setToken(null);
    localStorage.removeItem("token");
    
    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("UserProfile");
  };

  // ===============================================
  // 3. LOGIN FUNCTION
  // ===============================================
  const login = async (email, password) => {
    try {
      const newToken = await loginRequest(email, password);
      if (!newToken) {
        return false;
      }
      
      // A. Store and set token
      setToken(newToken);
      localStorage.setItem("token", newToken);

      // B. Fetch core user data and profile
      const roles = await fetchUserRole();
      const profile = await getMyProfile(); // This can be null, it's fine.

      // [FIX 2: STABILITY FIX - REVISED]
      // We MUST have roles to proceed.
      // A null profile is acceptable for new users.
      if (!roles) {
        console.error("Login failed: User roles not found.");
        // We log out to clear the partial token
        await logout(); 
        return false;
      }
      // [End of Fix 2]

      // C. Set Auth State
      const userData = { email, roles };
      setUser(userData);
      setMyProfile(profile); // This is fine if profile is null
      setIsLoggedIn(true);

      // D. Persist user data
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      // JSON.stringify(null) is valid and stores "null", which is correct.
      localStorage.setItem("UserProfile", JSON.stringify(profile)); 
      
      return true;
    } catch (error) {
      console.error("Login error:", error.message);
      return false;
    }
  };


  // ===============================================
  // 4. SIDE EFFECT: Initial Hydration & Token Check
  // ===============================================
  useEffect(() => {
    async function initializeAuth() {
      const savedUser = localStorage.getItem("user");
      const savedLogin = localStorage.getItem("isLoggedIn");
      const storedToken = localStorage.getItem("token");

      // [FIX 3: CRITICAL STABILITY FIX]
      // The condition must be AND (&&). If you use OR (||), this block
      // could run with a 'storedToken' but 'savedUser' as null.
      // JSON.parse(savedUser) would then be JSON.parse(null), crashing the app.
      if (savedUser && savedLogin === "true" && storedToken) {
        try {
          // A. Check token validity
          const remainingSeconds = await checkTokenValidity();

          if (remainingSeconds > 60) {
            // Token is VALID
            const userParsed = JSON.parse(savedUser);

            const storedProfile = localStorage.getItem("UserProfile");
            let profileParsed = null; // Default to null
            if (storedProfile && storedProfile !== "undefined" && storedProfile !== "null") {
              try {
                profileParsed = JSON.parse(storedProfile);
              } catch (parseError) {
                // This can happen if the JSON is corrupted (e.g., "[object Object]")
                console.error("Failed to parse stored UserProfile, resetting:", parseError);
                profileParsed = null;
                localStorage.removeItem("UserProfile"); // Clean up corrupted data
              }
            }

            setToken(storedToken);
            setUser(userParsed);
            setMyProfile(profileParsed);
            setIsLoggedIn(true);
          } else {
            // B. Token EXPIRED
            console.warn("Token expired or invalid. Logging out.");
            await logout();
          }
        } catch (err) {
          // C. API/Network Error during check
          console.error("Token validation failed, logging out:", err);
          await logout();
        }
      } else if (storedToken) {
        // Cleanup: If only a token exists (partial/failed login/logout), clear it.
        await logout();
      }
      // [End of Fix 3]

      setLoading(false); // Auth check complete
    }

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only runs on component mount

  // ===============================================
  // 5. SIDE EFFECT: Fetch Public Data
  // ===============================================
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        // [FIX 4: PERFORMANCE & ROBUSTNESS]
        // 1. Fetched all data in parallel (moved getAvailableService inside).
        // 2. Used Promise.allSettled to prevent one failed API (e.g., versions)
        //    from breaking all other public data (e.g., posts).
        const results = await Promise.allSettled([
          getUniversities(),
          getBoardMembers(language),
          getPosts(),
          getActivateVersions(),
          getAvailableService()
        ]);

        // Now we safely check each result
        if (results[0].status === 'fulfilled' && results[0].value) setUniversities(results[0].value);
        if (results[1].status === 'fulfilled' && results[1].value) setBoardMembers(results[1].value);
        if (results[2].status === 'fulfilled' && results[2].value) setPosts(results[2].value);
        if (results[3].status === 'fulfilled' && results[3].value) setVersions(results[3].value);
        
        if (results[4].status === 'fulfilled' && results[4].value) {
          const serviceData = results[4].value;
          setActiveAirport(serviceData.airport_pickup_service);
          setActiveGuidence(serviceData.guidance_service);
        }
        // [End of Fix 4]

      } catch (error) {
        // This catch is for errors *outside* the promises, but allSettled is safer
        console.error("Failed to fetch public data:", error.message);
      }
    };
    fetchPublicData();
  }, [language]); // Runs on mount and language change

  // ===============================================
  // 6. SIDE EFFECT: Fetch Member/Admin Data
  // ===============================================
  useEffect(() => {
    if (!user) {
        setEvents([]);
        setUsers([]);
        setProfiles([]);
        setBoardMembers_A([]);
        return;
    }

    // A. Fetch Member Events
    if (user.roles?.is_member) {
      getEvents()
        .then(setEvents)
        .catch((err) => console.error("Failed to fetch member events:", err.message));
    }

    // B. Fetch Admin Data
    if (user.roles?.is_superuser) {
      // [FIX 5: ROBUSTNESS]
      // Using allSettled here too, so if getUsersProfiles() fails,
      // the admin can still see the list of users and board members.
      Promise.allSettled([
        getUsers(),
        getUsersProfiles(),
        getBoardMembers_Admin()
      ])
      .then(([usersResult, profilesResult, boardResult]) => {
        if (usersResult.status === 'fulfilled') setUsers(usersResult.value);
        if (profilesResult.status === 'fulfilled') setProfiles(profilesResult.value);
        if (boardResult.status === 'fulfilled') setBoardMembers_A(boardResult.value);
      })
      .catch((err) => console.error("Failed to fetch admin data:", err.message));
      // [End of Fix 5]
    }
  }, [user]); // Only run when the user object changes (i.e., on login/logout)


  return (
    <AuthContext.Provider
      value={{
        // AUTH STATE
        token,
        user,
        isLoggedIn,
        loading,
        myProfile,
        
        // AUTH ACTIONS
        login,
        logout,
        setMyProfile,
        setLoading, 
        
        // APP DATA
        universities,
        boardMembers,
        events,
        posts,
        setPosts,
        users,
        profiles,
        boardMembers_A,
        versions,
        activeAirport,
        activeGuidence,

        // LANGUAGE
        language,
        changeLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}