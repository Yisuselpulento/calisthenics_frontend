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

/* -------------------- GET FEED EVENTS -------------------- */
export const getFeedEventsService = async (page = 1, limit = 20) =>
  handleRequest(
    axiosInstance.get(`/api/feed?page=${page}&limit=${limit}`)
  );
