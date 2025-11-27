import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const styleInput =
    "bg-stone-800 mt-1 p-2 w-full border border-gray-300 rounded-md";

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profileType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!formData.gender) {
      toast.error("Debes seleccionar un género");
      return;
    }

    if (!formData.profileType) {
      toast.error("Debes seleccionar un tipo de perfil");
      return;
    }

    setLoading(true);

    const res = await signup(formData);

    if (!res.success) {
      toast.error(res.message || "Error al registrarse");
      setLoading(false);
      return;
    }

    toast.success("Cuenta creada correctamente!");

    navigate("/");
  };

  return (
    <div className="min-h-screen p-2 h-full flex items-center justify-center flex-col">
      <p className="text-xl font-bold mb-4">Regístrate</p>

      <form
        className="w-full backdrop-blur-md border border-white/20 shadow-md p-5 rounded-lg flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="fullName">Nombre completo</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={styleInput}
            required
          />
        </div>

        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="_monsster_"
            value={formData.username}
            onChange={handleChange}
            className={styleInput}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styleInput}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styleInput}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styleInput}
            required
          />
        </div>

        <div>
          <label htmlFor="gender">Género</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styleInput}
            required
          >
            <option value="" disabled hidden>
              Seleccionar género
            </option>
            <option value="female">Mujer</option>
            <option value="male">Hombre</option>
          </select>
        </div>

        <div>
          <label htmlFor="profileType">Tipo de perfil</label>
          <select
            id="profileType"
            name="profileType"
            value={formData.profileType}
            onChange={handleChange}
            className={styleInput}
            required
          >
            <option value="" disabled hidden>
              Seleccionar tipo de perfil
            </option>
            <option value="static">Static</option>
            <option value="dynamic">Dynamic</option>
          </select>
        </div>

        <SubmitButton 
          loading={loading} 
          text="Registrarse" 
          type="submit"
        />

        <div className="items-center justify-center flex flex-col mt-4">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link className="text-primary hover:text-primary/60" to="/login">
              inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
