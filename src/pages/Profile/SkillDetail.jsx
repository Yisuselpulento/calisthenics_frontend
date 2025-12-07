import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GoReport } from "react-icons/go";
import BackButton from "../../components/Buttons/BackButton";
import EditAndDeleteButton from "../../components/Buttons/EditAndDeleteButton";
import DeleteSkillVariantModal from "../../components/Modals/DeleteSkillVariantModal";
import ReportSkillUserModal from "../../components/Modals/ReportSkillUserModal";
import { useAuth } from "../../context/AuthContext";
import FavoriteToggleButton from "../../components/Buttons/FavoriteToggleButton";
import toast from "react-hot-toast";
import { getUserSkillVariantService } from "../../Services/skillFetching.js"; 
import Spinner from "../../components/Spinner/Spinner.jsx";

const SkillDetail = () => {
  const { username, userSkillId, variantKey, fingers } = useParams();
  const { currentUser, removeVariant } = useAuth();
  const navigate = useNavigate();

  const [variant, setVariant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Determinar si el usuario actual es el dueño
  const isOwner = currentUser?.username === username;

  // Cargar la variante específica
  useEffect(() => {
    const fetchVariant = async () => {
      setLoading(true);
      const res = await getUserSkillVariantService(userSkillId, variantKey, fingers);
      if (res.success) {
        setVariant(res.variant); // viene solo la variante con todos los datos
      } else {
        toast.error(res.message || "No se pudo cargar la skill");
        setVariant(null);
      }
      setLoading(false);
    };

    if (userSkillId && variantKey && fingers) fetchVariant();
  }, [userSkillId, variantKey, fingers]);

  if (loading) return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="2em" />
      </div>
    );
  
  if (!variant) return <p className="text-white p-5">Skill no encontrada</p>;

  const handleConfirmDelete = async () => {
    setLoading(true);
    const res = await removeVariant(variant.userSkillId, variant.variantKey, variant.fingers);
    if (res.success) {
      toast.success("Skill eliminada correctamente!");
      setShowDeleteModal(false);
      navigate(-1);
    }
    setLoading(false);
  };

  const handleSendReport = (reason) => {
    toast.success(`Reporte enviado: ${reason}`);
    setShowReportModal(false);
  };

  return (
    <div className="p-2 text-white max-w-3xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
          <Link
            to={`/profile/${username}/skills/all-skills`}
            className="text-sm text-blue-500 hover:underline cursor-pointer"
          >
            ← Volver
          </Link>
        {isOwner ? (
          <EditAndDeleteButton
            editLink={`/profile/${username}/edit-skill/${variant.userSkillId}/${variant.variantKey}/${variant.fingers}`}
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

      {/* DETALLES DE LA VARIANTE */}
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">{variant.name}</h1>
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
      {variant.type && <p className="mb-2"><span className="font-semibold">Tipo:</span> {variant.type}</p>}
      <p className="mb-2"><span className="font-semibold">Fingers Used:</span> {variant.fingers}</p>
      {variant.staticAU !== undefined && <p className="mb-2"><span className="font-semibold">Static AU:</span> {variant.staticAU}</p>}
      {variant.dynamicAU !== undefined && <p className="mb-2"><span className="font-semibold">Dynamic AU:</span> {variant.dynamicAU}</p>}

      {variant.stats && (
        <div className="text-gray-300 text-xs mb-4">
          {variant.stats.pointsPerSecond !== undefined && <p>Points/sec: {variant.stats.pointsPerSecond}</p>}
          {variant.stats.energyPerSecond !== undefined && <p>Energy/sec: {variant.stats.energyPerSecond}</p>}
          {variant.stats.pointsPerRep !== undefined && <p>Points/rep: {variant.stats.pointsPerRep}</p>}
          {variant.stats.energyPerRep !== undefined && <p>Energy/rep: {variant.stats.energyPerRep}</p>}
        </div>
      )}

      {variant.video && (
        <video src={variant.video} controls className="w-full rounded-lg mb-6" />
      )}

      {/* MODALS */}
      {isOwner && (
        <DeleteSkillVariantModal
          isOpen={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          loading={loading}
          skillName={variant.name}
        />
      )}

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
