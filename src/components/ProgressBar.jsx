const ProgressBar = ({ level = 0, maxLevel = 25000, label, showPercent = true }) => {
  // Asegurar que sea un número válido
  const numericLevel = typeof level === "number" ? level : parseFloat(level) || 0;

  // Limitar entre 0 y maxLevel
  const progress = Math.min(Math.max(numericLevel, 0), maxLevel);
  const progressPercent = (progress / maxLevel) * 100;

  // 🎨 Paleta de colores según el tipo de barra
  const colorSets = {
    12500: ["bg-gray-300", "bg-blue-500", "bg-purple-500", "bg-yellow-500"],
    25000: [
      "bg-red-500",
      "bg-orange-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-yellow-500",
    ],
  };

  // Elegir paleta según maxLevel (si no existe, usar la de 18000)
  const colors = colorSets[maxLevel] || colorSets[25000];

  // 🔢 Elegir color dinámicamente
  const getProgressColor = (lvl) => {
    const range = maxLevel / colors.length;
    const index = Math.min(Math.floor(lvl / range), colors.length - 1);
    return colors[index];
  };

  const barColor = getProgressColor(progress);

  return (
    <div className="flex flex-col gap-1 mt-1 w-full ">
      {label && (
        <p className="text-[11px] text-gray-300">
          {label}: {showPercent ? `${Math.floor(progressPercent)}%` : `${Math.floor(progress)}`}
        </p>
      )}

      <div className="w-full h-2 bg-gray-800 rounded-full relative overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-[width] duration-700 ease-out ${barColor}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
