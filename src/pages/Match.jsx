import { useEffect, useState } from "react";
import { doMatchService } from "../Services/matchFetching.js";
import { useLocation } from "react-router-dom";
import ComboStepByStep from "../components/ComboStepByStep.jsx";

const Match = () => {
  const { state } = useLocation();
  const { opponentId, type } = state || {};

  const [loading, setLoading] = useState(true);
  const [matchData, setMatchData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      if (!opponentId || !type) {
        setError("Faltan datos del match.");
        setLoading(false);
        return;
      }

      const res = await doMatchService(opponentId, type);
      console.log(res)
      if (!res.success) {
        setError(res.message);
        setLoading(false);
        return;
      }

      setMatchData({
        userCombo: res.userCombo,
        opponentCombo: res.opponentCombo,
        userAResult: res.userAResult,
        userBResult: res.userBResult,
      });

      setLoading(false);
    };

    run();
  }, [opponentId, type]);

  if (loading) return <p>Cargando match...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const { userCombo, opponentCombo, userAResult, userBResult } = matchData || {};

  if (!userAResult || !userBResult) return <p>Cargando resultados...</p>;

  return (
    <div className="flex justify-center items-start gap-1 mt-8">
      {/* USER */}
      <div className="flex flex-col items-center rounded-xl">
        <img
          src={userCombo?.user.avatar}
          alt="avatar"
          className="w-25 h-25 rounded-full border m-2"
        />
        <h2 className="text-lg font-semibold">{userCombo?.user.username}</h2>
        <video
          src={userCombo?.video}
          className="w-64 rounded-xl my-2 p-2"
          controls
           autoPlay
          muted
          loop 
        />
        <ComboStepByStep
          elementsStepData={userAResult?.elementsStepData}
          totalPoints={userAResult?.totalPoints}
          isWinner={userAResult.isWinner}
          playerName={userCombo?.user.username}
        />
      </div>

      {/* VS */}
      <div className="flex items-center justify-center text-3xl font-bold text-white">
        VS
      </div>

      {/* OPPONENT */}
      <div className="flex flex-col items-center rounded-xl">
        <img
          src={opponentCombo?.user.avatar}
          alt="avatar"
          className="w-25 h-25 rounded-full border m-2"
        />
        <h2 className="text-lg font-semibold">{opponentCombo?.user.username}</h2>
       <video
          src={opponentCombo?.video}
          className="w-64 rounded-xl my-2 p-2"
          controls
          autoPlay
          muted
          loop // opcional, si quieres que se repita
        />
        <ComboStepByStep
          elementsStepData={userBResult?.elementsStepData}
          totalPoints={userBResult?.totalPoints}
          isWinner={userBResult.isWinner}
          playerName={opponentCombo?.user.username}
        />
      </div>
    </div>
  );
};

export default Match;
