import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoReport } from "react-icons/go";
import BackButton from "../../components/Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";
import EditAndDeleteButton from "../../components/Buttons/EditAndDeleteButton";
import ConfirmDeleteModal from "../../components/Modals/ConfirmDeleteModal";
import ReportSkillUserModal from "../../components/Modals/ReportSkillUserModal";

const SkillDetail = () => {
  const { username, variantId } = useParams(); // ⚡ variantId = variantKey
  const { currentUser, viewedProfile, profileLoading, loadProfile } = useAuth();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Cargar perfil del usuario
  useEffect(() => {
    loadProfile(username);
  }, [username]);

  if (profileLoading) return <p className="text-white p-5">Cargando...</p>;
  if (!viewedProfile) return <p className="text-white p-5">Usuario no encontrado</p>;

  const user = viewedProfile;
  const isOwner = currentUser?.username === user.username;

  // Transformar skills en variantes enriquecidas
  const userVariants = user.skills?.flatMap((userSkill) =>
    userSkill.variants.map((variant) => ({
      variantKey: variant.variantKey,
      fingers: variant.fingers,
      video: variant.video,
      name: variant.name,
      type: variant.type,
      stats: variant.stats,
      staticAU: variant.staticAU,
      dynamicAU: variant.dynamicAU,
      skillName: userSkill.skill.name,
      skillId: userSkill.skill._id,
    }))
  ) || [];

  // Buscar la variante según variantId (variantKey)
  const variant = userVariants.find((v) => v.variantKey === variantId);
  if (!variant) return <p className="text-white p-5">Skill no encontrada</p>;

  // Eliminar skill
  const handleConfirmDelete = () => {
    user.skills.forEach((s) => {
      s.variants = s.variants.filter((v) => v.variantKey !== variantId);
    });
    setShowDeleteModal(false);
    alert("Skill eliminada");
    navigate(-1);
  };

  // Reportar skill
  const handleSendReport = (reason) => {
    alert(`Reporte enviado: ${reason}`);
    setShowReportModal(false);
  };

  return (
    <div className="p-2 text-white max-w-3xl mx-auto">
      {/* === HEADER === */}
      <div className="flex justify-between items-center mb-4">
        <BackButton />

        {isOwner ? (
          <EditAndDeleteButton
            editLink={`/profile/${username}/edit-skill/${variant.variantKey}`}
            onDeleteClick={() => setShowDeleteModal(true)}
            className="px-2 py-1 text-sm rounded flex items-center justify-center"
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
      <h1 className="text-2xl font-bold mb-4">{variant.name}</h1>
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
      {showDeleteModal && (
        <ConfirmDeleteModal
          isOpen={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
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
