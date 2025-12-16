import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import CardNotification from "./Cards/CardNotification";

const NotificationsDropdown = ({ closeDropdown }) => {
  const { currentUser, updateCurrentUser } = useAuth();
  const notifications = currentUser?.notifications || [];

  return (
    <div className="absolute right-0 mt-3 w-80 bg-stone-900 border border-stone-700 rounded-xl shadow-lg p-3 z-50">
      <h3 className="text-white font-semibold mb-3">Notificaciones</h3>

      {notifications.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">
          No tienes notificaciones
        </p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {notifications.slice(0, 3).map((n) => (
            <CardNotification
              key={n._id}
              notification={n}
              currentUser={currentUser}
              updateCurrentUser={updateCurrentUser}
              closeDropdown={closeDropdown}
            />
          ))}
        </div>
      )}

      <div className="border-t border-stone-700 mt-3 pt-2 text-center">
        <Link
          to="/notifications"
          onClick={closeDropdown}
          className="text-blue-400 text-sm hover:underline"
        >
          Ver todas
        </Link>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
