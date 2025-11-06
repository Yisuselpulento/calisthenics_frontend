import React from "react";

const ProgressBar = ({ level, maxLevel = 18000 }) => {
  // Si el nivel tiene decimales (ej: 10.589), lo convertimos a miles
  const numericLevel = typeof level === "number" && level < 1000
    ? level * 1000
    : parseFloat(level);

  const progress = Math.min(numericLevel, maxLevel);
  const progressPercent = (progress / maxLevel) * 100;

  // Colores fijos para que Tailwind no los elimine al compilar
  const colorClasses = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const getProgressColor = (lvl) => {
    const index = Math.floor(lvl / 3000) % colorClasses.length;
    return colorClasses[index];
  };

  const barColor = getProgressColor(progress);

  return (
    <div className="mt-2 w-[200px]">
      {/* Contenedor base */}
      <div className="w-full h-3 bg-gray-800 rounded-full relative overflow-hidden">
        {/* Barra de progreso */}
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-[width] duration-700 ease-out ${barColor}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
