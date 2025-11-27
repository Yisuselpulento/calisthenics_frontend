import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ReportSkillUserModal from "../Modals/ReportSkillUserModal";
import { GoReport } from "react-icons/go";

const SkillCard = ({ skill, view = "card", ownerUsername }) => {
  const { currentUser } = useAuth();
  const [showReportModal, setShowReportModal] = useState(false);

  const isOwner = currentUser?.username === ownerUsername;

  if (!skill) return null;

  // ✅ Desestructurando según la estructura real
  const {
    skill: skillInfo,   // objeto padre
    variantKey,
    name,
    fingers,
    video,
    type,
    staticAu,
    dynamicAu,
  } = skill;

  const handleReport = (reason) => {
    console.log("Reporte enviado:", {
      reportedUser: ownerUsername,
      skill: variantKey,
      reason,
    });
    setShowReportModal(false);
  };

  // ===================================================
  //                🟦 VISTA CARD
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
        <p className="text-xs text-gray-400 mb-1">Skill: {skillInfo?.name}</p>
        <p className="text-sm text-gray-300 mb-2">
          🔹 Static AU: <span className="text-blue-400">{staticAu ?? 0}</span> | 🔸 Dynamic AU:{" "}
          <span className="text-green-400">{dynamicAu ?? 0}</span>
        </p>
        <p className="text-xs text-gray-400 mb-2">Fingers: {fingers}</p>
        <p className="text-xs text-gray-400 mb-2">Tipo: {type}</p>

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
  //              🟧 VISTA DETALLADA
  // ===================================================
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
        <p className="text-sm text-gray-400">Skill: {skillInfo?.name}</p>
        <p className="text-sm text-gray-400">Static AU: {staticAu ?? 0}</p>
        <p className="text-sm text-gray-400">Dynamic AU: {dynamicAu ?? 0}</p>
        <p className="text-sm text-gray-400">Fingers: {fingers}</p>
        <p className="text-sm text-gray-400">Tipo: {type}</p>

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
