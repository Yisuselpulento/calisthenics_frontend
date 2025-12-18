import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ComboStepByStep from "../components/ComboStepByStep.jsx";
import { getMatchById } from "../Services/matchFetching.js";

const Match = () => {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchMatch = async () => {
    const res = await getMatchById(matchId);

    if (!res.success) {
      setMatchData(null);
      setLoading(false);
      return;
    }

    setMatchData(res.match);
    setLoading(false);
  };

  fetchMatch();
}, [matchId]);

  if (loading) return <p>Cargando enfrentamiento...</p>;
  if (!matchData) return <p>Enfrentamiento no encontrado</p>;

  const { user, opponent } = matchData;

  console.log(user, opponent)

  // Fallbacks por si combo es null
  const userCombo = user?.combo || {};
  const opponentCombo = opponent?.combo || {};

  return (
    <div className="flex justify-center items-start gap-2 mt-8">
      {/* USER */}
      <div className="flex flex-col items-center rounded-xl">
        <img
          src={user?.user.avatar?.url || "/default-avatar.png"}
          alt="avatar"
          className="w-25 h-25 rounded-full border m-2"
        />
        <h2 className="text-lg font-semibold">{userCombo.user?.username || "Jugador"}</h2>

        {userCombo.video?.url ? (
          <video
            src={userCombo.video.url}
            className="w-64 rounded-xl my-2 p-2"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <p>No hay combo disponible</p>
        )}

        <ComboStepByStep
          elementsStepData={user.stepData || []}
          totalPoints={user.totalPoints || 0}
          isWinner={user.isWinner || false}
          playerName={userCombo.user?.username || "Jugador"}
        />
      </div>

      {/* VS */}
      <div className="flex items-center justify-center text-3xl font-bold text-white">
        VS
      </div>

      {/* OPPONENT */}
      <div className="flex flex-col items-center rounded-xl">
        <img
          src={opponent.user?.avatar?.url || "/default-avatar.png"}
          alt="avatar"
          className="w-25 h-25 rounded-full border m-2"
        />
        <h2 className="text-lg font-semibold">{opponentCombo.user?.username || "Oponente"}</h2>

        {opponentCombo.video?.url ? (
          <video
            src={opponentCombo.video.url}
            className="w-64 rounded-xl my-2 p-2"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <p>No hay combo disponible</p>
        )}

        <ComboStepByStep
          elementsStepData={opponent.stepData || []}
          totalPoints={opponent.totalPoints || 0}
          isWinner={opponent.isWinner || false}
          playerName={opponentCombo.user?.username || "Oponente"}
        />
      </div>
    </div>
  );
};

export default Match;
