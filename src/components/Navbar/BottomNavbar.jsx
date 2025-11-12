import { FaHome, FaUser, FaPlus } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaRankingStar } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import FriendsDropdown from "../FriendsDropdown";
import { useState } from "react";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed h-[55px] bottom-0 rounded-t-xl left-0 w-full bg-stone-900 border-t border-stone-700 flex justify-around items-center py-2 z-50">
      {/* 🏠 HOME */}
      <button
        onClick={() => navigate("/")}
        className={`text-xl transition-colors ${
          isActive("/") ? "text-blue-500" : "text-white hover:text-blue-400"
        }`}
      >
        <FaHome />
      </button>

      {/* 🏆 RANKS */}
      <button
        onClick={() => navigate("/ranks")}
        className={`text-xl transition-colors ${
          isActive("/ranks") ? "text-blue-500" : "text-white hover:text-blue-400"
        }`}
      >
        <FaRankingStar />
      </button>

      {/* 👥 FRIENDS */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className={`text-xl transition-colors ${
            showDropdown ? "text-blue-500" : "text-white hover:text-blue-400"
          }`}
        >
          <FaUserFriends />
        </button>
        {showDropdown && <FriendsDropdown currentUser={currentUser} />}
      </div>

      {/* 👤 PROFILE */}
      <button
        onClick={() => navigate(`/profile/${currentUser.username}`)}
        className={`text-xl transition-colors ${
          location.pathname.startsWith(`/profile/${currentUser.username}`)
            ? "text-blue-500"
            : "text-white hover:text-blue-400"
        }`}
      >
        <FaUser />
      </button>
    </div>
  );
};

export default BottomNavbar;