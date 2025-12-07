import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";
import { getUserSkillVariantService, editSkillVariantService } from "../../Services/skillFetching";
import toast from "react-hot-toast";
import SubmitButton from "../../components/Buttons/SubmitButton";
import Spinner from "../../components/Spinner/Spinner";

const EditSkill = () => {
  const { username, userSkillId, variantKey, fingers } = useParams();
  const navigate = useNavigate();
  const { updateCurrentUser } = useAuth();

  const [variant, setVariant] = useState(null);
  const [newFingers, setNewFingers] = useState(5);
  const [videoFile, setVideoFile] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  // Loading separados
  const [loadingVariant, setLoadingVariant] = useState(false); // para cargar variante
  const [submitting, setSubmitting] = useState(false); // para submit

  // Cargar la variante específica
  useEffect(() => {
    const fetchVariant = async () => {
      setLoadingVariant(true);
      const res = await getUserSkillVariantService(userSkillId, variantKey, fingers);
      if (res.success) {
        setVariant(res.variant);
        setNewFingers(res.variant.fingers);
      } else {
        toast.error(res.message || "No se pudo cargar la variante");
      }
      setLoadingVariant(false);
    };

    if (userSkillId && variantKey && fingers) fetchVariant();
  }, [userSkillId, variantKey, fingers]);

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

  if (loadingVariant) return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size="2em" />
    </div>
  );

  if (!variant) return <p className="text-white p-5">Variante no encontrada</p>;

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
      variant.userSkillId,
      variant.variantKey,
      variant.fingers,
      formData
    );
    setSubmitting(false);

    if (res.success) {
      toast.success(res.message || "Variante actualizada correctamente");
      updateCurrentUser(res.user);
      navigate(
        `/profile/${username}/skill/${variant.userSkillId}/${variant.variantKey}/${newFingers}`
      );
    } else {
      toast.error(res.message || "Error al actualizar la variante");
    }
  };

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
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={5}>5</option>
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

          {previewVideo ? (
            <video src={previewVideo} controls className="w-full mt-2 rounded-lg" />
          ) : (
            variant.video && (
              <video src={variant.video} controls className="w-full mt-2 rounded-lg" />
            )
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
