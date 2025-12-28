import { useRankedSocket } from "../../context/RankedSocketContext";
import { useEffect, useState, useRef } from "react";
import SearchTimer from "../SearchTimer";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const MIN_ENERGY_TO_RANKED = 333;

export default function RankedSearchButton() {
  const socket = useRankedSocket();
  const { currentUser } = useAuth();

  const [searching, setSearching] = useState(false);
  const [mode, setMode] = useState("static");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const searchingRef = useRef(false);

  /* =========================
     BUSCAR
  ========================== */
  const startSearch = () => {
    if (searchingRef.current) return;

    if (!currentUser?.stats?.energy || currentUser.stats.energy < MIN_ENERGY_TO_RANKED) {
      toast.error("No tienes energía suficiente para buscar ranked");
      return;
    }

    const hasCombo = currentUser?.favoriteCombos?.[mode];
    if (!hasCombo) {
      toast.error(`No tienes un combo favorito de tipo "${mode}"`);
      return;
    }

    socket.emit("ranked:search", { mode });

    searchingRef.current = true;
    setSearching(true);
  };

  /* =========================
     CANCELAR
  ========================== */
  const cancelSearch = () => {
    socket.emit("ranked:cancel", { mode });

    searchingRef.current = false;
    setSearching(false);
  };

  /* =========================
     CLEANUP AL SALIR
  ========================== */
  useEffect(() => {
    return () => {
      if (searchingRef.current) {
        socket.emit("ranked:cancel", { mode });
      }
    };
  }, [socket, mode]);

  const selectMode = (newMode) => {
    if (searching) return;
    setMode(newMode);
    setDropdownOpen(false);
  };

  const notEnoughEnergy =
    !currentUser?.stats?.energy ||
    currentUser.stats.energy < MIN_ENERGY_TO_RANKED;

  return (
    <div className="flex items-center space-x-2 relative">
      <button
        onClick={searching ? cancelSearch : startSearch}
        disabled={!searching && notEnoughEnergy}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition
          ${
            searching
              ? "bg-red-600 hover:bg-red-500"
              : notEnoughEnergy
              ? "bg-stone-600 cursor-not-allowed opacity-60"
              : "bg-yellow-500 hover:bg-yellow-400"
          }`}
      >
        {searching
          ? `Cancelar búsqueda (${mode})`
          : notEnoughEnergy
          ? "Energía insuficiente"
          : `Buscar ${mode} Ranked`}
      </button>

      {!searching && (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-3 py-2 bg-stone-700 text-white rounded-lg text-sm"
          >
            Modo: {mode}
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-stone-800 border border-stone-600 rounded-lg z-10">
              {["static", "dynamic"].map((m) => (
                <div
                  key={m}
                  onClick={() => selectMode(m)}
                  className="px-4 py-2 hover:bg-stone-600 cursor-pointer"
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <SearchTimer active={searching} />
    </div>
  );
}
