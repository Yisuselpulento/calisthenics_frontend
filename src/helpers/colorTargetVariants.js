// Función helper
export const getVariantBgColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "elite":
      return "bg-purple-600/50 border-purple-500";
    case "legendary":
      return "bg-yellow-300/70 border-yellow-300 border-3 ";
    default:
      return "bg-gray-900 border-neutral-700 hover:bg-neutral-700";
  }
};
