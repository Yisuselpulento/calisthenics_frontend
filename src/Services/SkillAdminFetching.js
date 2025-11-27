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

/* ------------------ SKILL ADMIN ------------------ */
export const createSkillAdminService = async (skillData) =>
  handleRequest(axiosInstance.post("/api/skills", skillData));

export const getAllSkillsAdminService = async () =>
  handleRequest(axiosInstance.get("/api/skills"));

export const getSkillByKeyAdminService = async (skillKey) =>
  handleRequest(axiosInstance.get(`/api/skills/${skillKey}`));

export const updateSkillAdminService = async (skillKey, skillData) =>
  handleRequest(axiosInstance.put(`/api/skills/${skillKey}`, skillData));

export const deleteSkilldminService = async (skillKey) =>
  handleRequest(axiosInstance.delete(`/api/skills/${skillKey}`));

/* ------------------ ADD VARIANTE A USUARIO ------------------ */
export const addSkillVariantAdminService = async (formData) =>
  handleRequest(
    axiosInstance.post("/api/skills/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );
