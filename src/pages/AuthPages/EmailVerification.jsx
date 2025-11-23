import { useState, useRef } from "react";

const EmailVerificationCode = () => {
  const [codeToken, setCodeToken] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...codeToken];
    newCode[index] = value;
    setCodeToken(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className="md:p-20 flex flex-col items-center min-h-screen justify-center p-2">
      <div className="dark:bg-opacity-20 backdrop-blur border-[1px] dark:border-stone-900 rounded-lg flex flex-col items-center p-4 md:p-6">
        
        <h2 className="text-2xl font-bold mb-4">Código de Verificación</h2>

        <p className="opacity-70 mb-8">
          Introduce el código enviado a tu correo electrónico.
        </p>

        <form className="flex flex-col gap-2 mb-6">
          <div className="flex gap-2">
            {codeToken.map((num, index) => (
              <input
                key={index}
                type="tel"
                inputMode="numeric"
                maxLength="1"
                value={num}
                onChange={(e) => handleChange(e.target.value, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="md:w-12 md:h-12 w-10 h-10 text-center text-lg font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none dark:bg-stone-900"
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-primary text-white rounded-md p-2 mt-4 hover:bg-primary/80 transition"
          >
            Verificar
          </button>
        </form>

      </div>
    </div>
  );
};

export default EmailVerificationCode;
