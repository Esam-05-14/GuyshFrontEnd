// // src/context/AuthContext.js
// import { createContext, useState, useEffect, useContext } from "react";
// import {
//   loginRequest,
//   getUsers,
//   getUniversities,
//   getBoardMembers,
//   logoutRequest,
//   fetchUserRole,
//   getEvents,
//   getPosts,
//   getUsersProfiles,
//   getBoardMembers_Admin,
//   getMyProfile,
//   checkTokenValidity
// } from "../services/authService";
// import i18n from "../i18n";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {

//   const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");

  
//   useEffect(() => {
//     i18n.changeLanguage(language);
//     document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
//     localStorage.setItem("lang", language);
//   }, [language]);
//   const changeLanguage = (lang) => setLanguage(lang);

//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true); // ✅ add loading flag
//   const [myProfile , setMyProfile] = useState(null);

//   const [universities, setUniversities] = useState([]);
//   const [boardMembers, setBoardMembers] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [profiles, setProfiles] = useState([]);
//   const [boardMembers_A, setBoardMembers_A] = useState([]);

//   // Initial data (public content)
//   useEffect(() => {
//     async function fetchUnis() {
//       try {
//         const unis = await getUniversities();
//         if (unis) setUniversities(unis);
//         // console.log(unis)
//         const board = await getBoardMembers(language);
//         if (board) setBoardMembers(board);
//         // console.log(boardMembers);
        
//         const news = await getPosts();
//         if (news) setPosts(news);
//         // console.log(news);
        
        
//       } catch (error) {
//         console.error("Failed to fetch universities or board or news:", error.message);
//       }
//     }
//     fetchUnis();
//   }, [language]);

//   // Fetch events when logged in
//   useEffect(() => {
//     if (isLoggedIn && user.roles.is_member) {
//       getEvents()
//         .then((res) => setEvents(res))
//         .catch((err) => console.error("Failed to fetch events:", err.message));
//     }
//   }, [isLoggedIn]);

//   // ✅ LOGIN FUNCTION
//   const login = async (email, password) => {
//   try {
//     const token = await loginRequest(email, password);
//     if(!token) {
//       return false;
//     }
//     setToken(token);

//     const data = await fetchUserRole();
//     if (!data) {
//       console.error("Invalid login: user not found");
//       return false;
//     }

//     const profile = await getMyProfile()
    
//     setMyProfile(profile)
    

//     const userData = { email, roles: data };
//     setUser(userData);
//     setIsLoggedIn(true);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.setItem("UserProfile",JSON.stringify(profile))

//     // ✅ Only fetch admin data if the logged user is superuser
//     if (data.is_superuser) {
//       const users_data = await getUsers();
//       if (users_data) setUsers(users_data);

//       const users_prof = await getUsersProfiles();
//       if (users_prof) setProfiles(users_prof);

//       const boards_A = await getBoardMembers_Admin();
//       if (boards_A) setBoardMembers_A(boards_A);
//     }
//     return true;
//   } catch (error) {
//     console.error("Login error:", error.message);
//     return false;
//   }
// };


//   // ✅ LOGOUT FUNCTION
//   const logout = async () => {
//     await logoutRequest();
//     setToken(null); // Clear token state
//     setUser(null);
//     setIsLoggedIn(false);
//     localStorage.removeItem("token"); // Clear token from storage
//     localStorage.removeItem("user");
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("UserProfile");
//   };

//   // ✅ Keep user logged in after refresh
//   useEffect(() => {
//     async function initializeAuth() {
//       const savedUser = localStorage.getItem("user");
//       const savedLogin = localStorage.getItem("isLoggedIn");
//       const storedProfile = localStorage.getItem("UserProfile");
//       const storedToken = localStorage.getItem("token"); // Assuming you store the token

//       if (savedUser && savedLogin === "true" && storedToken) {
//         setToken(storedToken); // Set the token in state

//         try {
//           // 1. Check the token validity
//           const remainingSeconds = await checkTokenValidity();

//           if (remainingSeconds > 60) {
//             // Token is valid (e.g., more than 60 seconds left)
//             setUser(JSON.parse(savedUser));
//             setIsLoggedIn(true);

//             if (storedProfile) {
//               setMyProfile(JSON.parse(storedProfile));
//             }
            
//             // Re-fetch admin/member data if necessary, as roles might be in savedUser
//             const roles = JSON.parse(savedUser).roles;
//             if (roles && roles.is_superuser) {
//                 // Ideally, re-fetch admin data here or lazily load it later
//             }

//           } else {
//             // 2. Token is expired or nearly expired (<= 60 seconds)
//             console.log("Token expired or nearly expired. Logging out.");
//             // Force a clean logout to clear storage and state
//             logout(); // Call the logout function to clean up
//           }
//         } catch (err) {
//           console.error("Token check failed:", err);
//           // 3. Handle network/API error by logging out or letting the user try again
//           logout();
//         }
//       }

//       setLoading(false); // Mark that we’ve finished checking
//     }

//     initializeAuth();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         user,
//         login,
//         logout,
//         universities,
//         boardMembers,
//         users,
//         isLoggedIn,
//         events,
//         posts,
//         setPosts,
//         profiles,
//         boardMembers_A,
//         loading,
//         myProfile,
//         setMyProfile,
//         language,
//         changeLanguage,
//         setLoading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook
// export function useAuth() {
//   return useContext(AuthContext);
// }


// src/context/AuthContext.js

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
  // ✅ New import for token check
  checkTokenValidity, 
  getActivateVersions
} from "../services/authService"; // Ensure checkTokenValidity is available
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
    // setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    setMyProfile(null);
    setEvents([]);
    setUsers([]);
    setProfiles([]);
    setBoardMembers_A([]);

    // Clear local storage
    // localStorage.removeItem("token");
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
      const profile = await getMyProfile();

      if (!roles ) {
        console.error("Login failed: User roles  not found.");
        logout(); // Cleanup if data fetch fails after getting token
        return false;
      }

      // C. Set Auth State
      const userData = { email, roles };
      setUser(userData);
      setMyProfile(profile);
      setIsLoggedIn(true);

      // D. Persist user data
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("UserProfile", JSON.stringify(profile));
      
      return true;
    } catch (error) {
      console.error("Login error:", error.message);
      return false;
    }
  };


  // ===============================================
  // 4. SIDE EFFECT: Initial Hydration & Token Check
  //    (Runs once on load)
  // ===============================================
  useEffect(() => {
    async function initializeAuth() {
      const savedUser = localStorage.getItem("user");
      const savedLogin = localStorage.getItem("isLoggedIn");
      const storedToken = localStorage.getItem("token"); // Use stored token

      // Check if we have persistent login data
      if (savedUser && savedLogin === "true" && storedToken) {
        try {
          // A. Check token validity
          const remainingSeconds = await checkTokenValidity();

          if (remainingSeconds > 60) {
            // Token is VALID (more than 60 seconds left)
            const userParsed = JSON.parse(savedUser);
            const profileParsed = JSON.parse(localStorage.getItem("UserProfile"));

            setToken(storedToken);
            setUser(userParsed);
            setMyProfile(profileParsed);
            setIsLoggedIn(true);

          } else {
            // B. Token EXPIRED
            console.warn("Token expired or invalid. Logging out.");
            await logout(); // Use logout for cleanup
          }
        } catch (err) {
          // C. API/Network Error during check
          console.error("Token validation failed, logging out:", err);
          await logout();
        }
      }

      setLoading(false); // Auth check complete
    }

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only runs on component mount

  // ===============================================
  // 5. SIDE EFFECT: Fetch Public Data
  //    (Runs on mount and language change)
  // ===============================================
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const [unis, board, news, versions] = await Promise.all([
          getUniversities(),
          getBoardMembers(language),
          getPosts(),
          getActivateVersions()
        ]);

        if (unis) setUniversities(unis);
        if (board) setBoardMembers(board);
        if (news) setPosts(news);
        if (versions) setVersions(versions);
        console.log(versions);

      } catch (error) {
        console.error("Failed to fetch public data:", error.message);
      }
    };
    fetchPublicData();
  }, [language]);

  // ===============================================
  // 6. SIDE EFFECT: Fetch Member/Admin Data
  //    (Runs when user state changes)
  // ===============================================
  useEffect(() => {
    // Clear private data when user logs out
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

    // B. Fetch Admin Data (Efficiently separated from login flow)
    if (user.roles?.is_superuser) {
      Promise.all([
        getUsers(),
        getUsersProfiles(),
        getBoardMembers_Admin()
      ])
      .then(([u, p, b]) => {
        setUsers(u);
        setProfiles(p);
        setBoardMembers_A(b);
      })
      .catch((err) => console.error("Failed to fetch admin data:", err.message));
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
        setPosts, // Retained for utility outside of context
        users,
        profiles,
        boardMembers_A,
        versions,

        // LANGUAGE
        language,
        changeLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}