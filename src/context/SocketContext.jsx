import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { currentUser, updateCurrentUser } = useAuth();
  const navigate = useNavigate();

  // ------------------ CONEXIÓN ------------------
  useEffect(() => {
    if (socketRef.current) return;

    socketRef.current = io(import.meta.env.VITE_API_BACKEND_URL, {
      withCredentials: true,
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  // ------------------ REGISTRAR USUARIO ------------------
  useEffect(() => {
    if (!socketRef.current || !currentUser?._id) return;
    socketRef.current.emit("register", currentUser._id);
  }, [currentUser?._id]);

  // ------------------ EVENTOS ------------------
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    // 🔄 USER ACTUALIZADO (CLAVE DE TODO)
    socket.on("userUpdated", ({ user }) => {
      updateCurrentUser(user);
    });

    // 🔔 NUEVO DESAFÍO
    socket.on("newChallenge", () => {
    });

    // ⚔️ RESPUESTA A DESAFÍO
    socket.on("challengeResponded", ({ challengeId, accepted }) => {
      if (currentUser?.pendingChallenge === challengeId) {
        toast.success(
          accepted
            ? "Tu desafío fue aceptado 🎉"
            : "Tu desafío fue rechazado ❌"
        );
      }
    });

    // ⚠️ DESAFÍO EXPIRADO
    socket.on("challengeExpired", ({ challengeId }) => {
      if (currentUser?.pendingChallenge === challengeId) {
        toast.error("El desafío expiró");
      }
    });

    // 🚫 DESAFÍO CANCELADO
    socket.on("challengeCancelled", ({ challengeId }) => {
      if (currentUser?.pendingChallenge === challengeId) {
        toast.error("Tu desafío fue cancelado");
      }
    });

    // 🏁 MATCH COMPLETADO
    socket.on("matchCompleted", ({ matchId }) => {
      navigate(`/match/${matchId}`);
    });

     socket.on("ranked:found", ({ opponentId, matchId }) => {
      toast.custom(() => (
        <div className="bg-stone-900 p-4 rounded-xl border border-yellow-500">
          <p className="text-white mb-2">⚔️ Oponente encontrado</p>
          <button
            onClick={() => socket.emit("ranked:accept", { matchId })}
            className="bg-yellow-500 px-3 py-1 rounded text-black"
          >
            Aceptar
          </button>
        </div>
      ));
    });

    /* ⏳ READY CHECK */
    socket.on("ranked:readyCheck", ({ matchId, timeout }) => {
      toast.custom(
        () => (
          <div className="bg-stone-900 p-4 rounded-xl border border-green-500">
            <p className="text-white mb-2">
              ⏳ Confirma para iniciar la ranked
            </p>
            <button
              onClick={() => socket.emit("ranked:accept", { matchId })}
              className="bg-green-500 px-3 py-1 rounded text-black"
            >
              Estoy listo
            </button>
          </div>
        ),
        { duration: timeout }
      );
    });

    /* ❌ READY CHECK CANCELADO */
    socket.on("ranked:cancelled", ({ reason }) => {
      toast.error(
        reason === "timeout"
          ? "El oponente no aceptó a tiempo"
          : "La ranked fue cancelada"
      );
    });


    return () => {
      socket.off("userUpdated");
      socket.off("newChallenge");
      socket.off("challengeResponded");
      socket.off("challengeExpired");
      socket.off("challengeCancelled");
      socket.off("matchCompleted");

      socket.off("ranked:found");
      socket.off("ranked:readyCheck");
      socket.off("ranked:cancelled");
    };
  }, [currentUser, updateCurrentUser, navigate]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
