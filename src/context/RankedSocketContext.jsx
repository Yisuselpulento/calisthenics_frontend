import { createContext, useContext, useEffect, useRef } from "react";
import { useSocket } from "./SocketContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RankedSocketContext = createContext(null);

export const RankedSocketProvider = ({ children }) => {
  const socket = useSocket();

  // 🔥 refs (NO state)
  const readyToastRef = useRef(null);
  const readyClickedRef = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    /* =========================
       READY CHECK
    ========================== */
    const onReadyCheck = ({ matchId, timeout }) => {
      readyClickedRef.current = false;

      // 🧹 cerrar cualquier toast previo
      if (readyToastRef.current) {
        toast.dismiss(readyToastRef.current);
        readyToastRef.current = null;
      }

      const id = toast.custom(
        (t) => (
          <div className="bg-stone-900 p-4 rounded-xl border border-green-500 w-64">
            <p className="text-white mb-2">
              ⏳ Confirma para iniciar la ranked
            </p>

            {!readyClickedRef.current ? (
              <button
                onClick={() => {
                  socket.emit("ranked:accept", { matchId });
                  readyClickedRef.current = true;

                  // 🔁 forzar re-render del toast
                  toast.update(t.id);
                }}
                className="px-4 py-1 rounded bg-green-500 hover:bg-green-400 text-black font-semibold w-full"
              >
                Estoy listo
              </button>
            ) : (
              <div className="text-green-400 text-sm text-center animate-pulse">
                ✔ Esperando respuesta del oponente...
              </div>
            )}
          </div>
        ),
        { duration: timeout }
      );

      readyToastRef.current = id;
    };

    /* =========================
       CANCELADO / TIMEOUT
    ========================== */
    const onCancelled = ({ reason }) => {
      readyClickedRef.current = false;

      if (readyToastRef.current) {
        toast.dismiss(readyToastRef.current);
        readyToastRef.current = null;
      }

      toast.error(
        reason === "timeout"
          ? "El oponente no aceptó a tiempo"
          : "La ranked fue cancelada"
      );
    };

    /* =========================
       RANKED INICIADA
    ========================== */
   const onStarted = ({ matchId }) => {
  readyClickedRef.current = false;

  if (readyToastRef.current) {
    toast.dismiss(readyToastRef.current);
    readyToastRef.current = null;
  }

  toast.success("🔥 Ranked iniciada");

  // 🚀 REDIRECCIÓN
  setTimeout(() => {
    navigate(`/match/${matchId}`);
  }, 300);
};

    // 🎧 listeners
    socket.on("ranked:readyCheck", onReadyCheck);
    socket.on("ranked:cancelled", onCancelled);
    socket.on("ranked:started", onStarted);

    return () => {
      socket.off("ranked:readyCheck", onReadyCheck);
      socket.off("ranked:cancelled", onCancelled);
      socket.off("ranked:started", onStarted);
    };
  }, [socket]);

  return (
    <RankedSocketContext.Provider value={socket}>
      {children}
    </RankedSocketContext.Provider>
  );
};

export const useRankedSocket = () => useContext(RankedSocketContext);
