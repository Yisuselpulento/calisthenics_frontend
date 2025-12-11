import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";
import UserSkillCard from "../../components/Profile/UserSkillCard";
import { getUserVariants } from "../../helpers/getUserVariants";

const SkillsUser = () => {
  const { currentUser, viewedProfile} = useAuth();

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
              key={variant.userSkillVariantId} 
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
