import { useParams, useNavigate } from "react-router-dom";
import { GoReport } from "react-icons/go";
import { users } from "../../helpers/users";
import { skills } from "../../helpers/skills";
import BackButton from "../../components/Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";
import EditAndDeleteButton from "../../components/Buttons/EditAndDeleteButton";
import ConfirmDeleteModal from "../../components/Modals/ConfirmDeleteModal";
import ReportSkillUserModal from "../../components/Modals/ReportSkillUserModal";
import { useState } from "react";

const SkillDetail = () => {
  const { username, skillId, variantId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const user = users.find((u) => u.username === username);
  if (!user) return <p className="text-white p-5">Usuario no encontrado</p>;

  const userSkill = user.skills.find(
    (s) => s.skillId === skillId && s.variantId === variantId
  );
  if (!userSkill)
    return <p className="text-white p-5">Skill no encontrada en el usuario</p>;

  const skillData = skills.find((s) => s.skillId === skillId);
  if (!skillData)
    return <p className="text-white p-5">Skill no existe en la base global</p>;

  const variantData = skillData.variants.find((v) => v.variantId === variantId);
  if (!variantData)
    return <p className="text-white p-5">Variante no encontrada</p>;

  const isOwner = currentUser?.username === username;

  // 🔥 Eliminar skill
  const handleConfirmDelete = () => {
    user.skills = user.skills.filter((s) => s.variantId !== variantId);
    setShowDeleteModal(false);
    alert("Skill eliminada");
    navigate(-1);
  };

  // 🔥 Enviar reporte
  const handleSendReport = (reason) => {
    alert(`Reporte enviado: ${reason}`);
    setShowReportModal(false);
  };

  return (
    <div className="p-2 text-white max-w-3xl mx-auto">

      {/* === HEADER === */}
      <div className="flex justify-between items-center mb-4">
        <BackButton />

        {/* OWNER = Edit + Delete */}
        {isOwner ? (
          <EditAndDeleteButton
            editLink={`/profile/${username}/edit-skill/${variantId}`}
            onDeleteClick={() => setShowDeleteModal(true)}
            className="px-2 py-1 text-sm rounded flex items-center justify-center"
          />

        ) : (
          /* NO OWNER = Botón de Reportar */
          <button
            onClick={() => setShowReportModal(true)}
            className="px-3 py-1 bg-stone-800 text-white rounded-lg text-sm hover:bg-stone-700 transition"
          >
            <GoReport />
          </button>
        )}
      </div>

      {/* === INFORMACIÓN === */}
      <h1 className="text-2xl font-bold mb-4">{variantData.variant}</h1>

      <p className="text-gray-400 mb-2">
        <span className="text-blue-400 font-semibold">Skill base:</span>{" "}
        {skillData.skillName}
      </p>

      <p className="mb-2"><span className="font-semibold">Tipo:</span> {variantData.type}</p>
      <p className="mb-2"><span className="font-semibold">Dificultad:</span> {variantData.difficulty}</p>
      <p className="mb-6"><span className="font-semibold">Static AU:</span> {variantData.staticAU}</p>
      <p className="mb-6"><span className="font-semibold">Dynamic AU:</span> {variantData.dynamicAU}</p>
      <p className="mb-6"><span className="font-semibold">Fingers Used:</span> {userSkill.fingersUsed}</p>

      {userSkill.videoUrl && (
        <video src={userSkill.videoUrl} controls className="w-full rounded-lg mb-6" />
      )}

      {/* === MODAL DELETE === */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          isOpen={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* === MODAL REPORT === */}
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
