
const ComboCard = ({ combo }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-white">{combo.comboName}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          combo.type === "static"
            ? "bg-blue-500/20 text-blue-300"
            : combo.type === "dynamic"
            ? "bg-green-500/20 text-green-300"
            : "bg-purple-500/20 text-purple-300"
        }`}>
          {combo.type}
        </span>
      </div>
      <p className="text-sm text-gray-300 mb-2">{combo.description}</p>
      <p className="text-xs text-gray-400">Skills incluidas: {combo.skills.length}</p>
      <p className="text-xs text-gray-400">Aura total usada: {combo.totalAuraUsed}</p>
    </div>
  )
}

export default ComboCard