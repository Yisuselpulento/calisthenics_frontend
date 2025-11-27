// comboFetching.js
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

/* -------------------------- CREATE COMBO -------------------------- */
export const createComboService = async (comboData) =>
  handleRequest(axiosInstance.post("/combos", comboData));

/* -------------------------- GET USER COMBOS -------------------------- */
export const getUserCombosService = async () =>
  handleRequest(axiosInstance.get("/combos"));

/* -------------------------- GET COMBO BY ID -------------------------- */
export const getComboByIdService = async (comboId) =>
  handleRequest(axiosInstance.get(`/combos/${comboId}`));

/* -------------------------- DELETE COMBO -------------------------- */
export const deleteComboService = async (comboId) =>
  handleRequest(axiosInstance.delete(`/combos/${comboId}`));

/* -------------------------- UPDATE COMBO -------------------------- */
export const updateComboService = async (comboId, updatedData) =>
  handleRequest(axiosInstance.put(`/combos/${comboId}`, updatedData));

/* -------------------------- TOGGLE FAVORITE COMBO -------------------------- */
export const toggleFavoriteComboService = async (comboId) =>
  handleRequest(axiosInstance.post(`/combos/favorite/${comboId}`));
