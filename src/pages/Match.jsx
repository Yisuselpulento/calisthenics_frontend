import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ComboStepByStep from "../components/ComboStepByStep.jsx";

const Match = () => {
  const { state } = useLocation();
  const matchData = state?.matchData;

  const [loading, setLoading] = useState(true);

  // ⏳ Loading visual corto al montar
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // 🔄 ANIMACIÓN LOADING (la que tú quieres)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg font-bold animate-blink">
          Cargando Enfrentamiento...
        </p>

        <style>
          {`
            @keyframes blink {
              0%, 50%, 100% { opacity: 1; }
              25%, 75% { opacity: 0; }
            }
            .animate-blink {
              animation: blink 2.5s infinite;
            }
          `}
        </style>
      </div>
    );
  }

  // ❌ Si no hay data (refresh / acceso directo)
  if (!matchData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-bold">
          No se pudo cargar el enfrentamiento.
        </p>
      </div>
    );
  }

  const {
    userCombo,
    opponentCombo,
    userAResult,
    userBResult,
  } = matchData;

  return (
    <div className="flex justify-center items-start gap-2 mt-8">
      {/* USER */}
      <div className="flex flex-col items-center rounded-xl">
        <img
          src={userCombo.user.avatar}
          alt="avatar"
          className="w-25 h-25 rounded-full border m-2"
        />
        <h2 className="text-lg font-semibold">
          {userCombo.user.username}
        </h2>

        <video
          src={userCombo.video}
          className="w-64 rounded-xl my-2 p-2"
          autoPlay
          muted
          loop
          playsInline
        />

        <ComboStepByStep
          elementsStepData={userAResult.elementsStepData}
          totalPoints={userAResult.totalPoints}
          isWinner={userAResult.isWinner}
          playerName={userCombo.user.username}
        />
      </div>

      {/* VS */}
      <div className="flex items-center justify-center text-3xl font-bold text-white">
        VS
      </div>

      {/* OPPONENT */}
      <div className="flex flex-col items-center rounded-xl">
        <img
          src={opponentCombo.user.avatar}
          alt="avatar"
          className="w-25 h-25 rounded-full border m-2"
        />
        <h2 className="text-lg font-semibold">
          {opponentCombo.user.username}
        </h2>

        <video
          src={opponentCombo.video}
          className="w-64 rounded-xl my-2 p-2"
          autoPlay
          muted
          loop
          playsInline
        />

        <ComboStepByStep
          elementsStepData={userBResult.elementsStepData}
          totalPoints={userBResult.totalPoints}
          isWinner={userBResult.isWinner}
          playerName={opponentCombo.user.username}
        />
      </div>
    </div>
  );
};

export default Match;
