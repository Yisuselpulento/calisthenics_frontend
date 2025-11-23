import { Link } from "react-router-dom";

const SignUp = () => {
  const styleInput = "bg-stone-800 mt-1 p-2 w-full border border-gray-300 rounded-md";

  return (
    <div className="min-h-screen p-2 h-full flex items-center justify-center flex-col"> 
      <p className="text-xl font-bold mb-4">Regístrate</p>

      <form className="w-full backdrop-blur-md border border-white/20 shadow-md p-5 rounded-lg flex flex-col gap-4">
        <div>
          <label htmlFor="fullName">Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={styleInput}
          />
        </div>

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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={styleInput}
            />
          </div>
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            className={styleInput}
          >
            <option value="" disabled hidden>
              Select Gender
            </option>
            <option value="female">Mujer</option>
            <option value="male">Hombre</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary/80 text-white p-2 rounded-md"
        >
          Regístrate
        </button>

        <div className="items-center justify-center flex flex-col mt-4">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link
              className="text-primary hover:text-primary/60"
              to="/login"
            >
              inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
