import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ComboCard from "../../components/Profile/ComboCard";
import SkillCard from "../../components/Profile/SkillCard";
import { useAuth } from "../../context/AuthContext";
import { PiCards, PiCardsFill } from "react-icons/pi";
import { getUserVariants } from "../../helpers/getUserVariants";

const ProfileSkills = () => {
  const { username } = useParams();
  const { currentUser, viewedProfile, profileLoading, loadProfile } = useAuth();
  const [cardView, setCardView] = useState(false);

  useEffect(() => {
    loadProfile(username);
  }, [username]);

  if (profileLoading) 
    return <p className="text-white text-center mt-10">Cargando...</p>;
  if (!viewedProfile) 
    return <p className="text-white text-center mt-10">Usuario no encontrado</p>;

  const user = viewedProfile;
  const isOwner = currentUser?.username === username;


  // Combos favoritos reconstruidos desde IDs
  const favoriteCombos = Object.values(user.favoriteCombos || {})
    .filter(Boolean)
    .map((favId) => user.combos?.find((c) => c._id === favId))
    .filter(Boolean);


 const userVariants = getUserVariants(user.skills);

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
            {favoriteCombos.map((combo) => (
              <ComboCard key={combo._id} combo={combo} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">
            {isOwner
              ? "Aún no tienes combos favoritos."
              : "Este usuario aún no tiene combos favoritos."}
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

            <Link
              to={`all-skills`}
              className="text-sm text-blue-500 hover:underline"
            >
              Ver todas →
            </Link>
          </div>
        </div>

        {userVariants.length > 0 ? (
          <div
            className={
              cardView
                ? "grid grid-cols-2 gap-2"
                : "grid gap-2 sm:grid-cols-2 md:grid-cols-3"
            }
          >
            {userVariants.map((variant) => (
              <SkillCard
                key={`${variant.userSkillVariantId}`}
                skill={variant}        
                view={cardView ? "detail" : "card"}
                ownerUsername={username}
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
