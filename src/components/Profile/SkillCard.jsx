import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { GoReport } from "react-icons/go";
import { toast } from "react-hot-toast";
import { createReportService } from "../../Services/reportsFetching";
import { skillReportReasons } from "../../helpers/reportsOptions.js";
import ReportModal from "../Modals/ReportModal.jsx";
import { Link } from "react-router-dom";
import VideoPlayer from "../VideoPlayer.jsx";

const SkillCard = ({ skill, view = "card", ownerUsername }) => {
  const { currentUser } = useAuth();
  const [showReportModal, setShowReportModal] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  const isOwner = currentUser?.username === ownerUsername;
  if (!skill) return null;


  const {
    skillName,
    variantKey,
    name,
    fingers,
    video,
    type,
    staticAU,
    dynamicAU,
    userSkillVariantId,
  } = skill;

  const handleReport = async (reason) => {
    try {
      setLoadingReport(true);
      await createReportService({
        targetType: "UserSkill",
        target: userSkillVariantId,
        variantInfo: { variantKey, fingers },
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
      <Link
        to={`/profile/${ownerUsername}/skill/${userSkillVariantId}`}
        className="block"
      >
        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
          {!isOwner && (
            <button
              onClick={(e) => {
                e.preventDefault(); // evita navegación al abrir reporte
                setShowReportModal(true);
              }}
              className="absolute top-2 right-2 bg-stone-800 p-1 rounded-full hover:bg-stone-700"
            >
              <GoReport />
            </button>
          )}

          <h3 className="text-white mb-1 font-semibold">{name || variantKey}</h3>
          <p className="text-xs text-gray-400 mb-1">Skill: {skillName}</p>

          <p className="text-sm text-gray-300 mb-2">
            🔹 Static AU: <span className="text-blue-400">{staticAU ?? 0}</span> |
            🔸 Dynamic AU: <span className="text-green-400">{dynamicAU ?? 0}</span>
          </p>

          <p className="text-xs text-gray-400 mb-1">Fingers: {fingers}</p>

          <span
            className={`text-xs px-2 py-1 rounded-full ${
              type === "static"
                ? "bg-blue-500/50 text-blue-300"
                : type === "dynamic"
                ? "bg-green-500/50 text-green-300"
                : "bg-yellow-500/50 text-yellow-300"
            }`}
          >
            {type || "unknown"}
          </span>

          {video && (
            <VideoPlayer src={video.url} />
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
      </Link>
    );
  }

  // ===================================================
  //                VISTA DETAIL
  // ===================================================
  if (view === "detail") {
    return (
       <Link
            to={`/profile/${ownerUsername}/skill/${userSkillVariantId}`}
            className="block"
          >
            <div
              className={`relative bg-white/5 border border-white/10 rounded-2xl p-3 shadow-md hover:shadow-lg transition-all ${
                view === "detail" ? "flex flex-col gap-2" : ""
              }`}
            >
              {!isOwner && (
                <button
                  onClick={(e) => {
                    e.preventDefault(); // evita navegación al abrir reporte
                    setShowReportModal(true);
                  }}
                  className="absolute top-2 right-2 bg-stone-800 p-1 rounded-full hover:bg-stone-700"
                >
                  <GoReport />
                </button>
              )}

              <h3 className="text-white mb-1 font-semibold">{name || variantKey}</h3>
              <p className="text-xs text-gray-400 mb-1">Skill: {skillName}</p>

              <p className="text-sm text-gray-300 mb-2">
                🔹 Static AU: <span className="text-blue-400">{staticAU ?? 0}</span> |
                🔸 Dynamic AU: <span className="text-green-400">{dynamicAU ?? 0}</span>
              </p>

              <p className="text-xs text-gray-400 mb-1">Fingers: {fingers}</p>

              <span
                className={`text-xs px-2 py-1 w-[50px] rounded-full ${
                  type === "static"
                    ? "bg-blue-500/50 text-blue-300"
                    : type === "dynamic"
                    ? "bg-green-500/50 text-green-300"
                    : "bg-yellow-500/50 text-yellow-300"
                }`}
              >
                {type || "unknown"}
              </span>

              {video && (
                <VideoPlayer src={video.url} />
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
          </Link>
    );
  }

  return null;
};

export default SkillCard;
