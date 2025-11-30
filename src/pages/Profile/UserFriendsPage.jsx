import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import ConfirmUnfollowModal from "../../components/Modals/ConfirmUnfollowModal";
import UserItem from "../../components/Cards/UserItem";

const UserFriendsPage = () => {
  const { currentUser, toggleFollow } = useAuth();
  const { username } = useParams();

  const [tab, setTab] = useState("following");
  const [search, setSearch] = useState("");
  const [unfollowTarget, setUnfollowTarget] = useState(null);

  if (!currentUser)
    return <p className="text-white text-center mt-10">Cargando…</p>;

  if (currentUser.username !== username)
    return <p className="text-white text-center mt-10">Perfil no disponible</p>;

  const followers = currentUser.followers || [];
  const following = currentUser.following || [];

  const filteredList = useMemo(() => {
    const base = tab === "following" ? following : followers;
    return base.filter(
      (u) =>
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [tab, search, following, followers]);

  const handleToggleFollow = (user) => {
    const isFollowing = following.some((f) => f._id === user._id);

    if (isFollowing) {
      // Mostrar modal para confirmar dejar de seguir
      setUnfollowTarget(user);
    } else {
      // Seguir directamente
      toggleFollow(user);
    }
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
        {filteredList.map((person) => (
          <UserItem
            key={person._id}
            user={person}
            isFollowing={following.some((f) => f._id === person._id)}
            onToggleFollow={handleToggleFollow}
          />
        ))}

        {filteredList.length === 0 && (
          <p className="text-gray-400 text-center mt-6">No se encontraron usuarios.</p>
        )}
      </div>

      {/* MODAL CONFIRM UNFOLLOW */}
      <ConfirmUnfollowModal
        isOpen={!!unfollowTarget}
        onCancel={() => setUnfollowTarget(null)}
        onConfirm={() => {
          if (unfollowTarget) {
            toggleFollow(unfollowTarget);
            setUnfollowTarget(null);
          }
        }}
      />
    </div>
  );
};

export default UserFriendsPage;
