import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserNotificationsService, markNotificationAsReadService } from "../Services/notificationFetching";


const NotificationsDropdown = ({ closeDropdown }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await getUserNotificationsService();
      if (res.success) setNotifications(res.notifications);
    };
    load();
  }, []);

  const handleMarkRead = async (id) => {
    const res = await markNotificationAsReadService(id);
    if (res.success) {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    }
  };

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
            <div
              key={n._id}
              className={`p-3 rounded-lg text-sm flex justify-between items-start ${
                n.read ? "bg-stone-800 text-gray-300" : "bg-stone-700 text-white"
              }`}
            >
              <div>
                {n.message}
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>

              {!n.read && (
                <button
                  onClick={() => handleMarkRead(n._id)}
                  className="ml-2 text-xs text-blue-400 hover:underline"
                >
                  Marcar
                </button>
              )}
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
