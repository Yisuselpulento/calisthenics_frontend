import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";

const VsButton = ({ opponent }) => {
  const navigate = useNavigate();
  const [showSelect, setShowSelect] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const { currentUser } = useAuth();

  const handleClick = () => setShowSelect(!showSelect);

  const handleSelect = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    if (!type) return;

    const hasCurrentCombo = currentUser.combos.some((c) => c.type === type);
    const hasOpponentCombo = opponent.combos.some((c) => c.type === type);

    if (!hasCurrentCombo || !hasOpponentCombo) {
      alert(
        `⚠️ ${
          !hasCurrentCombo && !hasOpponentCombo
            ? "Ninguno de los dos tiene"
            : !hasCurrentCombo
            ? `${currentUser.name} no tiene`
            : `${opponent.name} no tiene`
        } un combo de tipo "${type.toUpperCase()}". Selecciona otro.`
      );
      return;
    }

    // Generar ID único
    const matchId = `${currentUser.username}-vs-${opponent.username}-${type}-${uuidv4().slice(0, 6)}`;

    // Enviar datos del match al estado de la ruta
    navigate(`/vs/${matchId}`, {
      state: {
        currentUser,
        opponent,
        type,
      },
    });
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={handleClick}
        className="flex items-center justify-center h-20 w-20 mt-20 border-white border rounded-full backdrop-blur-md hover:bg-white/10 transition"
      >
        <img src="/vsimage.png" alt="VS" className="h-16" />
      </button>

      {showSelect && (
        <select
          onChange={handleSelect}
          value={selectedType}
          className="absolute bottom-[-60px] bg-stone-800 text-white border border-stone-700 rounded-lg px-3 py-1 mt-2"
        >
          <option value="">Seleccionar tipo...</option>
          <option value="static">Static</option>
          <option value="dynamic">Dynamic</option>
          <option value="mixed">Mixed</option>
        </select>
      )}
    </div>
  );
};

export default VsButton;
