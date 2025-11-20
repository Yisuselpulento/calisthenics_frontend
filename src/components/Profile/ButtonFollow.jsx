import { FaUserPlus } from "react-icons/fa";

const ButtonFollow = ({ targetUserId, isFollowing, onFollow }) => {
  // ⛔ Si ya sigue, NO mostrar nada
  if (isFollowing) return null;

  return (
    <button
      onClick={() => onFollow(targetUserId)}
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
