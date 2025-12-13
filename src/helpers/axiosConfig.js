import axios from 'axios';
import { getCookie } from './cookieHelper.js'; // ✅ importamos la función

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL, 
  withCredentials: true, // muy importante para cookies cross-site
});

// -------------------- INTERCEPTOR PARA SAFARI / iOS --------------------
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token"); // lee la cookie 'token'
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // fallback si Safari no envía cookie
  }
  return config;
});

export default axiosInstance;