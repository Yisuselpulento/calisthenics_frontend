import { Link } from "react-router-dom";
import { notifications } from "../helpers/notifications";

const NotificationsDropdown = ({ currentUser, closeDropdown  }) => {
  const userNotifications = notifications
    .filter((n) => n.userId === currentUser._id)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="absolute right-0 mt-3 w-80 bg-stone-900 border border-stone-700 rounded-xl shadow-lg p-3 z-50">
      <h3 className="text-white font-semibold mb-3">Notificaciones</h3>

      {userNotifications.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">
          No tienes notificaciones
        </p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {userNotifications.slice(0, 3).map((n) => (
            <div
              key={n._id}
              className={`p-3 rounded-lg text-sm ${
                n.read ? "bg-stone-800 text-gray-300" : "bg-stone-700 text-white"
              }`}
            >
              {n.message}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
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
