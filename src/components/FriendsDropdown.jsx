import { useState } from "react";
import { FaUserFriends, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const FriendsDropdown = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState("friends");

  if (!user) return null; // evita errores si no hay usuario

  // Tomamos los primeros 10 following y followers
  const following = user.following?.slice(0, 10) || [];
  const followers = user.followers?.slice(0, 10) || [];

  return (
    <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-80 bg-stone-900 border border-stone-700 rounded-xl shadow-lg p-4 z-50">
      {/* Tabs */}
      <div className="flex justify-around mb-4">
        <button
          onClick={() => setActiveTab("friends")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
            activeTab === "friends"
              ? "bg-primary text-white"
              : "bg-stone-800 text-gray-300 hover:bg-stone-700"
          }`}
        >
          <FaUserFriends /> Siguiendo
        </button>

        <button
          onClick={() => setActiveTab("followers")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
            activeTab === "followers"
              ? "bg-primary text-white"
              : "bg-stone-800 text-gray-300 hover:bg-stone-700"
          }`}
        >
          <FaUsers /> Seguidores
        </button>
      </div>

      {/* Lista */}
      <div className="space-y-2 max-h-56 overflow-y-auto">
        {activeTab === "friends" && following.length === 0 && (
          <p className="text-gray-400 text-center text-sm">
            No sigues a nadie 😅
          </p>
        )}

        {activeTab === "followers" && followers.length === 0 && (
          <p className="text-gray-400 text-center text-sm">
            Nadie te sigue todavía 😅
          </p>
        )}

        {(activeTab === "friends" ? following : followers).map((u) => (
          <Link
            to={`/profile/${u.username}`}
            key={u._id}
            className="flex items-center gap-3 p-2 bg-stone-800 rounded-lg hover:bg-stone-700"
          >
            <img
              src={u.avatar.url}
              className="w-8 h-8 rounded-full object-cover"
              alt={u.username}
            />
            <div>
              <p className="text-white text-sm font-medium">{u.fullName}</p>
              <p className="text-gray-400 text-xs">@{u.username}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Link a página completa */}
      <div className="mt-4 text-center">
        <Link
          to={`/profile/${user.username}/friends`}
          onClick={onClose}
          className="text-blue-400 hover:underline text-sm"
        >
          Ver todos →
        </Link>
      </div>
    </div>
  );
};

export default FriendsDropdown;
