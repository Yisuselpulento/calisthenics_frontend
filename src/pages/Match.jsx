import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFullMatchUserData } from "../helpers/matchUtils";

const Match = () => {
  const { matchId } = useParams();
  const { state } = useLocation();

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [showSpinner, setShowSpinner] = useState(true);

  // Reproductores de combo
  const [userVideoIndex, setUserVideoIndex] = useState(0);
  const [oppVideoIndex, setOppVideoIndex] = useState(0);

  if (!state) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-lg">
        ❌ Match no encontrado o datos incompletos.
      </div>
    );
  }

  const { currentUser, opponent, type } = state;

  // Obtener información completa del match
  const userData = getFullMatchUserData(currentUser, type);
  const opponentData = getFullMatchUserData(opponent, type);

  if (!userData || !opponentData) {
    return (
      <div className="text-white text-center mt-10">
        ❌ No se pudo obtener la información del match.
      </div>
    );
  }

  const userSkills = userData.combo.skills;
  const opponentSkills = opponentData.combo.skills;

  const totalRounds = Math.max(userSkills.length, opponentSkills.length);

  // Extraer videos del combo
  const userVideos = userSkills.map((s) => s.videoUrl).filter(Boolean);
  const opponentVideos = opponentSkills.map((s) => s.videoUrl).filter(Boolean);

  // Avanzar videos en bucle
  const handleUserVideoEnd = () => {
    setUserVideoIndex((prev) => (prev + 1) % userVideos.length);
  };

  const handleOppVideoEnd = () => {
    setOppVideoIndex((prev) => (prev + 1) % opponentVideos.length);
  };

  // Avanzar skills una por una
  useEffect(() => {
    if (currentSkillIndex < totalRounds) {
      const timer = setTimeout(() => {
        setShowSpinner(false);

        const nextTimer = setTimeout(() => {
          setCurrentSkillIndex((prev) => prev + 1);
          setShowSpinner(true);
        }, 1000);

        return () => clearTimeout(nextTimer);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentSkillIndex, totalRounds]);

  const totalDamage = (skills) =>
    skills.reduce((acc, s) => acc + (s.damage || 0), 0);

  return (
    <div className="bg-stone-950 text-white flex flex-col items-center py-5">
      <h1 className="text-xl font-bold mb-3">🔥 {type.toUpperCase()} MATCH 🔥</h1>
      <p className="text-sm text-gray-400 mb-10">ID: {matchId}</p>

      <div className="flex items-start justify-center w-full max-w-5xl mb-5">

        {/* PLAYER 1 */}
        <div className="flex flex-col items-center w-3/7">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-18 h-18 rounded-full border-2 border-blue-500"
          />

          <h2 className="text-lg mt-2">{userData.name}</h2>
          <p className="text-gray-400 text-sm">@{userData.username}</p>

          {/* Combo Video */}
          {userVideos.length > 0 && (
            <video
              key={userVideoIndex}
              src={userVideos[userVideoIndex]}
              className="w-[120px] h-[200px] mt-3 rounded object-cover"
              autoPlay
              muted
              onEnded={handleUserVideoEnd}
            />
          )}

          {/* Skills */}
          <div className="mt-4 flex flex-col gap-2 w-full">
            {userSkills.slice(0, currentSkillIndex).map((skill, idx) => (
              <div
                key={idx}
                className="p-1 rounded-lg flex flex-col items-center"
              >
                <p className="font-semibold text-center text-xs">
                  {skill.variantName} — {skill.damage} dmg
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {skill.baseType === "static"
                    ? `Hold: ${skill.holdSeconds}s`
                    : `Reps: ${skill.reps}`}
                </p>
              </div>
            ))}

            {showSpinner && currentSkillIndex < userSkills.length && (
              <p className="text-gray-400 text-center animate-pulse">
                Cargando skill...
              </p>
            )}
          </div>
        </div>

        {/* VS */}
        <div className="flex items-center justify-center w-1/6 ">
          <h1 className="text-2xl font-extrabold text-red-500 mt-10">VS</h1>
        </div>

        {/* PLAYER 2 */}
        <div className="flex flex-col items-center w-3/7">
          <img
            src={opponentData.avatar}
            alt={opponentData.name}
            className="w-18 h-18 rounded-full border-2 border-red-500"
          />

          <h2 className="text-lg mt-2">{opponentData.name}</h2>
          <p className="text-gray-400 text-sm">@{opponentData.username}</p>

          {/* Combo Video */}
          {opponentVideos.length > 0 && (
            <video
              key={oppVideoIndex}
              src={opponentVideos[oppVideoIndex]}
              className="w-[120px] h-[200px] mt-3 rounded object-cover"
              autoPlay
              muted
              onEnded={handleOppVideoEnd}
            />
          )}

          {/* Skills */}
          <div className="mt-4 flex flex-col gap-2 w-full">
            {opponentSkills.slice(0, currentSkillIndex).map((skill, idx) => (
              <div
                key={idx}
                className="p-1 rounded-lg flex flex-col items-center"
              >
                <p className="font-semibold text-center text-xs">
                  {skill.variantName} — {skill.damage} dmg
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {skill.baseType === "static"
                    ? `Hold: ${skill.holdSeconds}s`
                    : `Reps: ${skill.reps}`}
                </p>
              </div>
            ))}

            {showSpinner && currentSkillIndex < opponentSkills.length && (
              <p className="text-gray-400 text-center animate-pulse">
                Cargando skill...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* FINAL DAMAGE + WIN / LOSS */}
      {currentSkillIndex >= totalRounds && (() => {
        const userTotal = totalDamage(userSkills);
        const oppTotal = totalDamage(opponentSkills);

        const userWins = userTotal > oppTotal;
        const oppWins = oppTotal > userTotal;

        return (
          <div className="flex gap-5 mt-3 p-2 items-end">

            {/* User */}
            <div className="flex flex-col items-center">
              <p className="text-lg">
                {userData.name}: {userTotal}
              </p>
              {userWins && (
                <p className="text-green-500 font-extrabold text-xl mt-1">WIN</p>
              )}
              {oppWins && (
                <p className="text-red-500 font-extrabold text-xl mt-1">LOSS</p>
              )}
            </div>

            {/* Opponent */}
            <div className="flex flex-col items-center">
              <p className="text-lg">
                {opponentData.name}: {oppTotal}
              </p>
              {oppWins && (
                <p className="text-green-500 font-extrabold text-xl mt-1">WIN</p>
              )}
              {userWins && (
                <p className="text-red-500 font-extrabold text-xl mt-1">LOSS</p>
              )}
            </div>

          </div>
        );
      })()}
    </div>
  );
};

export default Match;
