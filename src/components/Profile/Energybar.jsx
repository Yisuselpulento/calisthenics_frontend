import { useEnergy } from "../../hooks/useEnergy";
import { useNavigate } from "react-router-dom";

const EnergyBar = ({ maxEnergy = 1000 }) => {
  const { energy } = useEnergy();
  const navigate = useNavigate();

  const percentage = Math.min((energy / maxEnergy) * 100, 100);

  return (
    <div className="flex items-center gap-2 w-full">
      {/* BOTÓN UPGRADE */}
      <button
        onClick={() => navigate("/energy/upgrade")}
        className="flex items-center justify-center w-6 h-6 rounded-md 
                   bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition"
        title="Upgrade Energy"
      >
        +
      </button>

      {/* ENERGY BAR */}
      <div className="flex-1 h-1 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default EnergyBar;
