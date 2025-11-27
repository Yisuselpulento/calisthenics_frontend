import { createContext, useContext, useEffect, useState } from "react";
import {
  signupService,
  loginService,
  logoutService,
  checkAuthService,
} from "../Services/AuthFetching.js";
import { getProfileByUsernameService } from "../Services/ProfileFetching.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Nuevo estado para manejar el perfil de cualquier usuario
  const [viewedProfile, setViewedProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const updateCurrentUser = (user) => {
    setCurrentUser(user);
  };

  // ------------------ RESTAURAR SESIÓN AL CARGAR APP ------------------
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await checkAuthService();
        if (data.success) {
          setCurrentUser(data.user);
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  // ------------------ SIGN UP ------------------
  const signup = async (formData) => {
    const res = await signupService(formData);
    if (res.success) {
      setCurrentUser(res.user);
      setIsAuthenticated(true);
    }
    return res;
  };

  // ------------------ LOGIN ------------------
  const login = async (formData) => {
    const res = await loginService(formData);
    if (res.success) {
      setCurrentUser(res.user);
      setIsAuthenticated(true);
    }
    return res;
  };

  // ------------------ LOGOUT ------------------
  const logout = async () => {
    const res = await logoutService();
    if (res.success) {
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
    return res;
  };

  // ------------------ CARGAR PERFIL DE USUARIO ------------------
  const loadProfile = async (username) => {
    setProfileLoading(true);
    try {
      const res = await getProfileByUsernameService(username);
      if (res.success) setViewedProfile(res.user || res.data); // depende de tu API
      else setViewedProfile(null);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setViewedProfile(null);
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        signup,
        login,
        logout,
        updateCurrentUser,

        // Nuevo
        viewedProfile,
        profileLoading,
        loadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
