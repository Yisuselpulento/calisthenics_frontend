import { useParams, Link } from "react-router-dom";
import { teams } from "../helpers/teams";
import { users } from "../helpers/users";

const TeamPage = () => {
  const { teamId } = useParams();
 
  const team = teams.find((t) => t._id === teamId);

  if (!team) {
    return <p className="text-white p-2">Equipo no encontrado</p>;
  }

  // Obtener usuarios miembros
  const teamMembers = team.members
    .map((m) => {
      const user = users.find((u) => u._id === m.userId);
      return user ? { ...user, role: m.role } : null;
    })
    .filter(Boolean);

  return (
    <div className="p-2 flex flex-col gap-4 text-white min-h-screen">

      {/* LOGO DEL EQUIPO */}
      <section className="w-full flex justify-center">
        <img
          src={team.logo}
          alt={team.name}
          className="w-full max-w-md h-[120px] object-cover rounded-lg border border-gray-800"
        />
      </section>

      {/* INFORMACIÓN DEL TEAM */}
      <section className="text-center">
        <h1 className="text-2xl font-bold">{team.name}</h1>
        <p className="text-gray-300 text-sm mt-1">{team.description}</p>

        <div className="flex justify-center gap-4 mt-3 text-sm">
          <p>🏆 Rank: {team.teamRank}</p>
          <p>✔️ Wins: {team.totalWins}</p>
          <p>❌ Losses: {team.totalLosses}</p>
        </div>
      </section>

      {/* MIEMBROS */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Miembros del equipo</h2>

        <div className="flex flex-col gap-3">
          {teamMembers.map((member) => (
            <Link
              key={member._id}
              to={`/profile/${member.username}`}
              className="flex items-center gap-3 p-2 rounded-md bg-gray-800/40 hover:bg-gray-800/60 transition"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-700"
              />

              <div>
                <p className="text-sm font-semibold">{member.name}</p>
                <p className="text-xs text-gray-400 capitalize">
                  {member.role}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
