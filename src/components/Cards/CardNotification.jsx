import { useState } from "react";
import toast from "react-hot-toast";
import { markNotificationAsReadService } from "../../Services/notificationFetching";
import { respondChallengeService } from "../../Services/challengeFetching.js";

const CardNotification = ({ notification, closeDropdown }) => {
  const [loading, setLoading] = useState(false);

  const handleMarkRead = async () => {
    setLoading(true);
    try {
      const res = await markNotificationAsReadService(notification._id);
      if (!res.success) {
        toast.error("No se pudo marcar la notificación");
      }
      // Backend emitirá userUpdated con las notificaciones actualizadas
    } catch {
      toast.error("Error al marcar la notificación");
    } finally {
      setLoading(false);
    }
  };

  const handleChallengeResponse = async (accepted) => {
    setLoading(true);
    try {
      const res = await respondChallengeService({
        challengeId: notification.challenge,
        accepted,
      });

      if (!res.success) {
        toast.error(res.message || "Error al responder desafío");
        return;
      }

      toast.success(
        accepted ? "Desafío aceptado" : "Desafío rechazado"
      );

      closeDropdown();
      // Backend actualizará currentUser automáticamente
    } catch (error) {
      console.error("Error al responder desafío:", error);
      toast.error("Ocurrió un error al responder el desafío. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const isChallenge = Boolean(notification.challenge);

  return (
    <div
      className={`p-3 rounded-lg text-sm ${
        notification.read ? "bg-stone-800 text-gray-300" : "bg-stone-700 text-white"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p>{notification.message}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>

        {!notification.read && !isChallenge && (
          <button
            onClick={handleMarkRead}
            disabled={loading}
            className="ml-2 text-xs text-blue-400 hover:underline"
          >
            {loading ? "..." : "Marcar"}
          </button>
        )}
      </div>

      {isChallenge && !notification.read && (
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => handleChallengeResponse(true)}
              disabled={loading}
              className="flex-1 text-xs bg-green-600 hover:bg-green-500 py-1 rounded"
            >
              Aceptar
            </button>
            <button
              onClick={() => handleChallengeResponse(false)}
              disabled={loading}
              className="flex-1 text-xs bg-red-600 hover:bg-red-500 py-1 rounded"
            >
              Rechazar
            </button>
          </div>
          <p className="text-yellow-400 text-xs mt-1">
            Esperando respuesta del oponente...
          </p>
        </div>
      )}
    </div>
  );
};

export default CardNotification;
