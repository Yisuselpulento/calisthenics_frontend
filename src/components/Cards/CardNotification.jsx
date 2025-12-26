import { useState } from "react";
import toast from "react-hot-toast";
import { markNotificationAsReadService } from "../../Services/notificationFetching";
import { respondChallengeService } from "../../Services/challengeFetching.js";

const CardNotification = ({ notification, closeDropdown }) => {
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // "accept" | "reject" | null

  const handleMarkRead = async () => {
    setLoading(true);

    const res = await markNotificationAsReadService(notification._id);

    if (!res.success) toast.error(res.message);

    setLoading(false);
  };

  const handleChallengeResponse = async (accepted) => {
    const action = accepted ? "accept" : "reject";
    setActionLoading(action);

    const res = await respondChallengeService({
      challengeId: notification.challenge,
      accepted,
    });

    if (!res.success) {
      toast.error(res.message);
      setActionLoading(null);
      return;
    }

    toast.success(res.message);
    closeDropdown();
    setActionLoading(null);
  };

  const isChallenge = Boolean(notification.challenge);

  return (
    <div
      className={`p-3 rounded-lg text-sm ${
        notification.read
          ? "bg-stone-800 text-gray-300"
          : "bg-stone-700 text-white"
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
              disabled={actionLoading !== null}
              className="flex-1 text-xs bg-green-600 hover:bg-green-500 py-1 rounded disabled:opacity-50"
            >
              {actionLoading === "accept" ? "Aceptando..." : "Aceptar"}
            </button>

            <button
              onClick={() => handleChallengeResponse(false)}
              disabled={actionLoading !== null}
              className="flex-1 text-xs bg-red-600 hover:bg-red-500 py-1 rounded disabled:opacity-50"
            >
              {actionLoading === "reject" ? "Rechazando..." : "Rechazar"}
            </button>
          </div>

          {actionLoading && (
            <p className="text-yellow-400 text-xs mt-1">
              Procesando respuesta...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CardNotification;
