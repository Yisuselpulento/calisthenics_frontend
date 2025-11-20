import { useParams, Link } from "react-router-dom";
import { users } from "../../helpers/users";
import SkillCard from "../../components/Profile/SkillCard";
import BackButton from "../../components/Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";

const SkillsUser = () => {
  const { username } = useParams();
  const { currentUser } = useAuth();

  const user = users.find((u) => u.username === username);

  if (!user)
    return (
      <p className="text-white text-center mt-10">Usuario no encontrado</p>
    );

  const isOwner = currentUser?.username === username;

  return (
    <div className="p-2 max-w-4xl mx-auto text-white">
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

      {user.skills?.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {user.skills.map((skill) => (
            <SkillCard key={skill.variantId} skill={skill} view="card" />
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
