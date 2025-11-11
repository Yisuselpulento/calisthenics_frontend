import { Link, useNavigate } from "react-router-dom";

const HistorialCard = ({ item, users }) => {
  const navigate = useNavigate();
  const user = users.find((u) => u._id === item.userId);
  const opponent = users.find((u) => u._id === item.opponentId);

  return (
    <div
      onClick={() => navigate(`/vs/${item._id}`)}
      className="bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-md p-4 mb-3 border border-white/20 hover:border-indigo-400 transition cursor-pointer"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <Link
            to={`/profile/${user.username}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 hover:underline"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">{user.name}</span>
          </Link>

          <span className="text-gray-400 text-sm">vs</span>

          <Link
            to={`/profile/${opponent.username}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 hover:underline"
          >
            <img
              src={opponent.avatar}
              alt={opponent.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">{opponent.name}</span>
          </Link>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            item.result === "win"
              ? "bg-green-600/30 text-green-400"
              : "bg-red-600/30 text-red-400"
          }`}
        >
          {item.result.toUpperCase()}
        </span>
      </div>

      <div className="flex justify-between text-sm text-gray-300">
        <span>
          <strong>Modo:</strong> {item.mode}
        </span>
        <span>
          <strong>Puntaje:</strong> {item.score.user} - {item.score.opponent}
        </span>
        <span>{item.duration}</span>
        <span>{new Date(item.date).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default HistorialCard;
