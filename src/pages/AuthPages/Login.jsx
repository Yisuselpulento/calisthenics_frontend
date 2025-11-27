import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { useAuth } from "../../context/AuthContext"; // 🔥 IMPORTANTE

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔥 Usando login del AuthContext

  const [loading, setLoading] = useState(false);

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

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={styleInput}
            value={formData.password}
            onChange={handleChange}
            required
          />
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
