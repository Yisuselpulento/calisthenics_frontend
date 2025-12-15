import { Link } from "react-router-dom";
import VideoPlayer from "../VideoPlayer";

const PostCard = ({ activity }) => {
  const { user, type, message, createdAt, metadata } = activity;

  const formattedDate = new Date(createdAt).toLocaleString("es-CL", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const getRoute = () => {
    switch (type) {
      case "NEW_COMBO":
        return `/profile/${user.username}/combos/${metadata?.comboId}`;

      case "NEW_SKILL":
        return `/profile/${user.username}/skill/${metadata?.userSkillVariantId}`;

      default:
        return `/profile/${user.username}`;
    }
  };

  const getDescription = () => {
    switch (type) {
      case "NEW_SKILL":
        return <>{message}</>;

      case "NEW_COMBO":
        return (
          <>
            {message} 💥
          </>
        );

      case "MATCH_WIN":
        return <>ha ganado una batalla 🏆</>;

      case "MATCH_LOSS":
        return <>ha perdido una batalla ⚔️</>;

      case "NEW_TEAM":
        return (
          <>
            ha creado un team <b>{metadata?.teamName || "???"}</b> 👥
          </>
        );

      default:
        return message;
    }
  };

  return (
    <Link
      to={getRoute()}
      className="block bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <img
            src={user.avatar.url}
            alt={user.username}
            className="w-8 h-8 rounded-full object-cover border border-white/20"
          />
          <h3 className="font-semibold text-white text-sm">{user.username}</h3>
        </div>
        <p className="text-[10px] text-gray-400">{formattedDate}</p>
      </div>

      {/* Mensaje */}
      <p className="text-sm text-gray-200">{getDescription()}</p>

      {/* Video opcional */}
      {metadata?.videoUrl && (
        <VideoPlayer src={metadata.videoUrl} />
      )}
    </Link>
  );
};

export default PostCard;
