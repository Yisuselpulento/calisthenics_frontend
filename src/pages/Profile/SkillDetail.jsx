import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GoReport } from "react-icons/go";
import EditAndDeleteButton from "../../components/Buttons/EditAndDeleteButton";
import DeleteSkillVariantModal from "../../components/Modals/DeleteSkillVariantModal";
import { useAuth } from "../../context/AuthContext";
import FavoriteToggleButton from "../../components/Buttons/FavoriteToggleButton";
import toast from "react-hot-toast";
import { getUserSkillVariantService, deleteSkillVariantService } from "../../Services/skillFetching.js"; 
import Spinner from "../../components/Spinner/Spinner.jsx";
import { createReportService } from "../../Services/reportsFetching.js";
import {skillReportReasons}  from "../../helpers/reportsOptions.js";
import ReportModal from "../../components/Modals/ReportModal.jsx";

const SkillDetail = () => {
  const { userSkillVariantId, username } = useParams();
  const {  updateViewedProfile , currentUser} = useAuth();
  const navigate = useNavigate();

  const [variant, setVariant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  const isOwner = currentUser?.username === username; 

  // Cargar la variante específica
  useEffect(() => {
    const fetchVariant = async () => {
      setLoading(true);
      const res = await getUserSkillVariantService(userSkillVariantId);
      if (res.success) {
        console.log(res)
        setVariant(res.variant); 
      } else {
        toast.error(res.message || "No se pudo cargar la skill");
        setVariant(null);
      }
      setLoading(false);
    };

    if (userSkillVariantId) fetchVariant();
  }, [userSkillVariantId]);

  if (loading) return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="2em" />
      </div>
    );
  
  if (!variant) return <p className="text-white p-5">Skill no encontrada</p>;

  const handleConfirmDelete = async () => {
  setLoading(true);

  try {
    const res = await deleteSkillVariantService(userSkillVariantId);
    if (!res.success) {
      toast.error(res.message || "No se pudo eliminar la variante.");
      setLoading(false);
      return;
    }
    toast.success("Skill eliminada correctamente!");
    setShowDeleteModal(false);
    updateViewedProfile(res.user);
    navigate(-1);

  } catch (err) {
    toast.error("Error eliminando la variante.");
  }

  setLoading(false);
};

  const handleReport = async (reason) => {
    try {
      setLoadingReport(true);

      await createReportService({
        targetType: "UserSkill",
        target: variant.userSkillId,
        variantInfo: {
          variantKey: variant.variantKey,
          fingers: variant.fingers,
        },
        reason,
        description: "",
      });

      toast.success("Reporte enviado correctamente");
      setShowReportModal(false);
    } catch (err) {
      console.error("Error creando reporte:", err);
      toast.error(err.message || "Error al enviar el reporte");
    } finally {
      setLoadingReport(false);
    }
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
            editLink={`/profile/${username}/edit-skill/${variant.userSkillVariantId}`}
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
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-2xl font-bold">{variant.name}</h1>
        {isOwner && (
          <FavoriteToggleButton 
            userSkillVariantId={variant.userSkillVariantId}
          />
        )}
      </div>
          <span
                className={` text-xs px-2 py-1 rounded-full ${
                  variant.type === "static"
                    ? "bg-blue-500/50 text-blue-300"
                    : variant.type === "dynamic"
                    ? "bg-green-500/50 text-green-300"
                    : "bg-yellow-500/50 text-yellow-300"
                }`}
              >
                {variant.type || "unknown"}
        </span>

      <p className="text-gray-400">
        <span className="text-blue-400 font-semibold ">Skill base:</span> {variant.skillName}
      </p>
  
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
      {variant.usedInCombos?.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-1">Agregado a:</p>
          <ul className="space-y-1">
            {variant.usedInCombos.map((c) => (
              <li key={c.comboId}>
                <Link
                  to={`../combos/${c.comboId}`}
                  className="text-blue-400 hover:underline text-sm"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
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
};

export default SkillDetail;
