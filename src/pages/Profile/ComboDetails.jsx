import { useParams, Link } from "react-router-dom"
import { users } from "../../helpers/users"
import { calculateComboStats } from "../../helpers/skillUtils"
import EditAndDeleteButton from "../../components/Buttons/EditAndDeleteButton"

const ComboDetails = () => {
  const { username, comboId } = useParams()

  const user = users.find((u) => u.username === username)
  const combo = user?.combos?.find((c) => c.comboId === comboId)

  if (!user || !combo)
    return <p className="text-white text-center mt-10">Combo no encontrado.</p>

  // 👉 Usamos el helper completo
  const {
    totalAura,
    totalEnergy,
    skills: processedSkills
  } = calculateComboStats(combo, user.skills)

   console.log("📌 Resultado calculateComboStats =>", {
    totalAura,
    totalEnergy,
    processedSkills
  })

  return (
    <div className="max-w-4xl mx-auto text-white min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">{combo.comboName}</h1>

      <EditAndDeleteButton
                    editLink={`/profile/${username}/combos/${combo.comboId}/edit`}
                    onDeleteClick={() => alert("Eliminar combo pronto")}  
                    className="px-2 rounded"
                  />
      </div>

      {/* Datos del Combo */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6">
        <p><strong>Tipo:</strong> {combo.type}</p>
        <p><strong>Total Aura:</strong> {totalAura}</p>
        <p><strong>Energía total:</strong> {totalEnergy}</p>

        <p className="text-xs mt-4">
          Creado: {new Date(combo.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Lista de Skills con video */}
      <h2 className="text-2xl font-bold mb-2">Skills del Combo</h2>

      <div className="space-y-4">
        {processedSkills.map((skill, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20"
          >
            <h3 className="font-bold mb-2">
              {skill.skillName} – {skill.variantName}
            </h3>

            {/* 🎥 Video */}
            {skill.videoUrl && (
              <video
                src={skill.videoUrl}
                 autoPlay
                   loop
                    muted
                  playsInline
                className="w-full rounded-xl mb-3"
              />
            )}

            <div className="grid grid-cols-2 gap-2 text-sm">
              {skill.holdSeconds > 0 && <p>⏱ Hold: {skill.holdSeconds}s</p>}
              {skill.reps > 0 && <p>🔁 Reps: {skill.reps}</p>}
              <p>💫 Aura: {skill.damage}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ComboDetails
