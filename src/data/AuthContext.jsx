// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { loginRequest, getUsers, getUniversities, getBoardMembers, logoutRequest, fetchUserRole, getEvents, getPosts, getUsersProfiles } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token , setToken] = useState(null)
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const [universities , setUniversities] = useState([])
  const [boardMembers , setBoardMembers] = useState([])
  const [events , setEvents] = useState([])
  const [posts , setPosts] = useState([])


  const [users , setUsers] = useState([])
  const [profiles , setProfiles] = useState([])


  useEffect(() => {
    async function fetchUnis() {
      try {
        const unis = await getUniversities();
        if (unis) setUniversities(unis);
        const board = await getBoardMembers()
        if(board) setBoardMembers(board)
        const news = await getPosts()
        if(news) setPosts(news)
      } catch (error) {
        console.error("Failed to fetch universities or board or news:", error.message);
      }
    }
    fetchUnis();
  }, []);

  useEffect(() => {
  console.log("🟢 isLoggedIn changed:", isLoggedIn);
  if(isLoggedIn){
    const data = getEvents().then((res) => {
      setEvents(res)
      console.log("Events data:", res);
    }).catch((err) => {
      console.error("Failed to fetch events:", err.message);
    });
  }
  }, [isLoggedIn]);

  
  // login function
  const login = async (email, password) => {
    try {
      
      
      const token = await loginRequest(email, password);
      setToken(token);
      setIsLoggedIn(true);        
      const data = await fetchUserRole();

      // console.log("this is the data from get users", data);
      

      if (data) {
        // console.log("User role data:", data);
        const userData = {
          email: email,
          roles: data.roles,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        // console.log(userData);

      } else {
        console.error("Login failed: No token received");
        // setIsLoggedIn(false)
      }
      const users_data = await getUsers()
      if(users_data){
        setUsers(users_data)
      }
      const users_prof = await getUsersProfiles()
      if(users_prof){
        console.log(users_prof);
        
        setProfiles(users_prof)
      }
      
    } catch (error) {
      console.error("Login error:", error.message);
      // setIsLoggedIn(false)
    }
  };

  // logout function
  const logout = async () => {
    await logoutRequest();
    setUser(null);
    console.log("logout done");
    setIsLoggedIn(false)
    
    localStorage.removeItem("user");
  };

  // Keep user logged in after refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, universities, boardMembers, users , isLoggedIn , events, posts, profiles }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
