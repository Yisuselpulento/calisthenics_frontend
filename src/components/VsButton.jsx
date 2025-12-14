import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

const VsButton = ({ opponent }) => {
  const { currentUser } = useAuth();
  const socket = useSocket();

  const [showSelect, setShowSelect] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [waiting, setWaiting] = useState(false); // indicador de espera

  const handleToggle = () => {
    setShowSelect(!showSelect);
    setErrorMsg("");
  };

  const handleSelect = (type) => {
    if (!socket) return;

    const myFav = currentUser.favoriteCombos?.[type];
    const opponentFav = opponent.favoriteCombos?.[type];

    console.log(myFav)
    console.log(opponentFav)

    if (!myFav || !opponentFav) {
      const msg = `${
        !myFav && !opponentFav
          ? "Ninguno de los dos tiene"
          : !myFav
          ? `${currentUser.username} no tiene`
          : `${opponent.username} no tiene`
      } un combo favorito de tipo "${type.toUpperCase()}"`;

      setErrorMsg(msg);
      return;
    }

    // ✔ Enviar desafío al backend vía socket
    setShowSelect(false);
  setErrorMsg("");
  setWaiting(true);

    socket.emit(
    "challengeRequest",
    {
      fromUserId: currentUser._id,
      toUserId: opponent._id,
      type,
    },
    (response) => {
      if (!response?.success) {
        setWaiting(false);
        setErrorMsg("No se pudo enviar el desafío");
      }
    }
  );
  };

  if (!currentUser || currentUser._id === opponent._id) {
  return null;
}

  return (
    <div className="relative items-center z-10 min-h-20">
      {/* VS Button */}
      <button
        onClick={handleToggle}
        className="flex items-center justify-center h-20 w-20 mt-20 border-white border rounded-full backdrop-blur-md hover:bg-white/10 transition"
      >
        <img src="/vsimage.png" alt="VS" className="h-16" />
      </button>

      {/* Dropdown */}
      {showSelect && !waiting && (
        <div className="absolute left-1/2 -bottom-14 -translate-x-1/2 w-[140px] rounded-xl p-1 grid grid-cols-2 gap-1 shadow-xl bg-stone-800 z-20">
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

      {/* Esperando respuesta */}
      {waiting && (
        <p className="absolute -bottom-25 left-1/2 -translate-x-1/2 text-yellow-400 text-sm text-center w-[260px]">
          Esperando respuesta del oponente...
        </p>
      )}

      {/* Error message */}
      {errorMsg && (
        <p className="absolute -bottom-25 left-1/2 -translate-x-1/2 text-red-500 text-sm text-center w-[260px]">
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default VsButton;
