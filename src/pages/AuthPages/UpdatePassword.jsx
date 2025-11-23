const UpdatePassword = () => {
  const styleInput =
    "bg-stone-800 mt-1 p-2 w-full border border-gray-300 rounded-md";

  return (
    <div className="md:w-[500px] mx-auto">
      <form
        className="backdrop-blur-md border border-white/20 shadow-md p-5 rounded-lg flex flex-col gap-4"
      >
        <p className="text-md mb-5">
          Introduce tu nueva contraseña para actualizarla.
        </p>

        {/* PASSWORD */}
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <div className="relative">
          <input
            className={styleInput}
            placeholder="password"
            id="password"
            type="password"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <label htmlFor="confirmPassword" className="block mb-2 mt-4">
          Repetir password
        </label>
        <div className="relative">
          <input
            className={styleInput}
            placeholder="confirmar password"
            id="confirmPassword"
            type="password"
          />
        </div>

      </form>
    </div>
  );
};

export default UpdatePassword;
