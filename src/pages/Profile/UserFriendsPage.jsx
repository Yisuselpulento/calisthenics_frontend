import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { users } from "../../helpers/users";
import ConfirmUnfollowModal from "../../components/Modals/ConfirmUnfollowModal";

const UserFriendsPage = () => {
  const { username } = useParams();

  const [tab, setTab] = useState("following");
  const [search, setSearch] = useState("");

  // 🔥 Estado para el modal de "unfollow"
  const [unfollowTarget, setUnfollowTarget] = useState(null);

  const user = users.find((u) => u.username === username);

  if (!user)
    return <p className="text-white text-center mt-10">Usuario no encontrado</p>;

  const followers = users.filter((u) => user.followers?.includes(u._id));
  const following = users.filter((u) => user.following?.includes(u._id));

  const filteredList = useMemo(() => {
    const base = tab === "following" ? following : followers;

    return base.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [tab, search, following, followers]);

  return (
    <div className="max-w-3xl mx-auto text-white p-2">
      {/* 🔥 Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setTab("following")}
          className={`px-4 py-2 rounded-lg text-sm ${
            tab === "following"
              ? "bg-primary text-white"
              : "bg-stone-800 text-gray-300 hover:bg-stone-700"
          }`}
        >
          Siguiendo ({following.length})
        </button>

        <button
          onClick={() => setTab("followers")}
          className={`px-4 py-2 rounded-lg text-sm ${
            tab === "followers"
              ? "bg-primary text-white"
              : "bg-stone-800 text-gray-300 hover:bg-stone-700"
          }`}
        >
          Seguidores ({followers.length})
        </button>
      </div>

      {/* 🔍 Buscador */}
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 bg-stone-800 text-white rounded-lg border border-stone-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* 🔥 Lista */}
      <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
        {filteredList.map((f) => {
          const isFollowing = user.following.includes(f._id);

          return (
            <div
              key={f._id}
              className="flex items-center justify-between bg-stone-800 p-3 rounded-lg hover:bg-stone-700"
            >
              <Link to={`/profile/${f.username}`} className="flex items-center gap-3">
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{f.name}</p>
                  <p className="text-xs text-gray-400">@{f.username}</p>
                </div>
              </Link>

              {/* 🔘 Botón "Dejar de seguir" — solo si lo sigue */}
              {isFollowing && (
                <button
                  onClick={() => setUnfollowTarget(f)}
                  className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded"
                >
                  Dejar de seguir
                </button>
              )}
            </div>
          );
        })}

        {filteredList.length === 0 && (
          <p className="text-gray-400 text-center mt-6">
            No se encontraron usuarios.
          </p>
        )}
      </div>

      {/* 🔥 Modal de Confirmación */}
      <ConfirmUnfollowModal
        isOpen={!!unfollowTarget}
        onCancel={() => setUnfollowTarget(null)}
        onConfirm={() => {
          // Aquí luego harás la lógica real para dejar de seguir
          console.log("Dejaste de seguir a:", unfollowTarget?.username);
          setUnfollowTarget(null);
        }}
      />
    </div>
  );
};

export default UserFriendsPage;
