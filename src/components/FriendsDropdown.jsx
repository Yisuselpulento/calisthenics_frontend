import { useEffect, useState } from "react";
import { FaUserFriends, FaUsers, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import {
  getFollowingService,
} from "../Services/followFetching.js";

const FriendsDropdown = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState("friends");
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();

  /* ---------------------- Cargar los primeros 10 following ---------------------- */
  useEffect(() => {
    const loadFollowing = async () => {
      const res = await getFollowingService(currentUser._id);
      if (res.success) setFollowing(res.following.slice(0, 10));
    };
    loadFollowing();
  }, [currentUser]);

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
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-stone-800 text-gray-300 cursor-not-allowed opacity-50"
        >
          <FaUsers /> Team
        </button>
      </div>

      {/* FOLLOWING */}
      {activeTab === "friends" && (
        <div className="space-y-2 max-h-56 overflow-y-auto">
          {following.length > 0 ? (
            following.map((f) => (
              <Link
                to={`/profile/${f.username}`}
                key={f._id}
                className="flex items-center gap-3 p-2 bg-stone-800 rounded-lg hover:bg-stone-700"
              >
                <img
                  src={f.avatar}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-white text-sm font-medium">{f.fullName}</p>
                  <p className="text-gray-400 text-xs">@{f.username}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-center text-sm">
              No sigues a nadie 😅
            </p>
          )}
        </div>
      )}

      {/* LINK A LA PÁGINA COMPLETA */}
      <div className="mt-4 text-center">
        <Link
          to={`/profile/${currentUser.username}/friends`}
          className="text-blue-400 hover:underline text-sm"
        >
          Ver todos los amigos →
        </Link>
      </div>
    </div>
  );
};

export default FriendsDropdown;
