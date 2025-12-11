import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";
import DeleteComboModal from "../../components/Modals/DeleteComboModal";
import UserComboCard from "../../components/Profile/UserComboCard";
import { deleteComboService } from "../../Services/comboFetching.js";
import { toast } from "react-hot-toast";

const Combos = () => {
  const { username } = useParams();
  const { currentUser, viewedProfile, profileLoading, loadProfile, updateViewedProfile } = useAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [comboToDelete, setComboToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username) loadProfile(username);
  }, [username]);

  if (profileLoading)
    return <p className="text-white text-center mt-10">Cargando...</p>;

  if (!viewedProfile)
    return <p className="text-white text-center mt-10">Usuario no encontrado</p>;

  const user = viewedProfile;
  const isOwner = currentUser?.username === user.username;
  const combos = user.combos || [];

  const handleDeleteClick = (combo) => {
    setComboToDelete(combo);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!comboToDelete) return;

    setLoading(true);
    try {
      const res = await deleteComboService(comboToDelete._id || comboToDelete.comboId);
      if (!res.success) throw new Error(res.message || "Error eliminando el combo");

      toast.success("Combo eliminado correctamente 🎉");

      // Actualizar el perfil visto con la info nueva
      updateViewedProfile(res.user);

      setShowDeleteModal(false);
      setComboToDelete(null);
    } catch (error) {
      toast.error(error.message || "Error eliminando el combo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto text-white min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Combos</h1>
        {isOwner && (
          <Link
            to={`/profile/${currentUser.username}/combos/add`}
            className="px-3 py-1 text-sm bg-primary hover:bg-primary/80 cursor-pointer rounded-md transition"
          >
            + Combo
          </Link>
        )}
      </div>

      {/* LISTADO DE COMBOS */}
      {combos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {combos.map((combo) => (
            <UserComboCard
              key={combo._id || combo.comboId}
              combo={combo}
              username={user.username}
              isOwner={isOwner}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic text-center mt-5">
          {isOwner ? "Aún no has creado combos." : "Este usuario no tiene combos creados."}
        </p>
      )}

      {/* MODAL DE ELIMINACIÓN */}
      <DeleteComboModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        comboName={comboToDelete?.name || comboToDelete?.comboName}
        loading={loading}
      />

      <BackButton />
    </div>
  );
};

export default Combos;
