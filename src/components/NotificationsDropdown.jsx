import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { markNotificationAsReadService } from "../Services/notificationFetching";
import toast from "react-hot-toast";

const NotificationsDropdown = ({ closeDropdown }) => {
  const { currentUser, updateCurrentUser } = useAuth();
  const notifications = currentUser?.notifications || [];

  const [loadingIds, setLoadingIds] = useState([]); // Para manejar botones en loading

  const handleMarkRead = async (id) => {
    if (!currentUser) return;

    // Optimistic update: marcamos como leído en la UI antes de la llamada al backend
    const previousNotifications = [...notifications];
    const updatedNotifications = notifications.map((n) =>
      n._id === id ? { ...n, read: true } : n
    );

    updateCurrentUser({
      ...currentUser,
      notifications: updatedNotifications,
    });

    setLoadingIds((prev) => [...prev, id]);

    try {
      const res = await markNotificationAsReadService(id);
      if (!res.success) {
        // Si falla, revertimos el cambio
        updateCurrentUser({
          ...currentUser,
          notifications: previousNotifications,
        });
        toast.error(res.message || "No se pudo marcar como leído");
      }
    } catch (err) {
      updateCurrentUser({
        ...currentUser,
        notifications: previousNotifications,
      });
      toast.error("Error al marcar notificación como leída");
    } finally {
      setLoadingIds((prev) => prev.filter((nid) => nid !== id));
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
                  disabled={loadingIds.includes(n._id)}
                  className={`ml-2 text-xs text-blue-400 hover:underline ${
                    loadingIds.includes(n._id) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loadingIds.includes(n._id) ? "..." : "Marcar"}
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
