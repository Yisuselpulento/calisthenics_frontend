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

/* -------------------- GET USER SKILLS -------------------- */
export const getUserSkillsService = async () =>
  handleRequest(axiosInstance.get("/api/user-skills"));

/* -------------------- ADD SKILL VARIANT -------------------- */
export const addSkillVariantService = async (formData) =>
  handleRequest(
    axiosInstance.post("/api/user-skills/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );

/* -------------------- EDIT SKILL VARIANT -------------------- */
export const editSkillVariantService = async (userSkillId, variantKey, fingers, formData) =>
  handleRequest(
    axiosInstance.put(
      `/api/user-skills/edit/${userSkillId}/${variantKey}/${fingers}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
  );

/* -------------------- DELETE SKILL VARIANT -------------------- */
export const deleteSkillVariantService = async (userSkillId, variantKey, fingers) =>
  handleRequest(
    axiosInstance.delete(`/api/user-skills/delete/${userSkillId}/${variantKey}/${fingers}`)
  );

/* -------------------- TOGGLE FAVORITE SKILL -------------------- */
export const toggleFavoriteSkillService = async (userSkillId, variantKey, fingers) =>
  handleRequest(
    axiosInstance.post(`/api/user-skills/favorites/${userSkillId}/${variantKey}/${fingers}`)
  );

/* -------------------- GET FAVORITE SKILLS -------------------- */
export const getFavoriteSkillsService = async () =>
  handleRequest(axiosInstance.get("/api/user-skills/favorites"));

/* -------------------- GET USER SKILL BY ID -------------------- */
export const getUserSkillVariantService = async (userSkillId, variantKey, fingers) =>
  handleRequest(axiosInstance.get(`/api/user-skills/skill/${userSkillId}/${variantKey}/${fingers}`));
