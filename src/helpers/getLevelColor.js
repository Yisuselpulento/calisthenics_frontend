export const getLevelColor = (level) => {
  const colorClasses = [
    "white",
    "blue-500",
    "purple-500",
    "yellow-500",
  ];

  const numericLevel =
    typeof level === "number" && level < 1000
      ? level * 1000
      : parseFloat(level);

  const index = Math.floor(numericLevel / 4500) % colorClasses.length; // repartido en 4
  return colorClasses[index];
};