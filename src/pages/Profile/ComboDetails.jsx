import { useParams, Link } from "react-router-dom"
import { users } from "../../helpers/users"
import { skills } from "../../helpers/skills"

const ComboDetails = () => {
  const { username, comboId } = useParams()

  const user = users.find((u) => u.username === username)
  const combo = user?.combos?.find((c) => c.comboId === comboId)

  if (!user || !combo)
    return (
      <p className="text-white text-center mt-10">Combo no encontrado.</p>
    )

  return (
    <div className="max-w-4xl mx-auto text-white min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">{combo.comboName}</h1>

        <Link
          to={`/profile/${username}/combos/${combo.comboId}/edit`}
          className="bg-yellow-500 hover:bg-yellow-400 px-2 py-1 rounded-lg"
        >
          Editar
        </Link>
      </div>

      {/* Datos principales */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6">
        <p><strong>Tipo:</strong> {combo.type}</p>
        <p><strong>Total Aura:</strong> {combo.totalAuraUsed}</p>
        <p><strong>Energía:</strong> {combo.totalEnergyCost}</p>
        <p><strong>Daño total:</strong> {combo.totalDamage}</p>
        
        <p className="text-xs mt-4">
          Creado: {new Date(combo.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Skills */}
      <h2 className="text-2xl font-bold mb-2">Skills del Combo</h2>
      <div className="space-y-4">
        {combo.skills.map((skill, index) => {
          
          // Buscar skill base en la DB global
          const baseSkill = skills.find((s) => s.skillId === skill.skillId)

          // Buscar variant dentro de la skill base
          const variant = baseSkill?.variants?.find(
            (v) => v.variantId === skill.variantId
          )

          // Crear nombre final
          const displayName = baseSkill
            ? `${baseSkill.skillName} – ${variant?.variant || "Variant desconocida"}`
            : "Skill desconocida"

          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20"
            >
              <h3 className="font-bold mb-2">{displayName}</h3>

              <div className="grid grid-cols-2 gap-2 text-sm">
                {skill.holdSeconds && <p>⏱ Hold: {skill.holdSeconds}s</p>}
                {skill.reps && <p>🔁 Reps: {skill.reps}</p>}
                <p>💫 Aura: {skill.auraUsed}</p>
                <p>⚡ Energía: {skill.energyCost}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ComboDetails
