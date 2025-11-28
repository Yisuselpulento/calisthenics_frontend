// reportsFetching.js
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

/* -------------------------- CREATE REPORT -------------------------- */
export const createReportService = async (reportData) =>
  handleRequest(axiosInstance.post("/api/reports", reportData));

/* -------------------------- GET ALL REPORTS (ADMIN) -------------------------- */
export const getAllReportsService = async () =>
  handleRequest(axiosInstance.get("/api/reports"));

/* -------------------------- GET REPORT BY ID -------------------------- */
export const getReportByIdService = async (reportId) =>
  handleRequest(axiosInstance.get(`/api/reports/${reportId}`));

/* -------------------------- UPDATE REPORT STATUS (ADMIN) -------------------------- */
export const updateReportStatusService = async (reportId, updateData) =>
  handleRequest(axiosInstance.put(`/reports/${reportId}`, updateData));
