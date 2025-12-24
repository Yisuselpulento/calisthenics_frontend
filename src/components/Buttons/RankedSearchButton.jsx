import { useSocket } from "../../context/SocketContext";
import { useState } from "react";

export default function RankedSearchButton() {
  const socket = useSocket();
  const [searching, setSearching] = useState(false);

  const startSearch = () => {
    socket.emit("ranked:search", { mode: "static" });
    setSearching(true);
  };

  const cancelSearch = () => {
    socket.emit("ranked:cancel", { mode: "static" });
    setSearching(false);
  };

  return (
    <button
      onClick={searching ? cancelSearch : startSearch}
      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
        searching
          ? "bg-red-600 hover:bg-red-500"
          : "bg-yellow-500 hover:bg-yellow-400"
      }`}
    >
      {searching ? "Cancelar búsqueda" : "Buscar Ranked"}
    </button>
  );
}
