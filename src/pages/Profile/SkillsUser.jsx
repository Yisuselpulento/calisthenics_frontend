import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";
import UserSkillCard from "../../components/Profile/UserSkillCard";

const SkillsUser = () => {
  const { username } = useParams();
  const { currentUser, viewedProfile, profileLoading, loadProfile } = useAuth();

  // 🔹 Cargar perfil al montar o cambiar el username
  useEffect(() => {
    if (username) loadProfile(username);
  }, [username]);

  // 🔹 Mostrar loading mientras se trae el perfil
  if (profileLoading)
    return <p className="text-white text-center mt-10">Cargando...</p>;

  if (!viewedProfile)
    return <p className="text-white text-center mt-10">Usuario no encontrado</p>;

  const user = viewedProfile;
  const isOwner = currentUser?.username === user.username;

  // 🔹 Transformar skills en variantes enriquecidas
  const userVariants = user.skills?.flatMap((userSkill) =>
    userSkill.variants.map((variant) => ({
      variantKey: variant.variantKey,
      fingers: variant.fingers,
      video: variant.video,
      name: variant.name,
      type: variant.type,
      stats: variant.stats,
      staticAU: variant.staticAU,
      dynamicAU: variant.dynamicAU,
      skillName: userSkill.skill.name,
      skillId: userSkill.skill._id,
    }))
  ) || [];

  // 🔹 Manejar eliminación de variante (solo si es el owner)
  const handleDeleteSkill = (variantKey) => {
    if (!isOwner) return;
    const confirmDelete = confirm("¿Seguro que deseas eliminar esta skill?");
    if (!confirmDelete) return;

    // Filtrar la variante específica
    user.skills.forEach((userSkill) => {
      userSkill.variants = userSkill.variants.filter(
        (v) => v.variantKey !== variantKey
      );
    });

    alert("Skill eliminada");
  };

  return (
    <div className="p-2 max-w-4xl mx-auto text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Skills</h1>

        <div className="flex items-center gap-5">
          {isOwner && (
            <Link
              to={`/profile/${currentUser.username}/add-skill`}
              className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 rounded-md transition"
            >
              + Skill
            </Link>
          )}
          <BackButton />
        </div>
      </div>

      {/* VARIANT CARDS */}
      {userVariants.length > 0 ? (
        <div className="grid gap-1 sm:grid-cols-2 grid-cols-3">
          {userVariants.map((variant) => (
            <UserSkillCard
              key={variant.variantKey} // variantKey como ID único
              skill={variant}
              ownerUsername={user.username}
              onDelete={handleDeleteSkill}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic mt-5">
          {isOwner
            ? "Aún no tienes skills desbloqueadas."
            : "Este usuario no tiene skills desbloqueadas."}
        </p>
      )}
    </div>
  );
};

export default SkillsUser;
