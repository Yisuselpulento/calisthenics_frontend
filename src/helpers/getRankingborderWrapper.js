export const getRankingBorderWrapper = (tier) => {
  if (!tier) return "p-[3px] rounded-full border border-gray-600";

  switch (tier.toLowerCase()) {
    case "bronze":
      return "p-[3px] rounded-full border-2 border-amber-700";
    case "silver":
      return "p-[3px] rounded-full border-2 border-gray-300";
    case "gold":
      return "p-[3px] rounded-full border-2 border-yellow-400";
    case "diamond":
      return `
        p-[3px] rounded-full
        border-2 border-blue-500
        shadow-[0_0_16px_rgba(59,130,246,0.95)]
      `;
    default:
      return "p-[3px] rounded-full border border-gray-600";
  }
};