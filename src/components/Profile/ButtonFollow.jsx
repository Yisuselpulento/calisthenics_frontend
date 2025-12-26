import { useAuth } from "../../context/AuthContext";

const ButtonFollow = ({ targetUserId }) => {
  const { currentUser, toggleFollow, followLoading } = useAuth();

  // Comprobar si el currentUser ya sigue a este usuario
  const isFollowing = currentUser?.following?.some(
    (f) => f._id === targetUserId
  );

  if (isFollowing) return null;

  return (
    <button
      disabled={followLoading}
      onClick={() => toggleFollow({ _id: targetUserId })}
      className={`
        px-3 py-1 w-[100px] rounded text-xs text-white transition
        ${followLoading
          ? "bg-primary/60 cursor-not-allowed"
          : "bg-primary hover:bg-primary/80"}
      `}
    >
      {followLoading ? "Cargando..." : "Seguir"}
    </button>
  );
};

export default ButtonFollow;
