import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ButtonSkill from "../../components/Buttons/ButtonSkill";
import FilterButton from "../../components/Buttons/Filterbutton";
import { addSkillVariantService } from "../../Services/skillFetching.js";
import { getAllSkillsAdminService } from "../../Services/SkillAdminFetching.js";
import toast from "react-hot-toast";
import SubmitButton from "../../components/Buttons/SubmitButton.jsx";
import { getVariantBgColor } from "../../helpers/colorTargetVariants.js";
import VideoPlayer from "../../components/VideoPlayer";


const AddSkill = () => {
  const { updateViewedProfile } = useAuth();

  const [skills, setSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [videoFile, setVideoFile] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);

  const [fingersUsed, setFingersUsed] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  

  /* =========================
     Cargar skills
  ========================= */
  useEffect(() => {
    const fetchSkills = async () => {
      setLoadingSkills(true);

      const res = await getAllSkillsAdminService();

      if (!res.success) {
        toast.error(res.message);
      } else {
        setSkills(res.data);
      }

      setLoadingSkills(false);
    };

    fetchSkills();
  }, []);


  useEffect(() => {
    return () => {
      if (videoSrc) URL.revokeObjectURL(videoSrc);
    };
  }, [videoSrc]);


  const filteredVariants =
    selectedSkill?.variants.filter((v) => {
      const matchesSearch = v.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = typeFilter ? v.type === typeFilter : true;
      return matchesSearch && matchesType;
    }) || [];

 
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideoFile(file);
    setVideoSrc(URL.createObjectURL(file));
  };

  /* =========================
     Agregar skill
  ========================= */
  const handleAddSkill = async () => {
    const validFingers = [1, 2, 5];

    if (!selectedSkill || !selectedVariant) {
      toast.error("Debes seleccionar una skill y una variante");
      return;
    }

    if (!videoFile) {
      toast.error("Debes subir un video");
      return;
    }

    if (!validFingers.includes(fingersUsed)) {
      toast.error("Solo puedes elegir 1, 2 o 5 dedos");
      return;
    }

    setLoadingSubmit(true);

    const formData = new FormData();
    formData.append("skillId", selectedSkill._id);
    formData.append("variantKey", selectedVariant.variantKey);
    formData.append("fingers", fingersUsed);
    formData.append("video", videoFile);

    const res = await addSkillVariantService(formData);

    if (!res.success) {
      toast.error(res.message);
      setLoadingSubmit(false);
      return;
    }

    updateViewedProfile(res.user);

    // Reset
    setSelectedSkill(null);
    setSelectedVariant(null);
    setVideoFile(null);
    setVideoSrc(null);
    setFingersUsed(5);

    toast.success(res.message);
    setLoadingSubmit(false);
  };

  /* =========================
     Render
  ========================= */
  if (loadingSkills)
    return <p className="text-white p-5">Cargando skills...</p>;

  if (!skills.length)
    return <p className="text-white p-5">No hay skills disponibles.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto text-white">
      <h1 className="text-xl font-bold mb-4 text-center">
        Agregar Skill
      </h1>

      {!selectedSkill ? (
        <>
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-400">Selecciona una skill:</p>
            <FilterButton />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((s) => (
              <ButtonSkill
                key={s._id}
                skill={s}
                onClick={() => setSelectedSkill(s)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-4">
          <button
            onClick={() => setSelectedSkill(null)}
            className="text-sm text-blue-500 mb-3 hover:text-white"
          >
            ← Volver
          </button>

          <h2 className="text-xl font-semibold mb-3">
            {selectedSkill.name}
          </h2>

          {/* Variantes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredVariants.map((v) => {
              const bgClass =
                selectedVariant?.variantKey === v.variantKey
                  ? "bg-primary border-blue-700"
                  : getVariantBgColor(v.difficulty);

              return (
                <button
                  key={v.variantKey}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3 rounded-xl border transition ${bgClass}`}
                >
                  {v.name}
                  <br />
                  <span className="text-xs text-gray-300">
                    ({v.difficulty || "-"})
                  </span>
                </button>
              );
            })}
          </div>

          {filteredVariants.length === 0 && (
            <p className="text-gray-400 text-sm text-center mt-4">
              No hay variantes que coincidan
            </p>
          )}

          {selectedVariant && (
            <div className="mt-6 space-y-4">
              {/* Video */}
              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  Video (obligatorio)
                </label>

                <input
                  id="skillVideo"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />

                <label
                  htmlFor="skillVideo"
                  className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded-md cursor-pointer inline-block transition"
                >
                  Seleccionar video
                </label>

                <VideoPlayer src={videoSrc} />
              </div>

              {/* Dedos */}
              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  Dedos usados
                </label>
                <select
                  value={fingersUsed}
                  onChange={(e) =>
                    setFingersUsed(Number(e.target.value))
                  }
                  className="w-28 p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                >
                  <option value={1}>1 dedo</option>
                  <option value={2}>2 dedos</option>
                  <option value={5}>5 dedos</option>
                </select>
              </div>

              <SubmitButton
                onClick={handleAddSkill}
                loading={loadingSubmit}
                text="Agregar Skill"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddSkill;
