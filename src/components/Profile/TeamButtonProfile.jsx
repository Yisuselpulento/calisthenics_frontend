import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { teams } from "../../helpers/teams"; // importa tu array de teams

const TeamButtonProfile = () => {
  const { currentUser } = useAuth();

  const userTeamId = currentUser.teamIds?.[0] || null;
  const userTeam = userTeamId
    ? teams.find((t) => t._id === userTeamId)
    : null;

  // 👉 Si NO tiene team
  if (!userTeam) {
    return (
      <Link
        to="/teams/create"
        className="px-3 py-1 text-sm bg-stone-800 hover:bg-stone-700 rounded-md transition"
      >
        + Team
      </Link>
    );
  }

  // 👉 Si SÍ tiene team, mostrar logo
  return (
    <Link
      to={`/teams/${userTeam._id}`}
      className="flex items-center transition"
    >
      <img
        src={userTeam.logo}
        alt="Team logo"
        className="w-14 h-7 object-cover rounded-lg"
      />
    </Link>
  );
};

export default TeamButtonProfile;
