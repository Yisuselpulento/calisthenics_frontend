/* import { useParams, useNavigate, Link } from "react-router-dom";
import { historial } from "../helpers/historial";
import { users } from "../helpers/users";
import BackButton from "../components/Buttons/BackButton"; */

const VsDetails = () => {
  /* const { matchId } = useParams();
  const navigate = useNavigate();

  const match = historial.find((m) => m._id === matchId);
  if (!match)
    return (
      <p className="text-white text-center mt-10">Batalla no encontrada.</p>
    );

  const user = users.find((u) => u._id === match.userId);
  const opponent = users.find((u) => u._id === match.opponentId); */

  return (
    <div className="max-w-4xl mx-auto text-white p-4 min-h-screen">
    {/*   <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Detalles del VS</h1>
       <BackButton />
      </div>

    
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Link
              to={`/profile/${user.username}`}
              className="flex items-center gap-2 hover:underline"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="font-semibold text-lg">{user.name}</span>
            </Link>

            <span className="text-gray-400 text-sm font-bold">vs</span>

            <Link
              to={`/profile/${opponent.username}`}
              className="flex items-center gap-2 hover:underline"
            >
              <img
                src={opponent.avatar}
                alt={opponent.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="font-semibold text-lg">{opponent.name}</span>
            </Link>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              match.result === "win"
                ? "bg-green-600/30 text-green-400"
                : "bg-red-600/30 text-red-400"
            }`}
          >
            {match.result.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-300">
          <p>
            <strong>Modo:</strong> {match.mode}
          </p>
          <p>
            <strong>Puntaje:</strong> {match.score.user} - {match.score.opponent}
          </p>
          <p>
            <strong>Duración:</strong> {match.duration}
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(match.date).toLocaleDateString()}
          </p>
        </div>
      </div>

   
      {match.videoUrl && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <h2 className="text-xl font-bold mb-3">Video del Enfrentamiento</h2>
          <video
            src={match.videoUrl}
            controls
            className="w-full rounded-lg border border-white/20"
          />
        </div>
      )} */}
    </div>
  );
};

export default VsDetails;
