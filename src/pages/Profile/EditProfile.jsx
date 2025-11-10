import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { users } from "../../helpers/users";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: currentUser.username,
    country: currentUser.country,
    videoProfile: currentUser.videoProfile,
    avatar: currentUser.avatar,
    altura: currentUser.altura,
    peso: currentUser.peso,
    type: currentUser.type,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files.length > 0) {
      const newAvatar = `/users/${files[0].name}`;
      setFormData((prev) => ({ ...prev, avatar: newAvatar }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Actualiza el currentUser en contexto
    updateCurrentUser(formData);

    // 🔹 Actualiza también el array users (solo simulación local)
    const index = users.findIndex((u) => u._id === currentUser._id);
    if (index !== -1) users[index] = { ...users[index], ...formData };

    // 🔹 Redirigir al perfil
    navigate(`/profile/${formData.username}`);
  };

  return (
    <div className="p-2 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Editar perfil</h2>
        <button
          onClick={() => navigate(`/profile/${currentUser.username}/add-skill`)}
          className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 rounded-md transition"
        >
          + Skill
        </button>
      </div>

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
          <img
            src={formData.avatar}
            alt="preview"
            className="w-20 h-20 mt-2 rounded-full border object-cover"
          />
        </div>

        {/* Username */}
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

        {/* Country */}
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

        {/* Video profile */}
        <div>
          <label className="block text-sm mb-1">Video de perfil (URL)</label>
          <input
            type="text"
            name="videoProfile"
            value={formData.videoProfile}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20 focus:border-white/40"
          />
          <video
            src={formData.videoProfile}
            controls
            className="w-full rounded-md mt-2"
          />
        </div>

        {/* Altura y Peso */}
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

        {/* Tipo */}
        <div>
          <label className="block text-sm mb-1">Tipo de atleta</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20 focus:border-white/40"
          >
            <option value="static">Static</option>
            <option value="dynamic">Dynamic</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        {/* Botón guardar */}
        <button
          type="submit"
          className="w-full py-2 mt-3 bg-blue-600 hover:bg-blue-700 rounded-md text-sm transition"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
