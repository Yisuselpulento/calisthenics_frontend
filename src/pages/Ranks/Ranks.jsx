import { useState } from "react"
import { FaTrophy, FaUsers, FaUser } from "react-icons/fa"
import { users } from "../../helpers/users"
import { teams } from "../../helpers/teams"
import { Link } from "react-router-dom"

export default function Ranks() {
  const [activeTab, setActiveTab] = useState("users")

  // 🔹 Ordenamos los usuarios por ranking o nivel
  const sortedUsers = [...users].sort(
    (a, b) => (b.ranking ?? b.level) - (a.ranking ?? a.level)
  )

  // 🔹 Ordenamos los equipos según su ranking
  const sortedTeams = [...teams].sort((a, b) => a.teamRank - b.teamRank)

  return (
    <div className="p-2 max-w-3xl mx-auto">
      <h1 className="text-xl text-center mb-6">🏆 Rankings</h1>

      {/* Selector de pestañas */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
            activeTab === "users"
              ? "bg-primary text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FaUser />
          Usuarios
        </button>

        <button
          onClick={() => setActiveTab("teams")}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
            activeTab === "teams"
              ? "bg-primary text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FaUsers />
          Equipos
        </button>
      </div>

      {/* 🧍 Ranking de usuarios */}
      {activeTab === "users" && (
        <div className="bg-stone-900 rounded-xl p-2 space-y-1 border border-stone-700">
          {sortedUsers.map((user, i) => (
            <Link
              to={`/profile/${user.username}`}
              key={user._id}
              className="block"
            >
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-800 hover:bg-stone-700 transition">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-yellow-400 w-6 text-center">
                    {i + 1}
                  </span>

                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-white font-semibold">{user.name}</p>
                    <p className="text-gray-400 text-sm">@{user.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-yellow-300">
                  <FaTrophy />
                  <span className="font-medium">
                    {user.ranking ?? user.level}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 👥 Ranking de equipos */}
      {activeTab === "teams" && (
        <div className="bg-stone-900 rounded-xl p-2 space-y-1 border border-stone-700">
          {sortedTeams.map((team, i) => (
            <Link
              to={`/teams/${team._id}`}
              key={team._id}
              className="block"
            >
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-800 hover:bg-stone-700 transition">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-blue-400 w-6 text-center">
                    {i + 1}
                  </span>

                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-white font-semibold">{team.name}</p>
                    <p className="text-gray-400 text-sm">
                      {team.members.length} miembros
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-blue-300">
                  <FaTrophy />
                  <span className="font-medium">{team.teamRank}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
