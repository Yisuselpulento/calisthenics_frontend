import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEnergy } from "../hooks/useEnergy";

const EnergyUpgrade = () => {
  const {
    energy,
    boostMultiplier,
    boostUntil,
    loading,
    buyBoost,
    buyFullEnergy,
  } = useEnergy();

  const navigate = useNavigate();

  const handleBuyBoost = async () => {
    const res = await buyBoost();
    res.success ? toast.success(res.message) : toast.error(res.message);
  };

  const handleBuyFull = async () => {
    const res = await buyFullEnergy();
    res.success ? toast.success(res.message) : toast.error(res.message);
  };

  return (
    <div className="p-4 max-w-md mx-auto text-white">
      <h1 className="text-xl font-bold mb-4">⚡ Energy Upgrade</h1>

      {/* INFO ACTUAL */}
      <div className="bg-stone-800 p-3 rounded-md mb-4">
        <p>Energía actual: <b>{energy}</b></p>

        {boostUntil && new Date(boostUntil) > new Date() && (
          <p className="text-sm text-green-400 mt-1">
            Boost activo x{boostMultiplier} hasta{" "}
            {new Date(boostUntil).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* OPCIÓN 1 */}
      <div className="bg-stone-900 p-4 rounded-lg mb-3 border border-stone-700">
        <h2 className="font-semibold mb-1">⚡ Boost x2 (3 días)</h2>
        <p className="text-sm text-gray-400 mb-2">
          Duplica la regeneración de energía durante 3 días.
        </p>

        <button
          disabled={loading}
          onClick={handleBuyBoost}
          className="w-full py-2 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-400 disabled:opacity-50"
        >
          Activar Boost
        </button>
      </div>

      {/* OPCIÓN 2 */}
      <div className="bg-stone-900 p-4 rounded-lg border border-stone-700">
        <h2 className="font-semibold mb-1">🔋 Recarga completa</h2>
        <p className="text-sm text-gray-400 mb-2">
          Rellena tu energía al máximo de forma instantánea.
        </p>

        <button
          disabled={loading}
          onClick={handleBuyFull}
          className="w-full py-2 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 disabled:opacity-50"
        >
          Recargar Energía
        </button>
      </div>

      {/* VOLVER */}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-sm text-gray-400 underline"
      >
        ← Volver
      </button>
    </div>
  );
};

export default EnergyUpgrade;
