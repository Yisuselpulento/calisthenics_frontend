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
    setErrorMsg(""); 
  };

  const handleSelect = (type) => {
    const myFav = currentUser.favoriteCombos?.[type];
    const opponentFav = opponent.favoriteCombos?.[type];

    const hasCurrentCombo = Boolean(myFav);
    const hasOpponentCombo = Boolean(opponentFav);

    if (!hasCurrentCombo || !hasOpponentCombo) {
      const msg = `⚠️ ${
        !hasCurrentCombo && !hasOpponentCombo
          ? "Ninguno de los dos tiene"
          : !hasCurrentCombo
          ? `${currentUser.username} no tiene`
          : `${opponent.username} no tiene`
      } un combo favorito de tipo "${type.toUpperCase()}".`;
      setErrorMsg(msg);
      return;
    }

    // ✔ Navegar al match
    navigate(`/match`, {
      state: {
        opponentId: opponent._id,
        type,
      },
    });
  };

  return (
    <div className="relative items-center">
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
        </div>
      )}

      {/* Error message */}
      {errorMsg && (
        <p className="text-red-500 text-xs mt-3 max-w-[260px] text-center">
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default VsButton;
