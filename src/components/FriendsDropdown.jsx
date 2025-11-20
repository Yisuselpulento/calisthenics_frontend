import { useState } from "react"
import { FaUserFriends, FaUsers, FaPlus } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { users } from "../helpers/users"
import { teams } from "../helpers/teams"

const FriendsDropdown = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState("friends")
  const navigate = useNavigate()

  // 🔹 Buscar amigos (esto depende de tu estructura; aquí es un ejemplo)
  const friends = users.filter((u) => currentUser.friends?.includes(u._id))

  // 🔹 Buscar team del usuario
  const userTeam = teams.find((team) =>
    team.members.some((m) => m.userId === currentUser._id)
  )

  return (
    <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-80 bg-stone-900 border border-stone-700 rounded-xl shadow-lg p-4 z-50">
      <div className="flex justify-around mb-4">
        <button
          onClick={() => setActiveTab("friends")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
            activeTab === "friends"
              ? "bg-primary text-white"
              : "bg-stone-800 text-gray-300 hover:bg-stone-700"
          }`}
        >
          <FaUserFriends /> Amigos
        </button>

        <button
          onClick={() => setActiveTab("team")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
            activeTab === "team"
              ? "bg-primary text-white"
              : "bg-stone-800 text-gray-300 hover:bg-stone-700"
          }`}
        >
          <FaUsers /> Team
        </button>
      </div>

      {/* 👥 Amigos */}
      {activeTab === "friends" && (
        <div className="space-y-2 max-h-56 overflow-y-auto">
          {friends.length > 0 ? (
            friends.map((f) => (
              <div
                key={f._id}
                className="flex items-center gap-3 p-2 bg-stone-800 rounded-lg"
              >
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-white text-sm font-medium">{f.name}</p>
                  <p className="text-gray-400 text-xs">@{f.username}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center text-sm">
              No tienes amigos aún 😅
            </p>
          )}
        </div>
      )}

      {/* 🧑‍🤝‍🧑 Team */}
      {activeTab === "team" && (
        <div className="max-h-56 overflow-y-auto">
          {userTeam ? (
            <div className="space-y-2">
              <p className="text-center text-blue-400 font-semibold mb-2">
                {userTeam.name}
              </p>
              {userTeam.members.map((member) => {
                const user = users.find((u) => u._id === member.userId)
                return (
                  <div
                    key={member.userId}
                    className="flex items-center gap-3 p-2 bg-stone-800 rounded-lg"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">
                        {user?.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {member.role === "leader" ? "Líder" : "Miembro"}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-28">
              <p className="text-gray-400 mb-3 text-sm">No tienes un team todavía</p>
              <button
                onClick={() => navigate("/teams/create")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                <FaPlus /> Crear Team
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FriendsDropdown
