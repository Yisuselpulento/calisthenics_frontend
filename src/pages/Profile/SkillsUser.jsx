import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";
import UserSkillCard from "../../components/Profile/UserSkillCard";
import { getUserVariants } from "../../helpers/getUserVariants";

const SkillsUser = () => {
  const { username } = useParams();
  const { currentUser, viewedProfile, profileLoading, loadProfile } = useAuth();

  // 🔹 Cargar perfil al montar o cambiar el username
  useEffect(() => {
    if (username) loadProfile(username);
  }, [username]);

  if (profileLoading)
    return <p className="text-white text-center mt-10">Cargando...</p>;

  if (!viewedProfile)
    return <p className="text-white text-center mt-10">Usuario no encontrado</p>;

  const user = viewedProfile;
  const isOwner = currentUser?.username === user.username;
  const userVariants = getUserVariants(user.skills);


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
              key={variant.variantKey + "-" + variant.fingers} // ⚡ asegurar key única si hay variantes con mismo variantKey
              skill={variant}
              ownerUsername={user.username}
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
