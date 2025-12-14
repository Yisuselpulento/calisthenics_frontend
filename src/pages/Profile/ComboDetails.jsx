import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EditAndDeleteButton from "../../components/Buttons/EditAndDeleteButton";
import DeleteComboModal from "../../components/Modals/DeleteComboModal";
import { deleteComboService, getComboByIdService } from "../../Services/comboFetching.js";
import toast from "react-hot-toast";
import FavoriteComboStar from "../../components/Buttons/FavoriteComboStar.jsx";
import BackButton from "../../components/Buttons/BackButton.jsx";

const ComboDetails = () => {
  const { comboId } = useParams();
  const { currentUser, updateViewedProfile  } = useAuth();

  const [combo, setCombo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  // ------------------- Cargar combo -------------------
  useEffect(() => {
    if (!comboId) return;

    const fetchCombo = async () => {
      setLoading(true);
      try {
       const res = await getComboByIdService(comboId);
          if (res?.success && res?.combo) {
            setCombo(res.combo);
          } else {
            setCombo(null);
          }
      } catch (error) {
        console.error("Error cargando combo:", error);
        setCombo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCombo();
  }, [comboId]);

  if (loading) return <p className="text-white text-center mt-10">Cargando...</p>;
  if (!combo) return <p className="text-white text-center mt-10">Combo no encontrado</p>;

  const isOwner = String(currentUser?._id) === String(combo.owner);

   const confirmDelete = async () => {
    if (!combo) return;

    setDeleting(true);
    try {
      const res = await deleteComboService(combo._id);
      if (!res.success) throw new Error(res.message || "Error eliminando el combo");

      toast.success("Combo eliminado correctamente 🎉");

      setShowDeleteModal(false);
      setDeleting(false);
      updateViewedProfile(res.user); 
      // Redirigir al listado de combos del usuario
      navigate(`/profile/${currentUser.username}/combos`);
    } catch (error) {
      toast.error(error.message || "Error eliminando el combo");
      setDeleting(false);
    }
  };


  return (
  <div className="max-w-4xl mx-auto text-white min-h-screen p-2">
    <BackButton />
    <div className="flex justify-between items-center my-2">
      <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold">{combo.name}</h1>

          {isOwner && (
            <FavoriteComboStar comboId={combo._id} type={combo.type} />
          )}
        </div>
      {isOwner && (
        <EditAndDeleteButton
          editLink={`/profile/${currentUser.username}/combos/${combo._id}/edit`}
          onDeleteClick={() => setShowDeleteModal(true)}
          className="px-2 rounded"
        />
      )}
    </div>

    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-3">
      <p><strong>Tipo:</strong> {combo.type}</p>
      <p><strong>Energía total:</strong> {combo.totalEnergyCost}</p>
      <p className="text-xs mt-4">
        Creado: {new Date(combo.createdAt).toLocaleDateString()}
      </p>
    </div>

    {/* ---------------------- VIDEO PRINCIPAL DEL COMBO ---------------------- */}
    {combo.video && (
      <div className="relative w-full mb-6 aspect-[9/16] max-h-[80vh] bg-black rounded-lg overflow-hidden mt-2">
                    <video
                      src={combo.video.url}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
    )}

    <h2 className="text-2xl font-bold mb-2">Skills del Combo</h2>

    <div className="space-y-4">
      {combo.elements.map((el, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20"
        >
          {/* Nombre skill y variante */}
          <h3 className="font-bold mb-2">
            {el.skillName} – {el.variantName}
          </h3>

          {/* Video de la variante */}
          {el.video && (
            <div className="relative w-full aspect-[9/16] max-h-[80vh] bg-black rounded-lg overflow-hidden mt-2">
                    <video
                      src={el.video.url}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
          )}  
          <div className="flex justify-between"> 
            <div className="text-sm mb-2">
            {el.hold > 0 && <p>⏱ Hold: {el.hold} s</p>}
            {el.reps > 0 && <p>🔁 Reps: {el.reps}</p>}
            <p>🤘 Fingers: {el.fingers}</p>
          </div>

          {/* Static & Dynamic */}
          <div className="text-sm mb-2">
            <p>🌀 Static AU: {el.staticAu}</p>
            <p>🔥 Dynamic AU: {el.dynamicAu}</p>
          </div>
        </div>         
          </div>        
         
      ))}
    </div>

    <DeleteComboModal
      isOpen={showDeleteModal}
      onCancel={() => setShowDeleteModal(false)}
      onConfirm={confirmDelete}
      comboName={combo?.name}
      loading={deleting}
    />
  </div>
);
};

export default ComboDetails;
