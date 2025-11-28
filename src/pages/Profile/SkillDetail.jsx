import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoReport } from "react-icons/go";
import BackButton from "../../components/Buttons/BackButton";
import EditAndDeleteButton from "../../components/Buttons/EditAndDeleteButton";
import DeleteSkillVariantModal from "../../components/Modals/DeleteSkillVariantModal";
import ReportSkillUserModal from "../../components/Modals/ReportSkillUserModal";
import { useAuth } from "../../context/AuthContext";
import { getUserVariants } from "../../helpers/getUserVariants";
import { deleteSkillVariantService } from "../../Services/skillFetching";
import toast from "react-hot-toast";
import FavoriteToggleButton from "../../components/Buttons/FavoriteToggleButton";

const SkillDetail = () => {
  const { username, variantId } = useParams(); // variantId = variantKey
  const { currentUser, viewedProfile, profileLoading, loadProfile, removeVariant } = useAuth();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar perfil del usuario
  useEffect(() => {
    loadProfile(username);
  }, [username]);

  if (profileLoading) return <p className="text-white p-5">Cargando...</p>;
  if (!viewedProfile) return <p className="text-white p-5">Usuario no encontrado</p>;

  const user = viewedProfile;
  const isOwner = currentUser?.username === user.username;

  const userVariants = getUserVariants(user.skills);
  const variant = userVariants.find((v) => v.variantKey === variantId);
  if (!variant) return <p className="text-white p-5">Skill no encontrada</p>;

  // 🔹 Delete
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteSkillVariantService(variant.userSkillId, variant.variantKey, variant.fingers);
      if (response.success) {
        // 🔹 Usar removeVariant del contexto
        removeVariant(variant.userSkillId, variant.variantKey, variant.fingers);
        toast.success("Skill eliminada correctamente!");
        setShowDeleteModal(false);
        navigate(-1); // Volver atrás
      } else {
        toast.error("Error al eliminar skill: " + response.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar skill");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Reportar skill
  const handleSendReport = (reason) => {
    toast.success(`Reporte enviado: ${reason}`);
    setShowReportModal(false);
  };

  return (
    <div className="p-2 text-white max-w-3xl mx-auto">
      {/* === HEADER === */}
      <div className="flex justify-between items-center mb-4">
        <BackButton />

        {isOwner ? (
          <EditAndDeleteButton
            editLink={`/profile/${username}/edit-skill/${variant.variantKey}/${variant.fingers}`}
            onDeleteClick={() => setShowDeleteModal(true)}
            className="px-2 py-1 text-sm rounded flex items-center justify-center"
            disabled={loading}
          />
        ) : (
          <button
            onClick={() => setShowReportModal(true)}
            className="px-3 py-1 bg-stone-800 text-white rounded-lg text-sm hover:bg-stone-700 transition"
          >
            <GoReport />
          </button>
        )}
      </div>

      {/* === DETALLES DE LA VARIANTE === */}
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">{variant.name}</h1>

        {/* ⭐ FAVORITO */}
        {isOwner && (
          <FavoriteToggleButton 
            userSkillId={variant.userSkillId}
            variantKey={variant.variantKey}
          />
        )}
      </div>
      <p className="text-gray-400 mb-2">
        <span className="text-blue-400 font-semibold">Skill base:</span> {variant.skillName}
      </p>
      <p className="mb-2"><span className="font-semibold">Tipo:</span> {variant.type}</p>
      <p className="mb-2"><span className="font-semibold">Fingers Used:</span> {variant.fingers}</p>
      <p className="mb-2"><span className="font-semibold">Static AU:</span> {variant.staticAU}</p>
      <p className="mb-2"><span className="font-semibold">Dynamic AU:</span> {variant.dynamicAU}</p>

      {variant.stats && (
        <div className="text-gray-300 text-xs mb-4">
          <p>Points/sec: {variant.stats.pointsPerSecond}</p>
          <p>Energy/sec: {variant.stats.energyPerSecond}</p>
          <p>Points/rep: {variant.stats.pointsPerRep}</p>
          <p>Energy/rep: {variant.stats.energyPerRep}</p>
        </div>
      )}

      {variant.video && (
        <video src={variant.video} controls className="w-full rounded-lg mb-6" />
      )}

      {/* === MODALS === */}
      <DeleteSkillVariantModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
        skillName={variant.name}
      />

      {showReportModal && (
        <ReportSkillUserModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          onSend={handleSendReport}
        />
      )}
    </div>
  );
};

export default SkillDetail;
