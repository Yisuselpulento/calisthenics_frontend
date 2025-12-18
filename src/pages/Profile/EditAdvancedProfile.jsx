import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { updateAdvancedProfileService } from "../../Services/ProfileFetching";
import SubmitButton from "../../components/Buttons/SubmitButton";
import toast from "react-hot-toast";
import SelectCustom from "../../components/SelectCustom";

const EditAdvancedProfile = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email || "",
    password: "",
    profileType: currentUser.profileType,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await updateAdvancedProfileService(formData);

    if (!res.success) {
      toast.error(res.message || "Error actualizando perfil avanzado");
      setLoading(false);
      return;
    }

    updateCurrentUser(res.user);
    toast.success("Perfil avanzado actualizado!");
    navigate(`/profile/${res.user.username}`);
    setLoading(false);
  };

  return (
    <div className="p-3 text-white min-h-screen">
      <h2 className="text-xl font-bold mb-4">Edición avanzada</h2>

      <Link
        to={`/profile/${currentUser.username}/edit`}
        className="text-blue-400 underline mb-4 inline-block"
      >
        ← Volver 
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto bg-white/10 p-4 rounded-md backdrop-blur-md border border-white/20"
      >
        {/* Username */}
        <div>
          <label className="block text-sm mb-1">Nuevo username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Nuevo email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">Nueva contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20"
          />
        </div>

        {/* Profile Type */}
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

        <SubmitButton loading={loading} text="Guardar Cambios" type="submit" />
      </form>
    </div>
  );
};

export default EditAdvancedProfile;
