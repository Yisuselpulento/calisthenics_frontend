import { FaHome, FaUser, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="fixed h-[55px] bottom-0 rounded-t-xl left-0 w-full bg-stone-900 border-t border-stone-700 flex justify-around items-center py-2 z-50">
      <button onClick={() => navigate("/")} className="text-white text-xl">
        <FaHome />
      </button>

      <button onClick={() => navigate(`/profile/${currentUser.username}`)} className="text-white text-xl">
        <FaUser />
      </button>
    </div>
  );
};

export default BottomNavbar;