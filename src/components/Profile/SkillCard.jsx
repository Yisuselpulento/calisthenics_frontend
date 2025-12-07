import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { GoReport } from "react-icons/go";
import { toast } from "react-hot-toast";
import { createReportService } from "../../Services/reportsFetching";
import {skillReportReasons}  from "../../helpers/reportsOptions.js";
import ReportModal from "../Modals/ReportModal.jsx";

const SkillCard = ({ skill, view = "card", ownerUsername }) => {
  const { currentUser } = useAuth();
  const [showReportModal, setShowReportModal] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  const isOwner = currentUser?.username === ownerUsername;
  if (!skill) return null;

  const { skillName, variantKey, name, fingers, video, type, staticAU, dynamicAU, userSkillId } = skill;

  const handleReport = async (reason) => {
  try {
    setLoadingReport(true);

    await createReportService({
  targetType: "UserSkill",
  target: userSkillId,      // ObjectId del UserSkill
  variantInfo: {            // info exacta de la variante
    variantKey: variantKey,
    fingers: fingers,
  },
  reason,
  description: "",
});

    toast.success("Reporte enviado correctamente");
  } catch (err) {
    console.error("Error creando reporte:", err);
    toast.error(err.message || "Error al enviar el reporte");
  } finally {
    setLoadingReport(false);
    setShowReportModal(false);
  }
};

  // ===================================================
  //                VISTA CARD
  // ===================================================
  if (view === "card") {
    return (
      <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
        {!isOwner && (
          <button
            onClick={() => setShowReportModal(true)}
            className="absolute top-2 right-2 bg-stone-800 p-1 rounded-full hover:bg-stone-700"
          >
            <GoReport />
          </button>
        )}

        <h3 className="text-white mb-1">{name || variantKey}</h3>
        <p className="text-xs text-gray-400 mb-1">Skill: {skillName}</p>

        <p className="text-sm text-gray-300 mb-2">
          🔹 Static AU: <span className="text-blue-400">{staticAU ?? 0}</span> | 🔸 Dynamic AU:{" "}
          <span className="text-green-400">{dynamicAU ?? 0}</span>
        </p>

        <p className="text-xs text-gray-400 mb-1">Fingers: {fingers}</p>
        <p className="text-xs text-gray-400 mb-1">Tipo: {type}</p>

        {video && (
          <video
            src={video}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="rounded-lg mt-2 w-full"
          />
        )}

        {showReportModal && (
          <ReportModal
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            onSend={handleReport}
            loading={loadingReport}
             reasons={skillReportReasons}
          />
        )}
      </div>
    );
  }

  if (view === "detail") {
    return (
      <div className="relative bg-gray-800 p-3 rounded-xl border border-gray-700">
        {!isOwner && (
          <button
            onClick={() => setShowReportModal(true)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-400"
          >
            <GoReport className="text-lg" />
          </button>
        )}
        <p className="font-bold">{name || variantKey}</p>
        <p className="text-sm text-gray-400">Fingers: {fingers}</p>

        {showReportModal && (
          <ReportModal
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            onSend={handleReport}
            loading={loadingReport}
             reasons={skillReportReasons}
          />
        )}
      </div>
    );
  }

  return null;
};

export default SkillCard;
