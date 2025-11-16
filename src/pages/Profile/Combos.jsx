import { useParams, Link } from "react-router-dom"
import { users } from "../../helpers/users"

const Combos = () => {
  const { username } = useParams()
  const user = users.find((u) => u.username === username)

  if (!user)
    return <p className="text-white text-center mt-10">Usuario no encontrado</p>

  const combos = user.combos || []

  return (
    <div className="max-w-5xl mx-auto text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Combos de {username}</h1>

        {/* ➕ Agregar Combo */}
        <Link
          to={`/profile/${username}/combos/add`}
          className="px-3 py-1 text-sm bg-primary hover:bg-primary/80 cursor-pointer rounded-md transition"
        >
          + Combo
        </Link>
      </div>

      {combos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {combos.map((combo) => (
            <div
              key={combo.comboId}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:border-blue-500 transition-all"
            >
              <h3 className="text-xl font-bold mb-2">{combo.comboName}</h3>
              <p className="text-sm text-gray-300 mb-3">{combo.description}</p>

              <div className="text-sm space-y-1 mb-4">
                <p><span className="font-semibold text-blue-300">Tipo:</span> {combo.type}</p>
                <p><span className="font-semibold text-blue-300">Total Aura:</span> {combo.totalAuraUsed}</p>
                <p><span className="font-semibold text-blue-300">Energía:</span> {combo.totalEnergyCost}</p>
              </div>

              <div className="flex justify-between">
                {/* Ver detalles */}
                <Link
                  to={`/profile/${username}/combos/${combo.comboId}`}
                  className="bg-primary hover:bg-primary/80 cursor-pointer text-white text-sm px-3 py-1 rounded-lg"
                >
                  Ver detalles
                </Link>

                {/* Editar */}
                <Link
                  to={`/profile/${username}/combos/${combo.comboId}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-400 cursor-pointer text-sm px-3 py-1 rounded-lg"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic text-center">
          Este usuario no tiene combos aún.
        </p>
      )}
    </div>
  )
}

export default Combos
