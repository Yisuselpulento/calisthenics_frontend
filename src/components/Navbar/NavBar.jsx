import { Link } from "react-router-dom";
import Searchbar from "../Searchbar";
import { FaUser, FaBell, FaChartBar } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import NotificationsDropdown from "../NotificationsDropdown";

const NavBar = () => {
  const { currentUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="p-2">
      <div className="flex gap-2 items-center relative">
        <Searchbar />

        {/* 🔔 Notificaciones */}
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

        {/* 📊 Botón de Stats */}
        <Link
          to="/skills-stats"
          className="p-2 rounded-full bg-stone-800 text-gray-300 hover:text-white hover:bg-primary transition-colors"
        >
          <FaChartBar className="text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
