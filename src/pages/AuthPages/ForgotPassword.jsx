import { Link } from "react-router-dom";

const ForgotPassword = () => {


  const styleInput =
    "bg-stone-800 mt-1 p-2 w-full border border-gray-300 rounded-md";

  return (
    <div className="min-h-screen p-2 h-full flex items-center justify-center flex-col"> 
      <p className="text-xl font-bold mb-4">Recuperar Contraseña</p>

      <form
        className="w-full backdrop-blur-md border border-white/20 shadow-md p-5 rounded-lg flex flex-col gap-4"
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styleInput}
          />
        </div>

      </form>
    </div>
  );
};

export default ForgotPassword;
