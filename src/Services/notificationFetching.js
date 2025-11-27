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

/* ---------------------- GET USER NOTIFICATIONS ---------------------- */
export const getUserNotificationsService = async () =>
  handleRequest(axiosInstance.get(`/api/notifications`));

/* ---------------------- MARK ONE AS READ ---------------------- */
export const markNotificationAsReadService = async (notificationId) =>
  handleRequest(
    axiosInstance.put(`/api/notifications/${notificationId}/read`)
  );

/* ---------------------- MARK ALL AS READ ---------------------- */
export const markAllNotificationsAsReadService = async () =>
  handleRequest(axiosInstance.put(`/api/notifications/read/all`));
