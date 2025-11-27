export const getLevelColor = (user) => {
  const colorClasses = ["white", "blue-500", "purple-500", "yellow-500"];

  if (!user || !user.stats) return colorClasses[0];

  // Tomamos mainAura como referencia para el color
  const mainAura = user.stats.mainAura || 0;

  // Escalamos el valor y obtenemos el índice
  const index = Math.floor(mainAura / 4500) % colorClasses.length;

  return colorClasses[index];
};