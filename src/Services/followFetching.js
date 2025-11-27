import axiosInstance from "../helpers/axiosConfig.js";

const handleRequest = async (request) => {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    console.error("API Error:", error?.response?.data?.message);

    const errorMessage =
      error?.response?.data?.message || "Error inesperado en el servidor";

    return { success: false, message: errorMessage };
  }
};

/* ---------------------- GET FOLLOWERS ---------------------- */
export const getFollowersService = async (userId) =>
  handleRequest(axiosInstance.get(`/api/user-follow/${userId}/followers`));

/* ---------------------- GET FOLLOWING ---------------------- */
export const getFollowingService = async (userId) =>
  handleRequest(axiosInstance.get(`/api/user-follow/${userId}/following`));

/* ---------------------- TOGGLE FOLLOW ---------------------- */
export const toggleFollowService = async (userId) =>
  handleRequest(axiosInstance.post(`/api/user-follow/${userId}/toggle-follow`));
