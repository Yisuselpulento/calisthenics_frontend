import { FaUserPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { toggleFollowService } from "../../Services/followFetching.js";

const ButtonFollow = ({ targetUserId, isFollowing }) => {
  const { currentUser, updateCurrentUser } = useAuth();

  // ⛔ Si ya sigue, NO mostramos el botón
  if (isFollowing) return null;

  const handleFollow = async () => {
    const res = await toggleFollowService(targetUserId);

    if (res.success) {
      updateCurrentUser({
        ...currentUser,
        following: [...(currentUser.following || []), targetUserId],
      });
    } else {
      console.error("Error al seguir al usuario:", res.message);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className="
        absolute bottom-0 right-2
        bg-primary hover:bg-primary/80
        text-white p-1 rounded-full
        shadow-md shadow-black/40
        transition-all flex items-center justify-center
      "
    >
      <FaUserPlus size={13} />
    </button>
  );
};

export default ButtonFollow;
