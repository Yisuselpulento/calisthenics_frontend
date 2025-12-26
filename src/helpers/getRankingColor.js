export const getRankingColor = (tier) => {
  if (!tier) return "text-gray-400";

  switch (tier.toLowerCase()) {
    case "bronze":
      return "text-amber-700"; // bronce
    case "silver":
      return "text-gray-300"; // plata
    case "gold":
      return "text-yellow-400"; // oro
    case "diamond":
      return "text-blue-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]";
    default:
      return "text-gray-400";
  }
};
