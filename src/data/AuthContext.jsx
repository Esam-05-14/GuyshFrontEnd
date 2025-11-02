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
  getMyProfile
} from "../services/authService";
import i18n from "../i18n";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");

  
  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", language);
  }, [language]);
  const changeLanguage = (lang) => setLanguage(lang);

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ add loading flag
  const [myProfile , setMyProfile] = useState(null);

  const [universities, setUniversities] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [boardMembers_A, setBoardMembers_A] = useState([]);

  // Initial data (public content)
  useEffect(() => {
    async function fetchUnis() {
      try {
        const unis = await getUniversities();
        if (unis) setUniversities(unis);
        const board = await getBoardMembers(language);
        if (board) setBoardMembers(board);
        // console.log(boardMembers);
        
        const news = await getPosts();
        if (news) setPosts(news);
        // console.log(news);
        
      } catch (error) {
        console.error("Failed to fetch universities or board or news:", error.message);
      }
    }
    fetchUnis();
  }, [language]);

  // Fetch events when logged in
  useEffect(() => {
    if (isLoggedIn && user.roles.is_member) {
      getEvents()
        .then((res) => setEvents(res))
        .catch((err) => console.error("Failed to fetch events:", err.message));
    }
  }, [isLoggedIn]);

  // ✅ LOGIN FUNCTION
  const login = async (email, password) => {
  try {
    const token = await loginRequest(email, password);
    if(!token) {
      return false;
    }
    setToken(token);

    const data = await fetchUserRole();
    if (!data) {
      console.error("Invalid login: user not found");
      return false;
    }

    const profile = await getMyProfile()
    
    setMyProfile(profile)
    

    const userData = { email, roles: data };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("UserProfile",JSON.stringify(profile))

    // ✅ Only fetch admin data if the logged user is superuser
    if (data.is_superuser) {
      const users_data = await getUsers();
      if (users_data) setUsers(users_data);

      const users_prof = await getUsersProfiles();
      if (users_prof) setProfiles(users_prof);

      const boards_A = await getBoardMembers_Admin();
      if (boards_A) setBoardMembers_A(boards_A);
    }
    return true;
  } catch (error) {
    console.error("Login error:", error.message);
    return false;
  }
};


  // ✅ LOGOUT FUNCTION
  const logout = async () => {
    await logoutRequest();
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  // ✅ Keep user logged in after refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedLogin = localStorage.getItem("isLoggedIn");
    const storedProfile = localStorage.getItem("UserProfile");

    if ( savedUser && savedLogin === "true") {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
      // setMyProfile(storedProfile);
      if (storedProfile) {
        try {
        setMyProfile(JSON.parse(storedProfile));
        } catch (err) {
          console.error("Failed to parse stored profile:", err);
        }
      }
    }


    setLoading(false); // ✅ mark that we’ve finished checking
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        universities,
        boardMembers,
        users,
        isLoggedIn,
        events,
        posts,
        setPosts,
        profiles,
        boardMembers_A,
        loading,
        myProfile,
        setMyProfile,
        language,
        changeLanguage,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}
