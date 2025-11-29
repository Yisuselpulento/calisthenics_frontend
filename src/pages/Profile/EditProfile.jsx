import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import SelectCustom from "../../components/SelectCustom";
import TeamButtonProfile from "../../components/Profile/TeamButtonProfile";
import { updateProfileService, updateAdvancedProfileService } from "../../Services/ProfileFetching";
import SubmitButton from "../../components/Buttons/SubmitButton";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { currentUser, updateCurrentUser } = useAuth();


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: currentUser.username,
    country: currentUser.country || "",
    videoProfile: currentUser.videoProfile || "",
    avatar: currentUser.avatar || "",
    altura: currentUser.altura || "",
    peso: currentUser.peso || "",
    type: currentUser.type || "",
    profileType: currentUser.profileType || "static",
    email: currentUser.email || "",
    password: "",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if ((name === "avatar" || name === "videoProfile") && files?.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // ------------------ Normal profile ------------------
    const normalData = new FormData();
    normalData.append("peso", formData.peso);
    normalData.append("altura", formData.altura);
    normalData.append("country", formData.country);

    if (formData.avatar instanceof File) normalData.append("avatar", formData.avatar);
    if (formData.videoProfile instanceof File) normalData.append("videoProfile", formData.videoProfile);

    const normalRes = await updateProfileService(normalData);
    if (!normalRes.success) throw new Error(normalRes.message);

    // ------------------ Advanced profile ------------------
    if (showAdvanced) {
      const advancedData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profileType: formData.profileType,
        country: formData.country,
      };

      const advancedRes = await updateAdvancedProfileService(advancedData);
      if (!advancedRes.success) throw new Error(advancedRes.message);

      updateCurrentUser(advancedRes.user);
    } else {
      updateCurrentUser(normalRes.user);
    }

    toast.success("Perfil actualizado correctamente!");
    navigate(`/profile/${formData.username}`);
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error(error.message || "Error actualizando perfil");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-2 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Editar perfil</h2>

        {/* BOTONES DE ACCIÓN */}
        <div className="flex gap-2">
          <Link
            to={`/profile/${currentUser.username}/add-skill`}
            className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 rounded-md transition"
          >
            + Skill
          </Link>
          <Link
            to={`/profile/${currentUser.username}/combos/add`}
            className="px-3 py-1 text-sm bg-primary hover:bg-primary/80 rounded-md transition"
          >
            + Combo
          </Link>
          <TeamButtonProfile />
        </div>
      </div>
      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto bg-white/10 p-4 rounded-md backdrop-blur-md border border-white/20"
      >
        {/* Avatar */}
        <div>
          <label className="block text-sm mb-1">Avatar</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="text-xs"
          />
          {formData.avatar && (
            <img
              src={formData.avatar instanceof File ? URL.createObjectURL(formData.avatar) : formData.avatar}
              alt="preview"
              className="w-20 h-20 mt-2 rounded-full border object-cover"
            />
          )}
        </div>

        {/* Video Profile */}
        <div>
          <label className="block text-sm mb-1">Video de perfil</label>
          <input
            type="file"
            name="videoProfile"
            accept="video/*"
            onChange={handleChange}
            className="text-xs"
          />
          {formData.videoProfile && (
            <video
              src={formData.videoProfile instanceof File ? URL.createObjectURL(formData.videoProfile) : formData.videoProfile}
              controls
              className="w-full rounded-md mt-2"
            />
          )}
        </div>

        {/* Campos normales */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm mb-1">Altura (m)</label>
            <input
              type="number"
              step="0.01"
              name="altura"
              value={formData.altura}
              onChange={handleChange}
              className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20 focus:border-white/40"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">Peso (kg)</label>
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20 focus:border-white/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">País</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20 focus:border-white/40"
          />
        </div>

        {/* Campos avanzados */}
        {showAdvanced && (
          <>
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20 focus:border-white/40"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20 focus:border-white/40"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20 focus:border-white/40"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Tipo de atleta</label>
              <SelectCustom
                value={formData.profileType}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, profileType: value }))
                }
                options={[
                  { value: "static", label: "Static" },
                  { value: "dynamic", label: "Dynamic" },
                ]}
              />
            </div>
            
          </>
        )}

     <div className="max-w-md mx-auto mb-4">
        <button
          type="button"
          onClick={() => setShowAdvanced((prev) => !prev)}
          className="w-full text-blue-400 hover:text-blue-400/80 text-sm rounded-md transition"
        >
          {showAdvanced ? "Ocultar avanzadas" : "mostrar avanzadas"}
        </button>
      </div>
         <SubmitButton loading={loading} text="Guardar Cambios" type="submit"  />
      </form>
    </div>
  );
};

export default EditProfile;
