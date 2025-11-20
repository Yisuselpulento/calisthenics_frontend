import { useParams, Link } from "react-router-dom";
import { users } from "../../helpers/users";
import SkillCard from "../../components/Profile/SkillCard";
import BackButton from "../../components/Buttons/BackButton";

const SkillsUser = () => {
  const { username } = useParams();

  const user = users.find((u) => u.username === username);

  if (!user)
    return (
      <p className="text-white text-center mt-10">Usuario no encontrado</p>
    );

  return (
    <div className="p-2 max-w-4xl mx-auto text-white">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Skills</h1>

        <BackButton />
      </div>

      {user.skills?.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {user.skills.map((skill) => (
            <SkillCard
              key={skill.variantId}
              skill={skill}
              view="card"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic mt-5">
          Este usuario no tiene skills desbloqueadas.
        </p>
      )}
    </div>
  );
};

export default SkillsUser;
