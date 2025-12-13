import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { currentUser, updateCurrentUser } = useAuth();

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_API_BACKEND_URL, {
      withCredentials: true,
    });

    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    if (!socketRef.current || !currentUser?._id) return;
    socketRef.current.emit("register", currentUser._id);
  }, [currentUser?._id]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.on("newNotification", (notification) => {
      updateCurrentUser((prev) => ({
        ...prev,
        notifications: [notification, ...(prev.notifications || [])],
        notificationsCount: (prev.notificationsCount || 0) + 1,
      }));
    });

    return () => socket.off("newNotification");
  }, [updateCurrentUser]);

  useEffect(() => {
  const socket = socketRef.current;
  if (!socket) return;

  socket.on("challengeAccepted", ({ matchData }) => {
  window.dispatchEvent(
    new CustomEvent("challengeResolved", { detail: { accepted: true, matchData } })
  );
});

socket.on("challengeRejected", ({ message }) => {
  window.dispatchEvent(
    new CustomEvent("challengeResolved", { detail: { accepted: false, message } })
  );
});

  return () => {
    socket.off("challengeAccepted");
    socket.off("challengeRejected");
  };
}, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
export const useSocket = () => useContext(SocketContext);
