import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { useAuth } from "../../context/AuthContext";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 Toggle password

  const styleInput =
    "bg-stone-800 mt-1 p-2 w-full border border-gray-300 rounded-md";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(formData);

    if (!res.success) {
      toast.error(res.message || "Credenciales incorrectas");
      setLoading(false);
      return;
    }

    toast.success("Bienvenido!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4">
      <p className="text-xl font-bold mb-4">Inicia Sesión</p>

      <form
        className="w-full max-w-md backdrop-blur-md border border-white/20 shadow-md p-5 rounded-lg flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styleInput}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password con toggle */}
        <div className="relative flex flex-col">
          <label htmlFor="password" className="mb-1">Contraseña</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={styleInput + " pr-10"} // espacio para el ojo
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 cursor-pointer text-gray-400"
            >
              {showPassword ? <HiMiniEyeSlash /> : <IoEyeSharp />}
            </span>
          </div>
        </div>

        <SubmitButton 
          loading={loading} 
          text="Iniciar Sesión" 
          type="submit"
        />

        <div className="text-center mt-4">
          <p>
            ¿No tienes cuenta?{" "}
            <Link className="text-primary hover:text-primary/60" to="/signup">
              registrate
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
