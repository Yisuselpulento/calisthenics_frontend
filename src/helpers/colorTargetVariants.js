// Función helper
export const getVariantBgColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "elite":
      return "bg-purple-600/50 border-purple-500";
    case "legendary":
      return "bg-yellow-300/70 border-yellow-300 border-3 ";
    case "hard":
      return "bg-red-600 border-red-500";
    case "medium":
      return "bg-orange-500 border-orange-400";
    case "easy":
      return "bg-green-600 border-green-500";
    default:
      return "bg-neutral-800 border-neutral-700 hover:bg-neutral-700";
  }
};
