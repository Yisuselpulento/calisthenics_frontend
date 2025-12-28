import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BackButton from "../../components/Buttons/BackButton";
import SubmitButton from "../../components/Buttons/SubmitButton";
import VideoPlayer from "../../components/VideoPlayer";
import EnergyBar from "../../components/EnergyBar";

import { useAuth } from "../../context/AuthContext";
import { createComboService } from "../../Services/comboFetching.js";
import { getUserVariants } from "../../helpers/getUserVariants";

const MAX_VIDEO_SIZE_MB = 100;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

const AddCombo = () => {
  const navigate = useNavigate();
  const { viewedProfile, updateViewedProfile } = useAuth();

  /* ---------------------------- STATE ---------------------------- */
  const [comboName, setComboName] = useState("");
  const [type, setType] = useState("static");
  const [elements, setElements] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const maxVariants = 10;
  const minVariants = 3;

  /* ---------------------------- DATA ----------------------------- */
  const userVariants = useMemo(
    () => getUserVariants(viewedProfile?.skills),
    [viewedProfile]
  );

  const filteredVariants = useMemo(() => {
    if (!userVariants) return [];
    if (type === "dynamic" || type === "mixed") return userVariants;
    return userVariants.filter(
      (v) => v.type === "static" || v.type === "basic"
    );
  }, [userVariants, type]);

  const userEnergy = useMemo(() => {
    if (!viewedProfile?.stats) return 0;
    if (type === "static") return viewedProfile.stats.staticAura ?? 0;
    if (type === "dynamic") return viewedProfile.stats.dynamicAura ?? 0;
    return Math.min(
      viewedProfile.stats.staticAura ?? 0,
      viewedProfile.stats.dynamicAura ?? 0
    );
  }, [type, viewedProfile]);

  /* ------------------------ VIDEO PREVIEW ------------------------ */
  const videoPreview = useMemo(() => {
    if (!videoFile) return null;
    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  /* -------------------------- HANDLERS --------------------------- */
  const handleToggleSkill = (userSkillVariantId) => {
    setElements((prev) => {
      const exists = prev.some(
        (el) => el.userSkillVariantId === userSkillVariantId
      );

      if (exists) {
        return prev.filter(
          (el) => el.userSkillVariantId !== userSkillVariantId
        );
      }

      if (prev.length >= maxVariants) {
        toast.error(`Máximo ${maxVariants} variantes`);
        return prev;
      }

      return [...prev, { userSkillVariantId, hold: 0, reps: 0 }];
    });
  };

  const handleSetHoldOrReps = (index, value) => {
    const numberValue = Number(value) || 0;

    setElements((prev) => {
      const updated = [...prev];
      const variant = userVariants.find(
        (v) => v.userSkillVariantId === updated[index].userSkillVariantId
      );
      if (!variant) return updated;

      const usesHold =
        variant.stats.energyPerSecond > variant.stats.energyPerRep;

      updated[index] = {
        ...updated[index],
        hold: usesHold ? numberValue : 0,
        reps: usesHold ? 0 : numberValue,
      };

      return updated;
    });
  };

  /* -------------------------- SUBMIT ----------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comboName.trim()) return toast.error("El combo necesita nombre");
    if (elements.length < minVariants)
      return toast.error(`Agrega mínimo ${minVariants} variantes`);
    if (!videoFile) return toast.error("Sube un video del combo");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", comboName);
      formData.append("type", type);
      formData.append("elements", JSON.stringify(elements));
      formData.append("video", videoFile);

      const res = await createComboService(formData);
      if (!res.success) throw new Error(res.message);

      toast.success("Combo creado 🎉");
      updateViewedProfile(res.user);
      navigate(`/profile/${viewedProfile.username}`);
    } catch (error) {
      toast.error(error.message || "Error creando el combo");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // ❌ tamaño
  if (file.size > MAX_VIDEO_SIZE_BYTES) {
    toast.error("El video no puede superar los 100 MB");
    e.target.value = "";
    return;
  }

  // ❌ tipo (extra seguridad)
  if (!file.type.startsWith("video/")) {
    toast.error("El archivo debe ser un video");
    e.target.value = "";
    return;
  }

  setVideoFile(file);
};

  /* --------------------------- UI ------------------------------- */
  return (
    <div className="text-white min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Crear nuevo Combo</h2>
        <BackButton />
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-black/20 p-5 rounded-md border border-white/20 flex flex-col gap-4"
      >
        {/* Nombre */}
        <div>
          <label className="block text-sm">Nombre</label>
          <input
            value={comboName}
            onChange={(e) => setComboName(e.target.value)}
            className="w-full bg-black/40 rounded-md border border-white/20 p-2 text-sm"
            placeholder="Ej: Static Flow LVL 4"
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-black/40 rounded-md border border-white/20 p-2 text-sm"
          >
            <option value="static">Static</option>
            <option value="dynamic">Dynamic</option>
          </select>
        </div>

        {/* Energy */}
        <EnergyBar
          elements={elements}
          userVariants={userVariants}
          userEnergy={userEnergy}
        />

        {/* Variantes */}
        <div className="grid grid-cols-2 gap-2">
          {filteredVariants.map((variant) => {
            const isSelected = elements.some(
              (el) => el.userSkillVariantId === variant.userSkillVariantId
            );

            return (
              <button
                key={variant.userSkillVariantId}
                type="button"
                onClick={() =>
                  handleToggleSkill(variant.userSkillVariantId)
                }
                className={`p-2 rounded-md text-xs border ${
                  isSelected
                    ? "bg-blue-600 border-blue-400"
                    : "bg-black/40 border-white/20 hover:border-blue-300"
                }`}
              >
                {variant.name}
              </button>
            );
          })}
        </div>

        {/* Inputs dinámicos */}
        {elements.map((el, index) => {
          const variant = userVariants.find(
            (v) => v.userSkillVariantId === el.userSkillVariantId
          );
          const usesHold =
            variant.stats.energyPerSecond > variant.stats.energyPerRep;

          return (
            <div
              key={index}
              className="flex gap-2 items-center text-xs bg-black/40 p-2 rounded-md"
            >
              <span>{variant.name}</span>
              <input
                type="number"
                min="1"
                placeholder={usesHold ? "Seg" : "Reps"}
                onChange={(e) =>
                  handleSetHoldOrReps(index, e.target.value)
                }
                className="w-16 bg-black/40 p-1 rounded-md"
              />
            </div>
          );
        })}

        {/* Video */}
        <div>
          <label className="block text-sm mb-1">Video del combo</label>

          <input
            id="comboVideo"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoChange}
          />

          <label
            htmlFor="comboVideo"
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-md text-sm cursor-pointer inline-block"
          >
            Seleccionar video
          </label>

          {videoPreview && (
            <VideoPlayer
              src={videoPreview}
            />
          )}
        </div>

        <SubmitButton
          loading={loading}
          text="Crear Combo"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddCombo;
