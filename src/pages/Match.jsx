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
      try {
        const res = await getMatchById(matchId);

        if (!res?.success) {
          setMatchData(null);
        } else {
          setMatchData(res.match);
        }
      } catch (error) {
        console.error("Error fetching match:", error);
        setMatchData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [matchId]);

  if (loading) {
    return <p className="text-center mt-8">Cargando enfrentamiento...</p>;
  }

  if (!matchData) {
    return <p className="text-center mt-8">Enfrentamiento no encontrado</p>;
  }

  const { user, opponent, matchType } = matchData;

  const isRanked = matchType === "ranked";

  // Fallbacks defensivos
  const userCombo = user?.combo || {};
  const opponentCombo = opponent?.combo || {};

  return (
    <div className="flex flex-col items-center gap-6 mt-8">

      {/* MATCH TYPE */}
      <span
        className={`px-4 py-1 rounded-full text-xs font-bold tracking-wide ${
          isRanked ? "bg-red-600 text-white" : "bg-green-600 text-white"
        }`}
      >
        {isRanked ? "RANKED MATCH" : "CASUAL MATCH"}
      </span>

      {/* PLAYERS */}
      <div className="flex justify-center items-start gap-4">

        {/* USER */}
        <div className="flex flex-col items-center rounded-xl">
          <img
            src={user?.user?.avatar?.url || "/default-avatar.png"}
            alt="avatar"
            className="w-24 h-24 rounded-full border m-2"
          />

          <h2 className="text-lg font-semibold">
            {user?.user?.username || "Jugador"}
          </h2>

          {userCombo?.video?.url ? (
            <video
              src={userCombo.video.url}
              className="w-64 rounded-xl my-2 p-2"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <p className="text-sm opacity-70">No hay combo disponible</p>
          )}

          <ComboStepByStep
            elementsStepData={user?.stepData || []}
            totalPoints={user?.totalPoints || 0}
            isWinner={user?.isWinner || false}
            playerName={user?.user?.username || "Jugador"}
          />
        </div>

        {/* VS */}
        <div className="flex items-center justify-center text-3xl font-bold text-white mt-28">
          VS
        </div>

        {/* OPPONENT */}
        <div className="flex flex-col items-center rounded-xl">
          <img
            src={opponent?.user?.avatar?.url || "/default-avatar.png"}
            alt="avatar"
            className="w-24 h-24 rounded-full border m-2"
          />

          <h2 className="text-lg font-semibold">
            {opponent?.user?.username || "Oponente"}
          </h2>

          {opponentCombo?.video?.url ? (
            <video
              src={opponentCombo.video.url}
              className="w-64 rounded-xl my-2 p-2"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <p className="text-sm opacity-70">No hay combo disponible</p>
          )}

          <ComboStepByStep
            elementsStepData={opponent?.stepData || []}
            totalPoints={opponent?.totalPoints || 0}
            isWinner={opponent?.isWinner || false}
            playerName={opponent?.user?.username || "Oponente"}
          />
        </div>
      </div>
    </div>
  );
};

export default Match;
