import { useNavigate } from "react-router-dom";

const HistorialCard = ({ match, type }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/match/${match._id}`)}
      className="bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-md p-4 border border-white/20 hover:border-indigo-400 transition cursor-pointer"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <img
            src={match.opponent.avatar.url}
            alt={match.opponent.username}
            className="w-10 h-10 rounded-full object-cover"
          />

          <span className="font-semibold">
            vs {match.opponent.username}
          </span>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            match.result === "win"
              ? "bg-green-600/30 text-green-400"
              : match.result === "loss"
              ? "bg-red-600/30 text-red-400"
              : "bg-gray-600/30 text-gray-300"
          }`}
        >
          {match.result.toUpperCase()}
        </span>
      </div>

      {/* BODY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-300">
        <span>
          <strong>Modo:</strong> {match.mode}
        </span>

        <span>
          <strong>Puntos:</strong> {match.points}
        </span>

        {type === "ranked" && (
          <span>
            <strong>ELO:</strong> {match.eloBefore} → {match.eloAfter}
          </span>
        )}

        <span>
          {new Date(match.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default HistorialCard;
