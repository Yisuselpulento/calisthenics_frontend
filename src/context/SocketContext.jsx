import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import { doMatchService } from "../Services/matchFetching";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { currentUser, updateCurrentUser } = useAuth();
  const navigate = useNavigate(); // navegaciones desde socket

  useEffect(() => {
  if (socketRef.current) return; // 👈 evita duplicados

  socketRef.current = io(import.meta.env.VITE_API_BACKEND_URL, {
    withCredentials: true,
  });

  return () => {
    socketRef.current?.disconnect();
    socketRef.current = null;
  };
}, []);

  useEffect(() => {
    if (!socketRef.current || !currentUser?._id) return;
    socketRef.current.emit("register", currentUser._id);
  }, [currentUser?._id]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    // 🔔 Notificaciones nuevas
    socket.on("newNotification", (notification) => {
      updateCurrentUser({
          ...currentUser, // 🔥 conservar todo
          notifications: [notification, ...(currentUser?.notifications || [])],
          notificationsCount: (currentUser?.notificationsCount || 0) + 1,
        });
      });

    // ⚔️ Desafíos aceptados
    socket.on("challengeAccepted", async ({ challengeId, opponentId }) => {
      try {
        if (!opponentId) throw new Error("Opponent ID no definido");

        const matchData = await doMatchService(opponentId, "static");
        navigate("/match", { state: { matchData } });
      } catch (err) {
        toast.error("No se pudo cargar el enfrentamiento");
      }
    });

    // ❌ Desafíos rechazados
    socket.on("challengeRejected", ({ message }) => {
      toast(message || "Desafío rechazado");
    });

    return () => {
      socket.off("newNotification");
      socket.off("challengeAccepted");
      socket.off("challengeRejected");
    };
  }, [updateCurrentUser, currentUser, navigate]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
