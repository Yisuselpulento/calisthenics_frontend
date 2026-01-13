import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getComboByIdService,
  updateComboService,
} from "../../Services/comboFetching";
import SubmitButton from "../../components/Buttons/SubmitButton";
import VideoPlayer from "../../components/VideoPlayer";
import BarEnergyeditCombo from "../../components/BarEnergyeditCombo";
import { useAuth } from "../../context/AuthContext";

const MAX_VIDEO_SIZE_MB = 100;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

const EditCombo = () => {
  const { comboId } = useParams();
  const navigate = useNavigate();
  const { viewedProfile } = useAuth();

  const [loading, setLoading] = useState(false);
  const [comboType, setComboType] = useState(null);

  const [initialElements, setInitialElements] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    video: "",
    elements: [],
  });

  /* =========================
     FETCH COMBO
  ========================= */
  useEffect(() => {
    if (!comboId) return;

    const fetchCombo = async () => {
      setLoading(true);
      try {
        const res = await getComboByIdService(comboId);
        console.log(res)
        if (!res.success || !res.combo) {
          toast.error("Combo no encontrado");
          return;
        }

        const combo = res.combo;
        setComboType(combo.type);

        const mappedElements = combo.elements.map((el) => ({
          userSkill: el.userSkill,
          skillName: el.skillName,
          userSkillVariantId: el.userSkillVariantId,
          variantKey: el.variantKey,
          variantName: el.variantName,
          hold: el.hold ?? "",
          reps: el.reps ?? "",
          energyPerSecond: el.energyPerSecond || 0,
          energyPerRep: el.energyPerRep || 0,
        }));

        setFormData({
          name: combo.name || "",
          video: combo.video?.url || "",
          elements: mappedElements,
        });

        // 🔒 guardamos snapshot inicial
        setInitialElements(JSON.stringify(mappedElements));
      } catch (err) {
        console.error(err);
        toast.error("Error cargando combo");
      } finally {
        setLoading(false);
      }
    };

    fetchCombo();
  }, [comboId]);

  /* =========================
     USER ENERGY
  ========================= */
  const userEnergy = useMemo(() => {
    if (!viewedProfile || !comboType) return 0;

    return comboType === "static"
      ? viewedProfile.stats?.staticAura || 0
      : viewedProfile.stats?.dynamicAura || 0;
  }, [viewedProfile, comboType]);

  /* =========================
     ENERGY USED
  ========================= */
  const totalEnergyUsed = useMemo(() => {
    return formData.elements.reduce((sum, el) => {
      return (
        sum +
        (Number(el.hold) || 0) * el.energyPerSecond +
        (Number(el.reps) || 0) * el.energyPerRep
      );
    }, 0);
  }, [formData.elements]);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "video" && files?.length > 0) {
      const file = files[0];

      if (file.size > MAX_VIDEO_SIZE_BYTES) {
        toast.error("El video no puede superar los 100 MB");
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({ ...prev, video: file }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleElementChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.elements];
      updated[index] = {
        ...updated[index],
        [field]: value === "" ? "" : Number(value),
      };
      return { ...prev, elements: updated };
    });
  };

  /* =========================
     VALIDACIONES
  ========================= */
  const elementsChanged =
    JSON.stringify(formData.elements) !== initialElements;

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalEnergyUsed > userEnergy) {
      toast.error("No tienes energía suficiente para este combo");
      return;
    }

    if (elementsChanged && !(formData.video instanceof File)) {
      toast.error("Si modificas el combo debes subir un nuevo video");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("elements", JSON.stringify(formData.elements));

      if (formData.video instanceof File) {
        data.append("video", formData.video);
      }

      const res = await updateComboService(comboId, data);

      if (!res.success) {
        toast.error(res.message || "Error actualizando combo");
        return;
      }

      toast.success("Combo actualizado");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Error guardando combo");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     VIDEO PREVIEW
  ========================= */
  const videoSrc =
    formData.video instanceof File
      ? URL.createObjectURL(formData.video)
      : formData.video;

  useEffect(() => {
    return () => {
      if (formData.video instanceof File) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc, formData.video]);

  /* =========================
     UI
  ========================= */
  return (
    <div className="p-2 text-white min-h-screen">
      <h2 className="text-xl font-bold mb-4">Editar Combo</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-lg mx-auto bg-white/10 p-4 rounded-md backdrop-blur-md border border-white/20"
      >
  

        {/* Nombre */}
        <div>
          <label className="block text-sm mb-1">Nombre del combo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-black/30 rounded-md border text-sm"
          />
        </div>

        {/* Video */}
        <div>
          <label className="block text-sm mb-1">Video del combo</label>

          <input
            id="video"
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            className="hidden"
          />

          <label
            htmlFor="video"
            className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded-md cursor-pointer inline-block transition"
          >
            Cambiar video
          </label>

          {formData.video && (
            <div className="mt-2">
              <VideoPlayer src={videoSrc} />
            </div>
          )}
        </div>

              <BarEnergyeditCombo
          elements={formData.elements}
          userEnergy={userEnergy}
        />

        {/* ELEMENTS */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold">Elementos del combo</h3>

          {formData.elements.map((el, index) => (
            <div
              key={index}
              className="p-3 rounded-md border border-white/20 bg-black/20"
            >
              <p className="text-sm font-semibold">
                {el.skillName} — {el.variantName}
              </p>

              {/* STATIC */}
              {el.energyPerSecond > 0 && (
                <input
                  type="number"
                  min="0"
                  placeholder="Segundos"
                  value={el.hold}
                  onChange={(e) =>
                    handleElementChange(index, "hold", e.target.value)
                  }
                  className="w-full mt-2 p-2 bg-black/30 rounded-md border text-sm"
                />
              )}

              {/* DYNAMIC */}
              {el.energyPerRep > 0 && (
                <input
                  type="number"
                  min="0"
                  placeholder="Repeticiones"
                  value={el.reps}
                  onChange={(e) =>
                    handleElementChange(index, "reps", e.target.value)
                  }
                  className="w-full mt-2 p-2 bg-black/30 rounded-md border text-sm"
                />
              )}
            </div>
          ))}
        </div>

        <SubmitButton
          loading={loading}
          text="Guardar cambios"
          type="submit"
        />
      </form>
    </div>
  );
};

export default EditCombo;
