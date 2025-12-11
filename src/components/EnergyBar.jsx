import  { useMemo } from "react";

// Helper interno para calcular energía usada
const calculateEnergyUsed = (elements, userVariants) => {
  if (!elements || !userVariants) return 0;

  return elements.reduce((sum, el) => {
    const variant = userVariants.find(v => v.userSkillVariantId === el.userSkillVariantId);
    if (!variant) return sum;

    const energyFromHold = el.hold ? el.hold * (variant.stats.energyPerSecond || 0) : 0;
    const energyFromReps = el.reps ? el.reps * (variant.stats.energyPerRep || 0) : 0;

    return sum + energyFromHold + energyFromReps;
  }, 0);
};

const EnergyBar = ({ elements, userVariants, userEnergy }) => {
  const totalEnergyUsed = useMemo(() => calculateEnergyUsed(elements, userVariants), [elements, userVariants]);
  const remainingEnergy = Math.max(0, (userEnergy || 0) - totalEnergyUsed);

  const percentage = userEnergy > 0 ? (remainingEnergy / userEnergy) * 100 : 0;
  const barColor = percentage > 30 ? "bg-green-500" : "bg-red-500";

  return (
    <div className="text-xs">
      <strong>Energía disponible: </strong> {remainingEnergy}/{userEnergy}
      <div className="w-full bg-gray-700 rounded-md h-3 mt-1">
        <div
          className={`h-3 rounded-md transition-all duration-500 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default EnergyBar;
