import { useParams, useNavigate } from "react-router-dom"
import { users } from "../../helpers/users"

const ComboDetails = () => {
  const { username, comboId } = useParams()
  const navigate = useNavigate()
  const user = users.find((u) => u.username === username)
  const combo = user?.combos?.find((c) => c.comboId === comboId)

  if (!user || !combo)
    return <p className="text-white text-center mt-10">Combo no encontrado.</p>

  return (
    <div className="max-w-4xl mx-auto text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{combo.comboName}</h1>
        <button
          onClick={() => navigate(`/profile/${username}/combos/${combo.comboId}/edit`)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg"
        >
          Editar
        </button>
      </div>

      <p className="text-gray-300 mb-4">{combo.description}</p>

      {/* Datos principales */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6">
        <p><strong>Tipo:</strong> {combo.type}</p>
        <p><strong>Total Aura:</strong> {combo.totalAuraUsed}</p>
        <p><strong>Energía:</strong> {combo.totalEnergyCost}</p>
        <p><strong>Daño total:</strong> {combo.totalDamage}</p>
        <p><strong>Creado el:</strong> {new Date(combo.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Skills */}
      <h2 className="text-2xl font-bold mb-4">Skills del Combo</h2>
      <div className="space-y-4">
        {combo.skills.map((skill, index) => {
          const skillInfo = user.skills.find((s) => s.skillId === skill.skillId)
          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{skillInfo?.variantName || skill.skillId}</h3>
                <span className="text-sm text-gray-400">{skill.variantId}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                {skill.holdSeconds && <p>⏱ Hold: {skill.holdSeconds}s</p>}
                {skill.reps && <p>🔁 Reps: {skill.reps}</p>}
                <p>💫 Aura: {skill.auraUsed}</p>
                <p>⚡ Energía: {skill.energyCost}</p>
              </div>

              {skillInfo?.videoUrl && (
                <video
                  src={skillInfo.videoUrl}
                  controls
                  className="mt-3 rounded-lg w-full"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ComboDetails
