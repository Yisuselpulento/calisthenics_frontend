import { useEffect, useState } from "react";
import { doMatchService } from "../Services/matchFetching.js";
import { useLocation } from "react-router-dom";

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
      } else {
        setMatchData({
          userCombo: res.userCombo,
          opponentCombo: res.opponentCombo,
        });
      }

      setLoading(false);
    };

    run();
  }, [opponentId, type]);

  if (loading) return <p>Cargando match...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const { userCombo, opponentCombo } = matchData;

  return (
    <div className="flex items-start justify-center gap-10 mt-8">

      {/* CURRENT USER */}
      <div className="flex flex-col items-center w-1/3 bg-gray-800 p-4 rounded-xl">
        <img
          src={userCombo.user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border"
        />
        <h2 className="text-xl mt-2">{userCombo.user.username}</h2>

        <video
          src={userCombo.video}
          className="w-full mt-4 rounded-xl"
          controls
        />
      </div>

      {/* VS TEXT */}
      <h1 className="text-3xl font-bold">VS</h1>

      {/* OPPONENT */}
      <div className="flex flex-col items-center w-1/3 bg-gray-800 p-4 rounded-xl">
        <img
          src={opponentCombo.user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border"
        />
        <h2 className="text-xl mt-2">{opponentCombo.user.username}</h2>

        <video
          src={opponentCombo.video}
          className="w-full mt-4 rounded-xl"
          controls
        />
      </div>

    </div>
  );
};

export default Match;
