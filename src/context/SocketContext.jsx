import { createContext, useContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { currentUser } = useAuth();

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

  // Registrar usuario
  useEffect(() => {
    if (!socketRef.current || !currentUser?._id) return;
    socketRef.current.emit("register", currentUser._id);
  }, [currentUser?._id]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
