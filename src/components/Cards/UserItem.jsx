import { Link } from "react-router-dom";

const UserItem = ({ user, isFollowing, onToggleFollow }) => {
  return (
    <div className="flex items-center justify-between bg-stone-800 p-3 rounded-lg hover:bg-stone-700">
      <Link to={`/profile/${user.username}`} className="flex items-center gap-3">
        <img
          src={user.avatar.url}
          className="w-10 h-10 rounded-full object-cover"
          alt={user.username}
        />
        <div>
          <p className="font-medium">{user.fullName}</p>
          <p className="text-xs text-gray-400">@{user.username}</p>
        </div>
      </Link>

      <button
        onClick={() => onToggleFollow(user)}
        className={`px-3 py-1 text-xs rounded ${
          isFollowing ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isFollowing ? "Dejar de seguir" : "Seguir"}
      </button>
    </div>
  );
};

export default UserItem;
