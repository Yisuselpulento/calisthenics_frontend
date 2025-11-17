import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import ComboCard from "../../components/Profile/ComboCard"
import SkillCard from "../../components/Profile/SkillCard"
import { users } from "../../helpers/users"
import { useAuth } from "../../context/AuthContext"
import { PiCards, PiCardsFill } from "react-icons/pi";

const ProfileSkills = () => {
  const { username } = useParams();
  const [cardView, setCardView] = useState(false);
  const { currentUser } = useAuth();

  const user = users.find((u) => u.username === username);

  if (!user)
    return (
      <p className="text-white text-center mt-10">
        Usuario no encontrado
      </p>
    );

  const sortedCombos = [...(user.combos || [])].sort((a, b) =>
    a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1
  );

  const isOwner = currentUser?.username === username;

  return (
    <div className="p-2 max-w-4xl mx-auto text-white">

      {/* === COMBOS === */}
      <section className="mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Combos</h2>

          {isOwner && (
            <Link
              to={`/profile/${username}/combos`}
              className="text-sm text-blue-500 hover:underline"
            >
              Ver todos →
            </Link>
          )}
        </div>

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

      {/* === SKILLS === */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Skills Desbloqueadas</h2>

          <button
            onClick={() => setCardView(!cardView)}
            className="text-sm bg-stone-800 hover:bg-gray-600 px-3 py-1 rounded-lg"
          >
            {cardView ? <PiCards /> : <PiCardsFill />}
          </button>
        </div>

        {user.skills?.length > 0 ? (
          <div
            className={
              cardView
                ? "grid grid-cols-2 gap-2"
                : "grid gap-2 sm:grid-cols-2 md:grid-cols-3"
            }
          >
            {user.skills.map((skill) => (
              <SkillCard
                key={skill.variantId}
                skill={skill}
                view={cardView ? "detail" : "card"}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">
            Aún no tienes skills desbloqueadas.
          </p>
        )}
      </section>

    </div>
  );
};

export default ProfileSkills;
