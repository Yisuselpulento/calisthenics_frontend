import { Link } from "react-router-dom";

const Login = () => {
  const styleInput = "bg-stone-800 mt-1 p-2 w-full border border-gray-300 rounded-md";

  return (
    <div className="min-h-screen p-2 h-full flex items-center justify-center flex-col"> 
      <p className="text-2xl font-bold mb-4">Inicia sesión</p>
      <form className="backdrop-blur-md border border-white/20 shadow-md p-5 rounded-lg flex flex-col gap-4 w-full">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styleInput}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className={styleInput}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary/80 text-white p-2 rounded-md"
        >
          Inicia sesión
        </button>

        <div className="items-center justify-center flex flex-col mt-4">
          <p>
            ¿No tienes una cuenta? Regístrate{" "}
            <Link className="text-primary hover:text-primary/60" to="/signup">
              aquí
            </Link>
          </p>

          <Link
            className="text-primary hover:text-primary/60"
            to="/forgot-password"
          >
            Olvidé mi contraseña
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
