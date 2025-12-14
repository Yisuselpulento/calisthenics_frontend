import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";
import { getUserSkillVariantService, editSkillVariantService } from "../../Services/skillFetching";
import toast from "react-hot-toast";
import SubmitButton from "../../components/Buttons/SubmitButton";
import Spinner from "../../components/Spinner/Spinner";

const EditSkill = () => {
  const { username, userSkillVariantId } = useParams();
  const navigate = useNavigate();
  const { updateViewedProfile, viewedProfile } = useAuth();

  const [variant, setVariant] = useState(null);
  const [newFingers, setNewFingers] = useState(5);
  const [videoFile, setVideoFile] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const [loadingVariant, setLoadingVariant] = useState(false);
  const [submitting, setSubmitting] = useState(false); 

  // Cargar la variante específica
  useEffect(() => {
    const fetchVariant = async () => {
      setLoadingVariant(true);
      const res = await getUserSkillVariantService(userSkillVariantId);
      if (res.success) {
        setVariant(res.variant);
        setNewFingers(res.variant.fingers);
      } else {
        toast.error(res.message || "No se pudo cargar la variante");
      }
      setLoadingVariant(false);
    };

    if (userSkillVariantId) fetchVariant();
  }, [userSkillVariantId]);

  // Previsualización de video
  useEffect(() => {
    if (!videoFile) {
      setPreviewVideo(null);
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setPreviewVideo(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newFingers !== variant.fingers && !videoFile) {
      toast.error("Al cambiar los dedos, debes subir un video nuevo");
      return;
    }

    const formData = new FormData();
    if (newFingers !== variant.fingers) formData.append("newFingers", newFingers);
    if (videoFile) formData.append("video", videoFile);

    setSubmitting(true);
    const res = await editSkillVariantService(
      variant.userSkillVariantId ,
      formData
    );
    setSubmitting(false);

    if (res.success) {
      toast.success(res.message || "Variante actualizada correctamente");
      updateViewedProfile(res.user);
      navigate(
        `/profile/${username}/skill/${variant.userSkillVariantId}`
      );
    } else {
      toast.error(res.message || "Error al actualizar la variante");
    }
  };

  if (loadingVariant) return (
  <div className="flex justify-center items-center min-h-screen">
    <Spinner size="2em" />
  </div>
);

if (!variant && !loadingVariant) return (
  <p className="text-white p-5">Variante no encontrada</p>
);



  return (
    <div className="p-2 max-w-xl mx-auto text-white min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Editar variante</h1>
        <BackButton />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-5 border border-white/20 rounded-xl space-y-4"
      >
        {/* Fingers */}
        <div>
          <label className="block mb-1">Fingers</label>
          <select
            value={newFingers}
            onChange={(e) => setNewFingers(Number(e.target.value))}
            className="w-full p-2 rounded bg-white/20 text-white"
          >
            <option className="bg-stone-800" value={1}>1</option>
            <option className="bg-stone-800" value={2}>2</option>
            <option className="bg-stone-800" value={5}>5</option>
          </select>
        </div>

        {/* Video Upload */}
         <div>
            <label className="block text-sm mb-1">Subir video</label>

            <input
              id="videoUpload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
            <label
              htmlFor="videoUpload"
              className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded-md cursor-pointer inline-block transition"
            >
              Seleccionar video
            </label>

            {/* Video Preview */}
            {(previewVideo || variant?.video?.url) && (
              <div className="relative w-full aspect-[9/16] max-h-[80vh] bg-black rounded-lg overflow-hidden mt-2">
                <video
                  src={previewVideo || variant.video.url}
                  controls
                  autoPlay={!!previewVideo} // solo autoPlay si es previsualización
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            )}
          </div>

        <SubmitButton
          type="submit"
          loading={submitting}
          text="Guardar cambios"
          className="w-full"
        />
      </form>
    </div>
  );
};

export default EditSkill;
