import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BackButton from "../../components/Buttons/BackButton";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { useAuth } from "../../context/AuthContext";
import { createComboService } from "../../Services/comboFetching.js";
import { getUserVariants } from "../../helpers/getUserVariants";

const AddCombo = () => {
  const navigate = useNavigate();
  const { viewedProfile, updateViewedProfile } = useAuth();

  const [comboName, setComboName] = useState("");
  const [type, setType] = useState("static");
  const [elements, setElements] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const maxVariants = 10;
  const minVariants = 3;

  // Variantes planas del usuario
  const userVariants = useMemo(() => getUserVariants(viewedProfile?.skills), [viewedProfile]);

  const filteredVariants = useMemo(() => {
  if (!userVariants) return [];
  if (type === "dynamic" || type === "mixed") return userVariants;
  // solo static y basic
  return userVariants.filter(v => v.type === "static" || v.type === "basic");
}, [userVariants, type]);

  // Energía disponible según tipo de combo
  const userEnergy = useMemo(() => {
    if (!viewedProfile?.stats) return 0;
    if (type === "static") return viewedProfile.stats.staticAura ?? 0;
    if (type === "dynamic") return viewedProfile.stats.dynamicAura ?? 0;
    return Math.min(viewedProfile.stats.staticAura ?? 0, viewedProfile.stats.dynamicAura ?? 0);
  }, [type, viewedProfile]);

  // Energía usada en tiempo real
  const totalEnergyUsed = useMemo(() => {
    return elements.reduce((sum, el) => {
      const variant = userVariants.find(v => v.userSkillId === el.userSkill && v.variantKey === el.variantKey);
      if (!variant) return sum;
      return sum + (el.hold ? el.hold * variant.stats.energyPerSecond : 0) + (el.reps ? el.reps * variant.stats.energyPerRep : 0);
    }, 0);
  }, [elements, userVariants]);

  const remainingEnergy = Math.max(0, userEnergy - totalEnergyUsed);

  // Agregar / quitar variante
  const handleToggleSkill = (userSkillId, variantKey) => {
    setElements(prev => {
      const exists = prev.some(el => el.userSkill === userSkillId && el.variantKey === variantKey);
      if (exists) return prev.filter(el => !(el.userSkill === userSkillId && el.variantKey === variantKey));
      if (prev.length >= maxVariants) {
        toast.error(`Máximo ${maxVariants} variantes`);
        return prev;
      }
      return [...prev, { userSkill: userSkillId, variantKey, hold: 0, reps: 0 }];
    });
  };

  // Actualizar hold/reps
  const handleSetHoldOrReps = (index, value) => {
    const numberValue = Number(value) || 0;
    setElements(prev => {
      const updated = [...prev];
      const variant = userVariants.find(v => v.userSkillId === updated[index].userSkill && v.variantKey === updated[index].variantKey);
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

  // Submit del combo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comboName.trim()) return toast.error("El combo necesita nombre");
    if (elements.length < minVariants) return toast.error(`Agrega mínimo ${minVariants} variantes`);
    if (!videoFile) return toast.error("Sube un video del combo");
    if (remainingEnergy < 0) return toast.error("No tienes energía suficiente");

    const formData = new FormData();
    formData.append("name", comboName);
    formData.append("type", type);
    formData.append("elements", JSON.stringify(elements));
    formData.append("video", videoFile);

    try {
      setLoading(true);
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

        {/* ProgressBar */}
        <div className="text-xs">
          <strong>Energía disponible: </strong> {remainingEnergy}/{userEnergy}
          <div className="w-full bg-gray-700 rounded-md h-3 mt-1">
            <div
              className={`h-3 rounded-md transition-all duration-500 ${remainingEnergy > userEnergy * 0.3 ? "bg-green-500" : "bg-red-500"}`}
              style={{ width: `${(remainingEnergy / userEnergy) * 100}%` }}
            />
          </div>
        </div>

        {/* Variantes */}
        <div>
          <label className="block text-sm mb-1">Variantes ({elements.length}/{maxVariants})</label>
          <div className="grid grid-cols-2 gap-2">
            {filteredVariants.map(variant => {
              const isSelected = elements.some(el => el.userSkill === variant.userSkillId && el.variantKey === variant.variantKey);
              const cost = variant.stats.energyPerSecond || variant.stats.energyPerRep;
              const disabled = cost > remainingEnergy && !isSelected;

              return (
                <button
                  key={`${variant.userSkillId}-${variant.variantKey}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleToggleSkill(variant.userSkillId, variant.variantKey)}
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
          const variant = userVariants.find(v => v.userSkillId === el.userSkill && v.variantKey === el.variantKey);
          if (!variant) return null;
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
            type="file"
            accept="video/mp4,video/webm"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="w-full text-sm"
          />
        </div>

        <SubmitButton
          loading={loading}
          text="Crear Combo"
          type="submit"
          disabled={remainingEnergy < 0 || loading}
        />
      </form>
    </div>
  );
};

export default AddCombo;
