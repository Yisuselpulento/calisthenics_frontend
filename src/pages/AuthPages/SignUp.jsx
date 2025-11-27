import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth(); // 🔥 Usando register del AuthContext
  const [loading, setLoading] = useState(false);

  const styleInput =
    "bg-stone-800 mt-1 p-2 w-full border border-gray-300 rounded-md";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
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
          <label htmlFor="fullName">Name</label>
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
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
          <label htmlFor="confirmPassword">Confirm Password</label>
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
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styleInput}
            required
          >
            <option value="" disabled hidden>
              Select Gender
            </option>
            <option value="female">Mujer</option>
            <option value="male">Hombre</option>
          </select>
        </div>

        <SubmitButton loading={loading} text="Registrarme" />

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
