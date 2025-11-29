import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import ConfirmUnfollowModal from "../../components/Modals/ConfirmUnfollowModal";

const UserFriendsPage = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const { username } = useParams();

  const [tab, setTab] = useState("following");
  const [search, setSearch] = useState("");
  const [unfollowTarget, setUnfollowTarget] = useState(null);

  if (!currentUser) return <p className="text-white text-center mt-10">Cargando…</p>;
  if (currentUser.username !== username) return <p className="text-white text-center mt-10">Perfil no disponible</p>;

  // Tomamos followers y following directamente
  const followers = currentUser.followers || [];
  const following = currentUser.following || [];

  // Filtrar lista según tab y búsqueda
  const filteredList = useMemo(() => {
    const base = tab === "following" ? following : followers;
    return base.filter(
      (u) =>
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [tab, search, following, followers]);

  // Manejar toggle follow / unfollow
  const handleToggleFollow = (targetUser) => {
    const isFollowing = following.some((f) => f._id === targetUser._id);

    // Actualizamos arrays locales
    const updatedFollowing = isFollowing
      ? following.filter((u) => u._id !== targetUser._id)
      : [...following, targetUser];

    // Actualizamos currentUser en el context
    updateCurrentUser({ ...currentUser, following: updatedFollowing });
  };

  return (
    <div className="max-w-3xl mx-auto text-white p-2">
      {/* TABS */}
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

      {/* BUSCADOR */}
      <input
        placeholder="Buscar usuario…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 bg-stone-800 text-white rounded-lg border border-stone-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* LISTA */}
      <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
        {filteredList.map((person) => {
          const isFollowing = following.some((f) => f._id === person._id);

          return (
            <div
              key={person._id}
              className="flex items-center justify-between bg-stone-800 p-3 rounded-lg hover:bg-stone-700"
            >
              <Link
                to={`/profile/${person.username}`}
                className="flex items-center gap-3"
              >
                <img
                  src={person.avatar}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={person.username}
                />
                <div>
                  <p className="font-medium">{person.fullName}</p>
                  <p className="text-xs text-gray-400">@{person.username}</p>
                </div>
              </Link>

              <button
                onClick={() => handleToggleFollow(person)}
                className={`px-3 py-1 text-xs rounded ${
                  isFollowing
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isFollowing ? "Dejar de seguir" : "Seguir"}
              </button>
            </div>
          );
        })}

        {filteredList.length === 0 && (
          <p className="text-gray-400 text-center mt-6">
            No se encontraron usuarios.
          </p>
        )}
      </div>

      {/* MODAL CONFIRM UNFOLLOW */}
      <ConfirmUnfollowModal
        isOpen={!!unfollowTarget}
        onCancel={() => setUnfollowTarget(null)}
        onConfirm={() => {
          if (unfollowTarget) {
            handleToggleFollow(unfollowTarget);
            setUnfollowTarget(null);
          }
        }}
      />
    </div>
  );
};

export default UserFriendsPage;
