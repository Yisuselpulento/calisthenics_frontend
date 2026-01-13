import { useMemo } from "react";

const calculateEnergyUsed = (elements) => {
  if (!elements?.length) return 0;

  return elements.reduce((sum, el) => {
    const fromHold =
      el.hold && el.energyPerSecond
        ? el.hold * el.energyPerSecond
        : 0;

    const fromReps =
      el.reps && el.energyPerRep
        ? el.reps * el.energyPerRep
        : 0;

    return sum + fromHold + fromReps;
  }, 0);
};

const BarEnergyeditCombo = ({ elements, userEnergy }) => {
  const totalEnergyUsed = useMemo(
    () => calculateEnergyUsed(elements),
    [elements]
  );

  const remainingEnergy = Math.max(
    0,
    (userEnergy || 0) - totalEnergyUsed
  );

  const percentage =
    userEnergy > 0 ? (remainingEnergy / userEnergy) * 100 : 0;

  const barColor =
    percentage > 50
      ? "bg-green-500"
      : percentage > 20
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="text-xs">
      <strong>Energía disponible:</strong>{" "}
      {remainingEnergy}/{userEnergy}

      <div className="w-full bg-gray-700 rounded-md h-3 mt-1 overflow-hidden">
        <div
          className={`h-3 transition-all duration-300 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default BarEnergyeditCombo;
