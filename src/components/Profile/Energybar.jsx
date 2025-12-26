const EnergyBar = ({ energy, maxEnergy = 1000 }) => {
  const percentage = Math.min((energy / maxEnergy) * 100, 100);

  return (
    <div className="w-full h-1 bg-gray-300 rounded-full ">
      <div
        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default EnergyBar;
