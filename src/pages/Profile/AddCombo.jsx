import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BackButton from "../../components/Buttons/BackButton";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { useAuth } from "../../context/AuthContext";
import { createComboService } from "../../Services/comboFetching.js";
import { getUserVariants } from "../../helpers/getUserVariants";
import EnergyBar from "../../components/EnergyBar";

const AddCombo = () => {
  const navigate = useNavigate();
  const { viewedProfile, updateViewedProfile  } = useAuth();

  const [comboName, setComboName] = useState("");
  const [type, setType] = useState("static");
  const [elements, setElements] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);

  const maxVariants = 10;
  const minVariants = 3;

  const userVariants = useMemo(() => getUserVariants(viewedProfile?.skills), [viewedProfile]);

  const filteredVariants = useMemo(() => {
    if (!userVariants) return [];
    if (type === "dynamic" || type === "mixed") return userVariants;
    return userVariants.filter(v => v.type === "static" || v.type === "basic");
  }, [userVariants, type]);

  const userEnergy = useMemo(() => {
    if (!viewedProfile?.stats) return 0;
    if (type === "static") return viewedProfile.stats.staticAura ?? 0;
    if (type === "dynamic") return viewedProfile.stats.dynamicAura ?? 0;
    return Math.min(viewedProfile.stats.staticAura ?? 0, viewedProfile.stats.dynamicAura ?? 0);
  }, [type, viewedProfile]);

  const handleToggleSkill = (userSkillVariantId) => {
    setElements(prev => {
      const exists = prev.some(el => el.userSkillVariantId === userSkillVariantId);
      if (exists) return prev.filter(el => el.userSkillVariantId !== userSkillVariantId);
      if (prev.length >= maxVariants) {
        toast.error(`Máximo ${maxVariants} variantes`);
        return prev;
      }
      return [...prev, { userSkillVariantId, hold: 0, reps: 0 }];
    });
  };

  const handleSetHoldOrReps = (index, value) => {
    const numberValue = Number(value) || 0;
    setElements(prev => {
      const updated = [...prev];
      const variant = userVariants.find(
        v => v.userSkillVariantId === updated[index].userSkillVariantId
      );
      if (!variant) return updated;
      const usesHold = variant.stats.energyPerSecond > variant.stats.energyPerRep;

      updated[index] = {
        ...updated[index],
        hold: usesHold ? numberValue : 0,
        reps: usesHold ? 0 : numberValue,
      };
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comboName.trim()) return toast.error("El combo necesita nombre");
    if (elements.length < minVariants) return toast.error(`Agrega mínimo ${minVariants} variantes`);
    if (!videoFile) return toast.error("Sube un video del combo");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", comboName);
      formData.append("type", type);
      formData.append("elements", JSON.stringify(elements));
      formData.append("video", videoFile);

      const data = await createComboService(formData);
      if (!data.success) throw new Error(data.message);

      toast.success("Combo creado 🎉");
      navigate(`/profile/${viewedProfile.username}`);
      updateViewedProfile(data.user);
    } catch (error) {
      toast.error(error.message || "Error creando el combo");
    } finally {
      setLoading(false);
    }
  };

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
            type="text"
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

        {/* EnergyBar */}
        <EnergyBar elements={elements} userVariants={userVariants} userEnergy={userEnergy} />

        {/* Variantes */}
        <div>
          <label className="block text-sm mb-1">Variantes ({elements.length}/{maxVariants})</label>
          <div className="grid grid-cols-2 gap-2">
            {filteredVariants.map(variant => {
              const isSelected = elements.some(el => el.userSkillVariantId === variant.userSkillVariantId);
              const cost = variant.stats.energyPerSecond || variant.stats.energyPerRep;
              const disabled = cost > (userEnergy - (elements.reduce((sum, el) => {
                const v = userVariants.find(uv => uv.userSkillVariantId === el.userSkillVariantId);
                return sum + ((v?.stats.energyPerSecond || 0) * (el.hold || 0)) + ((v?.stats.energyPerRep || 0) * (el.reps || 0));
              }, 0))) && !isSelected;

              return (
                <button
                  key={variant.userSkillVariantId}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleToggleSkill(variant.userSkillVariantId)}
                  className={`p-2 rounded-md text-left text-xs border transition ${
                    disabled
                      ? "bg-gray-500 border-gray-500 opacity-60 cursor-not-allowed"
                      : isSelected
                      ? "bg-blue-600 border-blue-400"
                      : "bg-black/40 border-white/20 hover:border-blue-300"
                  }`}
                >
                  {variant.name}
                  <p className="text-[10px]">
                    {variant.stats.energyPerSecond
                      ? `${variant.stats.energyPerSecond} EN/s`
                      : `${variant.stats.energyPerRep} EN/r`}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Inputs dinámicos */}
        {elements.map((el, index) => {
          const variant = userVariants.find(v => v.userSkillVariantId === el.userSkillVariantId);
          const usesHold = variant.stats.energyPerSecond > variant.stats.energyPerRep;

          return (
            <div key={index} className="flex items-center gap-2 text-xs bg-black/40 p-2 rounded-md border border-white/10">
              <p className="text-[11px]">{variant.name}</p>

              <input
                type="number"
                min="1"
                placeholder={usesHold ? "Segundos" : "Reps"}
                onChange={(e) => handleSetHoldOrReps(index, e.target.value)}
                className="w-16 bg-black/40 p-1 rounded-md text-[11px] border border-white/20"
              />

              <span>
                {usesHold
                  ? (el.hold * variant.stats.energyPerSecond || 0)
                  : (el.reps * variant.stats.energyPerRep || 0)
                } EN
              </span>
            </div>
          );
        })}

        {/* Video */}
        <div>
          <label className="block text-sm mb-1">Video del Combo</label>
          <input
            id="comboVideo"
            type="file"
            accept="video/mp4,video/webm"
            onChange={(e) => {
              const file = e.target.files[0];
              setVideoFile(file);
              if (file) setVideoPreview(URL.createObjectURL(file));
            }}
            className="hidden"
          />
          <label
            htmlFor="comboVideo"
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-md text-sm cursor-pointer inline-block transition"
          >
            Seleccionar video
          </label>
          {videoPreview && (
            <video
              src={videoPreview}
              controls
              className="w-full rounded-md mt-2 max-h-64 object-cover"
            />
          )}
        </div>

        <SubmitButton
          loading={loading}
          text="Crear Combo"
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default AddCombo;
