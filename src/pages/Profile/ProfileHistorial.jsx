import { useEffect, useState } from "react";
import {
  getMyRankedHistory,
  getMyCasualHistory,
} from "../../Services/matchFetching.js";
import HistorialCard from "../../components/Profile/HistorialCard";
import toast from "react-hot-toast";

const ProfileHistorial = () => {
  const [tab, setTab] = useState("ranked");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async (type) => {
    setLoading(true);

    const res =
      type === "ranked"
        ? await getMyRankedHistory()
        : await getMyCasualHistory();

    if (!res?.success) {
      toast.error(res?.message || "Error al cargar historial");
      setLoading(false);
      return;
    }

    setMatches(res.matches);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory(tab);
  }, [tab]);

  return (
    <div className="p-2 md:p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          Historial de Batallas
        </h2>

        {/* TABS */}
        <div className="flex bg-stone-800 rounded-lg overflow-hidden">
          <button
            onClick={() => setTab("ranked")}
            className={`px-4 py-2 text-sm font-semibold ${
              tab === "ranked"
                ? "bg-yellow-500 text-black"
                : "text-gray-300 hover:bg-stone-700"
            }`}
          >
            Ranked
          </button>
          <button
            onClick={() => setTab("casual")}
            className={`px-4 py-2 text-sm font-semibold ${
              tab === "casual"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-stone-700"
            }`}
          >
            Casual
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-400">Cargando historial...</p>
      ) : matches.length > 0 ? (
        <div className="space-y-3">
          {matches.map((match) => (
            <HistorialCard
              key={match.matchId}
              match={match}
              type={tab}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">
          {tab === "ranked"
            ? "Aún no tienes partidas ranked."
            : "Aún no tienes partidas casual."}
        </p>
      )}
    </div>
  );
};

export default ProfileHistorial;
