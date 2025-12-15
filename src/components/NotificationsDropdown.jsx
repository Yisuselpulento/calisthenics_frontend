import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { markNotificationAsReadService } from "../Services/notificationFetching";
import toast from "react-hot-toast";

const NotificationsDropdown = ({ closeDropdown }) => {
  const { currentUser, updateCurrentUser } = useAuth();
  const socket = useSocket();

  const notifications = currentUser?.notifications || [];
  const [loadingIds, setLoadingIds] = useState([]);

  /* -------------------- MARCAR COMO LEÍDA -------------------- */
  const handleMarkRead = async (id) => {
  if (!currentUser) return;

  const previousNotifications = currentUser.notifications;

  // optimistic
  updateCurrentUser({
    ...currentUser,
    notifications: notifications.map((n) =>
      n._id === id ? { ...n, read: true } : n
    ),
    notificationsCount: Math.max(
      (currentUser.notificationsCount || 1) - 1,
      0
    ),
  });

  setLoadingIds((prev) => [...prev, id]);

  try {
    const res = await markNotificationAsReadService(id);
    if (!res.success) throw new Error(res.message);
  } catch (err) {
    updateCurrentUser({
      ...currentUser,
      notifications: previousNotifications,
    });
    toast.error("No se pudo marcar la notificación");
  } finally {
    setLoadingIds((prev) => prev.filter((nid) => nid !== id));
  }
};

  /* -------------------- RESPONDER DESAFÍO -------------------- */
  const handleChallengeResponse = (notification, accepted) => {
    if (!socket) return;


    socket.emit("challengeResponse", {
      challengeId: notification.challengeId,
      accepted,
    });

    handleMarkRead(notification._id);
    closeDropdown();
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
          {notifications.slice(0, 3).map((n) => {
            const isChallenge = Boolean(n.challengeId);

            return (
              <div
                key={n._id}
                className={`p-3 rounded-lg text-sm ${
                  n.read
                    ? "bg-stone-800 text-gray-300"
                    : "bg-stone-700 text-white"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p>{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {!n.read && !isChallenge && (
                    <button
                      onClick={() => handleMarkRead(n._id)}
                      disabled={loadingIds.includes(n._id)}
                      className="ml-2 text-xs text-blue-400 hover:underline"
                    >
                      {loadingIds.includes(n._id) ? "..." : "Marcar"}
                    </button>
                  )}
                </div>

                {/* BOTONES DE DESAFÍO */}
                {isChallenge && !n.read && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() =>
                        handleChallengeResponse(n, true)
                      }
                      className="flex-1 text-xs bg-green-600 hover:bg-green-500 py-1 rounded"
                    >
                      Aceptar
                    </button>

                    <button
                      onClick={() =>
                        handleChallengeResponse(n, false)
                      }
                      className="flex-1 text-xs bg-red-600 hover:bg-red-500 py-1 rounded"
                    >
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
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
