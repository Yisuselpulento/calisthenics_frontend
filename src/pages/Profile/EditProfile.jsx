import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { updateProfileService } from "../../Services/ProfileFetching";
import SubmitButton from "../../components/Buttons/SubmitButton";
import toast from "react-hot-toast";
import TeamButtonProfile from "../../components/Profile/TeamButtonProfile";

const EditProfile = () => {
  const { currentUser, updateViewedProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    country: currentUser.country || "",
    videoProfile: currentUser.videoProfile || "",
    avatar: currentUser.avatar || "",
    altura: currentUser.altura || "",
    peso: currentUser.peso || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if ((name === "avatar" || name === "videoProfile") && files?.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("peso", formData.peso);
      data.append("altura", formData.altura);
      data.append("country", formData.country);

      if (formData.avatar instanceof File) data.append("avatar", formData.avatar);
      if (formData.videoProfile instanceof File) data.append("videoProfile", formData.videoProfile);

      const res = await updateProfileService(data);

      if (!res.success) throw new Error(res.message);

      updateViewedProfile(res.user);

      toast.success("Perfil actualizado!");
      navigate(`/profile/${res.user.username}`);
    } catch (error) {
      toast.error(error.message || "Error actualizando perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Editar perfil</h2>

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

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto bg-white/10 p-4 rounded-md backdrop-blur-md border border-white/20"
      >
        {/* Avatar */}
       <div>
         <label className="block text-sm mb-1">Avatar</label>
              <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />

              <label
                htmlFor="avatar"
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer inline-block transition"
              >
                Seleccionar imagen
              </label>

              {formData.avatar && (
                <img
                  src={
                    formData.avatar instanceof File
                      ? URL.createObjectURL(formData.avatar)
                      : formData.avatar
                  }
                  className="w-20 h-20 mt-2 rounded-full border object-cover"
                />
              )}
            </div>

        {/* Video */}
       <div>
          <label className="block text-sm mb-1">Video de perfil</label>
              <input
                id="videoProfile"
                type="file"
                name="videoProfile"
                accept="video/*"
                onChange={handleChange}
                className="hidden"
              />

              <label
                htmlFor="videoProfile"
                className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded-md cursor-pointer inline-block transition"
              >
                Seleccionar video
              </label>

              {formData.videoProfile && (
                <video
                  src={
                    formData.videoProfile instanceof File
                      ? URL.createObjectURL(formData.videoProfile)
                      : formData.videoProfile
                  }
                  controls
                  className="w-full mt-2 rounded-md"
                />
              )}
            </div>

        {/* Altura y peso */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm mb-1">Altura (m)</label>
            <input
              type="number"
              step="0.01"
              name="altura"
              value={formData.altura}
              onChange={handleChange}
              className="w-full p-2 bg-black/30 rounded-md border text-sm"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm mb-1">Peso (kg)</label>
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              className="w-full p-2 bg-black/30 rounded-md border text-sm"
            />
          </div>
        </div>

        {/* País */}
        <div>
          <label className="block text-sm mb-1">País</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 rounded-md border text-sm"
          />
        </div>
          {/* LINK A EDIT AVANZADO */}
      <Link
        to={`/profile/${currentUser.username}/edit-advanced`}
        className="text-blue-400 underline text-sm mb-2 inline-block"
      >
        Editar opciones avanzadas →
      </Link>

        <SubmitButton loading={loading} text="Guardar Cambios" type="submit" />
      </form>
    </div>
  );
};

export default EditProfile;
