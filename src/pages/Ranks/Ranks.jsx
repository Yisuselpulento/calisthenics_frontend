import { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getRankedLeaderboardService } from "../../Services/userFetching.js";
import RankedSearchButton from "../../components/Buttons/RankedSearchButton.jsx";

export default function Ranks() {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const res = await getRankedLeaderboardService();

      if (res.success) {
        setUsers(res.data.leaderboard || []);
        setMe(res.data.me || null);
      }

      setLoading(false);
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-400">
        Cargando ranking...
      </div>
    );
  }

  return (
    <div className="p-2 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl">🏆 Ranking Ranked</h1>
        {/* Botón de buscar Ranked arriba a la derecha */}
        <RankedSearchButton />
      </div>

      {/* 🔝 Leaderboard */}
      <div className="bg-stone-900 rounded-xl p-2 space-y-1 border border-stone-700">
        {users.map((user, i) => (
          <Link
            to={`/profile/${user.username}`}
            key={user._id}
            className="block"
          >
            <div className="flex justify-between items-center p-3 rounded-lg bg-stone-800 hover:bg-stone-700 transition">
              <div className="flex items-center gap-3">
                {/* Posición */}
                <span
                  className={`text-lg font-bold w-6 text-center ${
                    i === 0
                      ? "text-yellow-400"
                      : i === 1
                      ? "text-gray-300"
                      : i === 2
                      ? "text-amber-600"
                      : "text-gray-500"
                  }`}
                >
                  {i + 1}
                </span>

                {/* Avatar */}
                <img
                  src={user.avatar?.url}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Info */}
                <div>
                  <p className="text-white font-semibold">{user.fullName}</p>
                  <p className="text-gray-400 text-sm">@{user.username}</p>
                </div>
              </div>

              {/* ELO */}
              <div className="flex flex-col items-end text-yellow-300">
                <div className="flex items-center gap-2">
                  <FaTrophy />
                  <span className="font-medium">{Math.round(user.ranking.elo)}</span>
                </div>
                <span className="text-xs text-gray-400">{user.ranking.tier}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 👤 Tu posición */}
      {me && (
        <div className="mt-4 p-3 rounded-xl bg-stone-800 border border-yellow-500">
          <p className="text-sm text-gray-400 mb-1">Tu posición</p>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="font-bold text-yellow-400">#{me.rank}</span>

              <img
                src={me.avatar?.url}
                alt={me.username}
                className="w-8 h-8 rounded-full object-cover"
              />

              <span className="text-white font-semibold">@{me.username}</span>
            </div>

            <div className="text-right">
              <p className="text-yellow-400 font-bold">{Math.round(me.ranking.elo)} ELO</p>
              <p className="text-xs text-gray-400">{me.ranking.tier}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
