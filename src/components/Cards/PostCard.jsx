import { Link } from "react-router-dom";

const PostCard = ({ activity }) => {
  const {
    username,
    name,
    type,
    skillName,
    comboName,
    comboType,
    auraGain,
    newLevel,
    videoUrl,
    timestamp,
  } = activity;

  const formattedDate = new Date(timestamp).toLocaleString("es-CL", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 🪄 Texto dinámico según tipo de actividad
  let description = "";
  switch (type) {
    case "unlockSkill":
      description = (
        <>
          ha desbloqueado una nueva skill <b>{skillName}</b> 🎯
        </>
      );
      break;
    case "createCombo":
      description = (
        <>
          ha creado un nuevo combo <b>{comboName}</b> (
          <span className="capitalize">{comboType}</span>) 💥
        </>
      );
      break;
    case "winBattle":
      description = (
        <>
          ha ganado un duelo <b>VS</b> 🏆
        </>
      );
      break;
    default:
      description = "ha realizado una nueva acción 🚀";
  }

  return (
    <Link
      to={`/profile/${username}`}
      className="block bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-white text-sm">{name}</h3>
        <p className="text-[10px] text-gray-400">{formattedDate}</p>
      </div>

      <p className="text-sm text-gray-200">{description}</p>

      <p className="text-xs text-gray-400 mt-1">
        +{auraGain} AU — Nivel actual: {newLevel}
      </p>

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          className="mt-3 w-full rounded-lg max-h-72 object-cover"
        />
      )}
    </Link>
  );
};

export default PostCard;
