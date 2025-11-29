import { createContext, useContext, useEffect, useState } from "react";
import {
  signupService,
  loginService,
  logoutService,
  checkAuthService,
} from "../Services/AuthFetching.js";
import { getProfileByUsernameService } from "../Services/ProfileFetching.js";
import { removeVariantFromSkills } from "../helpers/removeVariantFromSkills";
import { toggleFollowService } from "../Services/followFetching.js";

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

  
  // ------------------ CARGAR PERFIL DE USUARIO ------------------
  const loadProfile = async (username) => {
  // 🟦 Evitar recargar si ya tenemos ese perfil en memoria
  if (viewedProfile?.username === username) return;

  setProfileLoading(true);
  try {
    const res = await getProfileByUsernameService(username);
    if (res.success) setViewedProfile(res.user || res.data);
    else setViewedProfile(null);
  } catch (err) {
    console.error("Error fetching profile:", err);
    setViewedProfile(null);
  } finally {
    setProfileLoading(false);
  }
};

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

  // ------------------ REMOVER VARIANTE DE HABILIDAD ------------------
const removeVariant = (userSkillId, variantKey, fingers) => {
    // Actualizar viewedProfile
    if (viewedProfile) {
      setViewedProfile((prev) => ({
        ...prev,
        skills: removeVariantFromSkills(prev.skills, userSkillId, variantKey, fingers),
      }));
    }
    // Actualizar currentUser si es el mismo
    if (currentUser?.skills.some((s) => s._id === userSkillId)) {
      setCurrentUser((prev) => ({
        ...prev,
        skills: removeVariantFromSkills(prev.skills, userSkillId, variantKey, fingers),
      }));
    }
  };

//SEGUIMIENTO DE USUARIOS TOGGLE FOLLOW
const toggleFollow = async (targetUser) => {
  const isAlreadyFollowing = currentUser.following.some(f => f._id === targetUser._id);

  try {
    const res = await toggleFollowService(targetUser._id); // Llama al backend

    if (res.success) {
      // Actualizar currentUser
      const updatedFollowing = isAlreadyFollowing
        ? currentUser.following.filter(f => f._id !== targetUser._id)
        : [...currentUser.following, { _id: targetUser._id }];

      setCurrentUser(prev => ({ ...prev, following: updatedFollowing }));

      // Actualizar viewedProfile followers si es el perfil del target
      if (viewedProfile?._id === targetUser._id) {
        const updatedFollowers = isAlreadyFollowing
          ? viewedProfile.followers.filter(f => f._id !== currentUser._id)
          : [...(viewedProfile.followers || []), { _id: currentUser._id }];

        setViewedProfile(prev => ({ ...prev, followers: updatedFollowers }));
      }
    } else {
      console.error("No se pudo cambiar el follow en el servidor");
    }
  } catch (err) {
    console.error("Error en toggleFollow:", err);
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
        removeVariant,
        toggleFollow
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
