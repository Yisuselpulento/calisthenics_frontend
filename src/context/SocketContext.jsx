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

  // Conectar al socket
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

  // Registrar usuario en el socket
  useEffect(() => {
    if (!socketRef.current || !currentUser?._id) return;
    socketRef.current.emit("register", currentUser._id);
  }, [currentUser?._id]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    // 🔔 Nuevo desafío recibido
    socket.on("newChallenge", ({ notification }) => {
    });

    // 🔄 Usuario actualizado (backend envía el objeto completo)
    socket.on("userUpdated", ({ user }) => {
      updateCurrentUser(user);
    });

    // ⚔️ Challenge respondido
    socket.on("challengeResponded", ({ challengeId, accepted }) => {
      if (currentUser?.pendingChallenge === challengeId) {
        toast.success(
          accepted
            ? "Tu desafío fue aceptado"
            : "Tu desafío fue rechazado"
        );
      }
    });

    // ⚠️ Challenge expirado
    socket.on("challengeExpired", ({ challengeId }) => {
      if (currentUser?.pendingChallenge === challengeId) {
        toast.error("El desafío expiró. Puedes volver a intentarlo.");
      }
    });

    socket.on("challengeCancelled", ({ challengeId }) => {
  if (currentUser?.pendingChallenge === challengeId) {
    toast.error("Tu desafío fue cancelado.");
  }
});

    // ⚔️ Match completado
  socket.on("matchCompleted", ({ matchId }) => {
  navigate(`/match/${matchId}`);
});

    return () => {
      socket.off("newChallenge");
      socket.off("userUpdated");
      socket.off("challengeExpired");
      socket.off("challengeResponded");
      socket.off("matchCompleted");
      socket.off("challengeCancelled");
    };
  }, [currentUser, updateCurrentUser, navigate]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
