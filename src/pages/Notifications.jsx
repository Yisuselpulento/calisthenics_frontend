import { notifications } from "../helpers/notifications";
import { useAuth } from "../context/AuthContext";

const Notifications = () => {
  const { currentUser } = useAuth();

  const userNotifications = notifications
    .filter((n) => n.userId === currentUser._id)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="p-2 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-4">Tus notificaciones</h1>

      {userNotifications.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          No tienes notificaciones todavía 📭
        </p>
      ) : (
        <div className="space-y-3">
          {userNotifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 rounded-lg ${
                n.read ? "bg-stone-800" : "bg-stone-700"
              }`}
            >
              <p className="text-white">{n.message}</p>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
