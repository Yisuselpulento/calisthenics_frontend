import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";

const VsButton = ({ opponent }) => {
  const navigate = useNavigate();
  const [showSelect, setShowSelect] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { currentUser } = useAuth();

  const handleToggle = () => {
    setShowSelect(!showSelect);
    setErrorMsg(""); // limpiar mensaje al abrir/cerrar
  };

  const handleSelect = (type) => {
    const hasCurrentCombo = currentUser.combos.some((c) => c.type === type);
    const hasOpponentCombo = opponent.combos.some((c) => c.type === type);

    if (!hasCurrentCombo || !hasOpponentCombo) {
      const msg = `⚠️ ${
        !hasCurrentCombo && !hasOpponentCombo
          ? "Ninguno de los dos tiene"
          : !hasCurrentCombo
          ? `${currentUser.name} no tiene`
          : `${opponent.name} no tiene`
      } un combo de tipo "${type.toUpperCase()}". Selecciona otro.`;

      setErrorMsg(msg);
      return;
    }

    setErrorMsg(""); // limpiar mensaje si todo está OK

    const matchId = `${currentUser.username}-vs-${opponent.username}-${type}-${uuidv4().slice(0, 6)}`;

    navigate(`/match/${matchId}`, {
      state: {
        currentUser,
        opponent,
        type,
      },
    });
  };

  return (
    <div className="relative flex flex-col items-center">

      {/* VS Button */}
      <button
        onClick={handleToggle}
        className="flex items-center justify-center h-20 w-20 mt-20 border-white border rounded-full backdrop-blur-md hover:bg-white/10 transition"
      >
        <img src="/vsimage.png" alt="VS" className="h-16" />
      </button>

      {/* Dropdown */}
      {showSelect && (
        <div className="absolute w-[300px] bottom-[-50px] rounded-xl p-1 grid grid-cols-3 gap-1 shadow-xl">

          <button
            onClick={() => handleSelect("static")}
            className="px-2 py-2 bg-stone-800 hover:bg-stone-700 rounded-lg text-white text-xs font-semibold transition"
          >
            Static
          </button>

          <button
            onClick={() => handleSelect("dynamic")}
            className="px-2 py-2 bg-stone-800 hover:bg-stone-700 rounded-lg text-white text-xs font-semibold transition"
          >
            Dynamic
          </button>

          <button
            onClick={() => handleSelect("mixed")}
            className="px-2 py-2 bg-stone-800 hover:bg-stone-700 rounded-lg text-white text-xs font-semibold transition"
          >
            Mixed
          </button>
        </div>
      )}

      {/* Mensaje de error */}
      {errorMsg && (
        <p className="text-red-500 text-xs mt-3 max-w-[260px] text-center">
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default VsButton;
