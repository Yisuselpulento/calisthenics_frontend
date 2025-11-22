import { useState } from "react";
import { skills } from "../../helpers/skills";
import { useAuth } from "../../context/AuthContext";
import ReportSkillUserModal from "../Modals/ReportSkillUserModal";
import { GoReport } from "react-icons/go";

const SkillCard = ({ skill, view = "card", ownerUsername }) => {
  const { currentUser } = useAuth();
  const [showReportModal, setShowReportModal] = useState(false);

  const isOwner = currentUser?.username === ownerUsername;

  const baseSkill = skills.find((s) => s.skillId === skill.skillId);
  const variant = baseSkill?.variants?.find((v) => v.variantId === skill.variantId);

  if (!variant) return null;

  const staticAu = variant.staticAU ?? 0;
  const dynamicAu = variant.dynamicAU ?? 0;

  const handleReport = (reason) => {
    console.log("Reporte enviado:", {
      reportedUser: ownerUsername,
      skill: variant.variant,
      reason,
    });
    setShowReportModal(false);
  };

  // ===================================================
  //                🟦 VISTA CARD COMPLETA
  // ===================================================
  if (view === "card") {
    return (
      <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">

        {/* Botón reportar (solo si NO es el dueño) */}
        {!isOwner && (
          <button
            onClick={() => setShowReportModal(true)}
            className="absolute top-2 right-2 bg-stone-800 p-1 rounded-full hover:bg-stone-700"
          >
            <GoReport />
          </button>
        )}

        <h3 className="text-white mb-1">{variant.variant}</h3>

        <p className="text-sm text-gray-300 mb-2">
          🔹 Static AU: <span className="text-blue-400">{staticAu}</span> | 🔸 Dynamic AU:{" "}
          <span className="text-green-400">{dynamicAu}</span>
        </p>

        {skill.videoUrl && (
          <video
            src={skill.videoUrl}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="rounded-lg mt-2 w-full"
          />
        )}

        {showReportModal && (
          <ReportSkillUserModal
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            onSend={handleReport}
          />
        )}
      </div>
    );
  }

  // ===================================================
  //              🟧 VISTA DETALLADA SIMPLE
  // ===================================================
  if (view === "detail") {
    return (
      <div className="relative bg-gray-800 p-3 rounded-xl border border-gray-700">

        {/* Botón reportar (solo si NO es el dueño) */}
        {!isOwner && (
          <button
            onClick={() => setShowReportModal(true)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-400"
          >
            <FaFlag className="text-lg" />
          </button>
        )}

        <p className="font-bold">{variant.variant}</p>
        <p className="text-sm text-gray-400">Static AU: {staticAu}</p>
        <p className="text-sm text-gray-400">Dynamic AU: {dynamicAu}</p>

        {showReportModal && (
          <ReportSkillUserModal
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            onSend={handleReport}
          />
        )}
      </div>
    );
  }

  return null;
};

export default SkillCard;
