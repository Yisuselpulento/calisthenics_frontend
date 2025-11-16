import { Link } from "react-router-dom";
import Searchbar from "../Searchbar";
import { FaUser, FaBell } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import NotificationsDropdown from "../NotificationsDropdown";

const NavBar = () => {
  const { currentUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="p-5">
      <div className="flex gap-6 items-center relative">
        <Searchbar />

        {/* 🔔 Botón de notificaciones */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className={`p-2 rounded-full transition-colors ${
              showDropdown
                ? "bg-primary text-white"
                : "bg-stone-800 text-gray-300 hover:text-white"
            }`}
          >
            <FaBell className="text-xl" />
          </button>
          {showDropdown && <NotificationsDropdown currentUser={currentUser} />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
