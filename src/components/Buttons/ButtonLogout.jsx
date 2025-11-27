/* import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ConfirmLogoutModal from "../Modals/ConfirmLogoutModal";
import { useAuth } from "../../context/AuthContext";

const ButtonLogout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const res = await logout();   
    if (res.success) {
      navigate("/login", { replace: true });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full bg-stone-800 text-gray-300 hover:text-white hover:bg-red-600 transition-colors"
      >
        <FaSignOutAlt className="text-xl" />
      </button>

      {isOpen && (
        <ConfirmLogoutModal
          isOpen={isOpen}
          onCancel={() => setIsOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default ButtonLogout;
 */