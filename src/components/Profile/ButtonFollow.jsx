import { useAuth } from "../../context/AuthContext";

const ButtonFollow = ({ targetUserId }) => {
  const { currentUser, toggleFollow } = useAuth();

  // Comprobar si el currentUser ya sigue a este usuario
  const isFollowing = currentUser?.following?.some(f => f._id === targetUserId);
  if (isFollowing) return null; // ocultar botón si ya sigue

  return (
    <button
      onClick={() => toggleFollow({ _id: targetUserId })}
      className="px-2 py-1 rounded bg-primary hover:bg-primary/80 text-xs text-white transition"
    >
      Seguir
    </button>
  );
};

export default ButtonFollow;
