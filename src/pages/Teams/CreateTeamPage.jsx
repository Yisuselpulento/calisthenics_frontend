/* import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { teams } from "../../helpers/teams";
import { users } from "../../helpers/users";  
import BackButton from "../../components/Buttons/BackButton"; */

const CreateTeamPage = () => {
 /*  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // 🔎 Buscar si ya tiene team
  const existingTeam = teams.find((t) =>
    t.members.some((m) => m.userId === currentUser._id)
  );

  // 🔁 Si ya tiene equipo → redirige
  useEffect(() => {
    if (existingTeam) {
      navigate(`/teams/${existingTeam._id}`);
    }
  }, [existingTeam, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    invitedUsers: [],
  });

  const myFriends = users.filter((u) =>
    currentUser.following.includes(u._id)
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleInvite = (userId) => {
    setFormData((prev) => {
      const exists = prev.invitedUsers.includes(userId);
      return {
        ...prev,
        invitedUsers: exists
          ? prev.invitedUsers.filter((id) => id !== userId)
          : [...prev.invitedUsers, userId],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ⚠️ Lógica backend vendría aquí
    console.log("Nuevo equipo creado:", formData);

    // simular ID
    const newTeamId = "t" + (teams.length + 1);

    navigate(`/teams/${newTeamId}`);
  }; */

  return (
    <div className="p-2 text-white min-h-screen">
     {/*  <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Crear equipo</h2>

        <BackButton />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto bg-white/10 p-4 rounded-md backdrop-blur-md border border-white/20"
      >
       
        <div>
          <label className="block text-sm mb-1">Logo del equipo (URL)</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20 focus:border-white/40"
          />

          {formData.logo && (
            <img
              src={formData.logo}
              alt="logo-preview"
              className="w-full h-[120px] object-cover mt-2 rounded-md border border-gray-700"
            />
          )}
        </div>

       
        <div>
          <label className="block text-sm mb-1">Nombre del equipo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20 focus:border-white/40"
          />
        </div>

      
        <div>
          <label className="block text-sm mb-1">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 rounded-md text-sm border border-white/20 focus:border-white/40 min-h-[80px]"
          />
        </div>

        
        <div>
          <label className="block text-sm mb-1">
            Invitar amigos que sigues
          </label>

          {myFriends.length === 0 ? (
            <p className="text-gray-400 text-xs">
              No sigues a nadie aún para invitarlos.
            </p>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              {myFriends.map((friend) => (
                <label
                  key={friend._id}
                  className="flex items-center gap-2 bg-black/20 p-2 rounded-md border border-white/10 cursor-pointer hover:bg-black/30"
                >
                  <input
                    type="checkbox"
                    checked={formData.invitedUsers.includes(friend._id)}
                    onChange={() => toggleInvite(friend._id)}
                  />
                  <img
                    src={friend.avatar}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="text-sm">{friend.name}</p>
                </label>
              ))}
            </div>
          )}
        </div>

       
        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-semibold transition"
        >
          Crear equipo
        </button>
      </form> */}
    </div>
  );
};

export default CreateTeamPage;
