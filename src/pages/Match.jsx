import { useLocation, useParams } from "react-router-dom";

const Match = () => {
  const { matchId } = useParams();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-lg">
        ❌ Match no encontrado o datos incompletos.
      </div>
    );
  }

  const { currentUser, opponent, type } = state;

  return (
    <div className=" bg-stone-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">🔥 {type.toUpperCase()} MATCH 🔥</h1>
      <p className="text-sm text-gray-400 mb-10">ID: {matchId}</p>

      <div className="flex items-center justify-around w-full max-w-5xl">
        {/* Player 1 */}
        <div className="flex flex-col items-center">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
          <h2 className="text-xl mt-3">{currentUser.name}</h2>
          <p className="text-gray-400">@{currentUser.username}</p>
        </div>

        <h1 className="text-4xl font-extrabold text-red-500">VS</h1>

        {/* Player 2 */}
        <div className="flex flex-col items-center">
          <img
            src={opponent.avatar}
            alt={opponent.name}
            className="w-32 h-32 rounded-full border-4 border-red-500"
          />
          <h2 className="text-xl mt-3">{opponent.name}</h2>
          <p className="text-gray-400">@{opponent.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Match;