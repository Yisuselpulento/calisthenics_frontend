import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!currentUser?._id) return;

    socketRef.current = io(import.meta.env.VITE_API_BACKEND_URL, {
      withCredentials: true,
    });

    socketRef.current.emit("register", currentUser._id);

    console.log("🟢 Socket conectado global:", currentUser._id);

    return () => {
      socketRef.current.disconnect();
    };
  }, [currentUser?._id]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
