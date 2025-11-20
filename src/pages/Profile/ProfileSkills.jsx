import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ComboCard from "../../components/Profile/ComboCard";
import SkillCard from "../../components/Profile/SkillCard";
import { users } from "../../helpers/users";
import { useAuth } from "../../context/AuthContext";
import { PiCards, PiCardsFill } from "react-icons/pi";
import { calculateComboStats } from "../../helpers/skillUtils";

const ProfileSkills = () => {
  const { username } = useParams();
  const [cardView, setCardView] = useState(false);
  const { currentUser } = useAuth();

  const user = users.find((u) => u.username === username);

  if (!user)
    return (
      <p className="text-white text-center mt-10">Usuario no encontrado</p>
    );

  const isOwner = currentUser?.username === username;

  // Obtener combos favoritos
  const favoriteCombos = Object.values(user.favoriteCombos)
    .filter(Boolean)
    .map((favId) => user.combos.find((c) => c.comboId === favId))
    .filter(Boolean);

  return (
    <div className="p-2 max-w-4xl mx-auto text-white">

      {/* === COMBOS FAVORITOS === */}
      <section className="mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Combos</h2>
          {isOwner && (
            <Link
              to={`/profile/${username}/combos`}
              className="text-sm text-blue-500 hover:underline"
            >
              Ver todos →
            </Link>
          )}
        </div>

        {favoriteCombos.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {favoriteCombos.map((combo) => {
              const stats = calculateComboStats(combo);
              return <ComboCard key={combo.comboId} combo={{ ...combo, ...stats }} />;
            })}
          </div>
        ) : (
          <p className="text-gray-400 italic">
            {isOwner
              ? "Aún no tienes combos favoritos."
              : "Este usuario aún no tiene combos."}
          </p>
        )}
      </section>

      {/* === SKILLS === */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Skills Desbloqueadas</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCardView(!cardView)}
              className="text-sm bg-stone-800 hover:bg-gray-600 px-3 py-1 rounded-lg"
            >
              {cardView ? <PiCards /> : <PiCardsFill />}
            </button>

            {/* ➡ LINK A LA PÁGINA DE TODAS LAS SKILLS */}
            <Link
              to={`all-skills`}
              className="text-sm text-blue-500 hover:underline"
            >
              Ver todas →
            </Link>
          </div>
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
            {isOwner
              ? "Aún no tienes skills desbloqueadas."
              : "Este usuario aún no tiene skills desbloqueadas."}
          </p>
        )}
      </section>
    </div>
  );
};

export default ProfileSkills;
