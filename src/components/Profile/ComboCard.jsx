const ComboCard = ({ combo }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-white">{combo.comboName}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            combo.type === "static"
              ? "bg-blue-500/50 text-blue-300"
              : combo.type === "dynamic"
              ? "bg-green-500/50 text-green-300"
              : "bg-yellow-500/50 text-yellow-300"
          }`}
        >
          {combo.type}
        </span>
      </div>
      <p className="text-xs text-gray-400">
        Skills incluidas: {combo.skills.length}
      </p>
      <p className="text-xs text-gray-400">
        Aura total usada: {combo.totalAura || 0}
      </p>
      <p className="text-xs text-gray-400">
        Energía total usada: {combo.totalEnergy || 0}
      </p>
    </div>
  );
};

export default ComboCard;
