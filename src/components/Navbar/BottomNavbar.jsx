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
  const closeDropdown = () => setShowDropdown(false);

  return (
    <div className="fixed h-[55px] bottom-0 rounded-t-xl left-0 w-full bg-stone-900 border-t border-stone-700 flex justify-around items-center py-2 z-50">

      {/* 🏠 HOME */}
      <button
        onClick={() => {
          closeDropdown();
          navigate("/");
        }}
        className={`text-xl transition-colors ${
          isActive("/") ? "text-primary" : "text-white hover:text-primary"
        }`}
      >
        <FaHome />
      </button>

      {/* 🏆 RANKS */}
      <button
        onClick={() => {
          closeDropdown();
          navigate("/ranks");
        }}
        className={`text-xl transition-colors ${
          isActive("/ranks") ? "text-primary" : "text-white hover:text-primary"
        }`}
      >
        <FaRankingStar />
      </button>

      {/* 👥 FRIENDS */}
     <div className="relative flex items-center justify-center h-[28px]">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className={`text-xl transition-colors ${
            showDropdown ? "text-primary" : "text-white hover:text-primary"
          }`}
        >
          <FaUserFriends />
        </button>

        {showDropdown && (
          <FriendsDropdown currentUser={currentUser} />
        )}
      </div>

      {/* 👤 PROFILE */}
      <button
        onClick={() => {
          closeDropdown();
          navigate(`/profile/${currentUser.username}`);
        }}
        className={`text-xl transition-colors ${
          location.pathname.startsWith(`/profile/${currentUser.username}`)
            ? "text-primary"
            : "text-white hover:text-primary"
        }`}
      >
        <FaUser />
      </button>
    </div>
  );
};

export default BottomNavbar;
