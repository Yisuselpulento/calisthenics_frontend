import { useEffect, useState } from "react";
import {
  getUserNotificationsService,
  markNotificationAsReadService,
  markAllNotificationsAsReadService,
} from "../Services/notificationFetching.js";
import Spinner from "../components/Spinner/Spinner.jsx";
import { useAuth } from "../context/AuthContext";

const Notifications = () => {
  const {  updateCurrentUser } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // nuevo estado de carga

  const load = async () => {
    setLoading(true); // comienza a cargar
    try {
      const res = await getUserNotificationsService();
      if (res.success) setNotifications(res.notifications);
    } catch (err) {
      console.error("Error cargando notificaciones:", err);
    } finally {
      setLoading(false); // termina carga
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleMarkRead = async (id) => {
  const res = await markNotificationAsReadService(id);
  if (res.success) {
    setNotifications(res.user.notifications); 
    updateCurrentUser(res.user);
  }
};

const handleMarkAll = async () => {
  const res = await markAllNotificationsAsReadService();
  if (res.success) {
    setNotifications(res.user.notifications);
    updateCurrentUser(res.user);
  }
};

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="2em" />
      </div>
    );

  return (
    <div className="p-2 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Tus notificaciones</h1>

        {notifications.length > 0 && (
          <button
            onClick={handleMarkAll}
            className="text-sm text-blue-400 hover:underline"
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          No tienes notificaciones todavía 📭
        </p>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 rounded-lg flex justify-between ${
                n.read ? "bg-stone-800" : "bg-stone-700"
              }`}
            >
              <div>
                <p className="text-white">{n.message}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>

              {!n.read && (
                <button
                  onClick={() => handleMarkRead(n._id)}
                  className="text-xs text-blue-400 hover:underline ml-3"
                >
                  Marcar como leída
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
