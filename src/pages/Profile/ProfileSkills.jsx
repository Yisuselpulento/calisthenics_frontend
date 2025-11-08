import ComboCard from "../../components/Profile/ComboCard"
import SkillCard from "../../components/Profile/SkillCard"
import { useParams } from "react-router-dom"
import { users } from "../../helpers/users"

const ProfileSkills = () => {
   const { username } = useParams()
  const user = users.find((u) => u.username === username)

  if (!user)
    return (
      <p className="text-white text-center mt-10">
        Usuario no encontrado
      </p>
    )


  // Ordenar combos: favoritos primero
  const sortedCombos = [...(user.combos || [])].sort((a, b) =>
    a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1
  )

  return (
    <div className="p-2 max-w-4xl mx-auto text-white">
      {/* === SECCIÓN COMBOS === */}
      <section className="mb-5">
        <h2 className="text-2xl font-bold mb-4">Combos</h2>
        {sortedCombos.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {sortedCombos.map((combo) => (
              <ComboCard key={combo.comboId} combo={combo} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">
            Este usuario aún no ha creado combos.
          </p>
        )}
      </section>

      {/* === SECCIÓN SKILLS === */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Skills Desbloqueadas</h2>
        {user.skills?.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {user.skills.map((skill) => (
              <SkillCard key={skill.variantId} skill={skill} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">
            Aún no tienes skills desbloqueadas.
          </p>
        )}
      </section>
    </div>
  )
}

export default ProfileSkills