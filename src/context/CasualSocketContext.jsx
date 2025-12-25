import { createContext, useContext, useEffect } from "react";
import { useSocket } from "./SocketContext";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CasualSocketContext = createContext(null);

export const CasualSocketProvider = ({ children }) => {
  const socket = useSocket();
  const { currentUser, updateCurrentUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    socket.on("userUpdated", ({ user }) => {
      updateCurrentUser(user);
    });

    socket.on("newChallenge", () => {
    });

    socket.on("challengeResponded", ({ challengeId, accepted }) => {
      if (currentUser?.pendingChallenge === challengeId) {
        toast.success(
          accepted
            ? "Tu desafío fue aceptado 🎉"
            : "Tu desafío fue rechazado ❌"
        );
      }
    });

    socket.on("challengeExpired", ({ challengeId }) => {
      if (currentUser?.pendingChallenge === challengeId) {
        toast.error("El desafío expiró");
      }
    });

    socket.on("challengeCancelled", ({ challengeId }) => {
      if (currentUser?.pendingChallenge === challengeId) {
        toast.error("Tu desafío fue cancelado");
      }
    });

     socket.on("matchCompleted", ({ matchId }) => {
      navigate(`/match/${matchId}`);
    });

    return () => {
      socket.off("userUpdated");
      socket.off("newChallenge");
      socket.off("challengeResponded");
      socket.off("challengeExpired");
      socket.off("challengeCancelled");
      socket.off("matchCompleted");
    };
  }, [socket, currentUser, updateCurrentUser]);

  return (
    <CasualSocketContext.Provider value={socket}>
      {children}
    </CasualSocketContext.Provider>
  );
};

export const useCasualSocket = () => useContext(CasualSocketContext);
