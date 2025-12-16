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

/* -------------------- SEARCH USERS -------------------- */
export const searchUsersService = async (query) =>
  handleRequest(axiosInstance.get(`/api/users/search?query=${query}`));

export const getRankedLeaderboardService = async () =>
  handleRequest(axiosInstance.get("/api/users/ranked-leaderboard"));
