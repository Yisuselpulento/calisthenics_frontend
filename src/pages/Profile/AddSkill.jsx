import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ButtonSkill from "../../components/Buttons/ButtonSkill";
import FilterButton from "../../components/Buttons/Filterbutton";
import { addSkillVariantService } from "../../Services/skillFetching.js";
import { getAllSkillsAdminService } from "../../Services/SkillAdminFetching.js";
import toast from "react-hot-toast";
import SubmitButton from "../../components/Buttons/SubmitButton.jsx";
import  {getVariantBgColor}  from "../../helpers/colorTargetVariants.js";
import SearchSkills from "../../components/SearchSkills";

const AddSkill = () => {
  const { updateViewedProfile } = useAuth();

  const [skills, setSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [fingersUsed, setFingersUsed] = useState(5);
  const [error, setError] = useState("");

   const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredVariants = selectedSkill?.variants.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? v.type === typeFilter : true;
    return matchesSearch && matchesType;
  }) || [];

  // 🔹 Cargar skills
  useEffect(() => {
    const fetchSkills = async () => {
      setLoadingSkills(true);
      try {
        const data = await getAllSkillsAdminService();
        if (!data || data.success === false) {
          setError(data?.message || "Error cargando skills");
        } else {
          setSkills(data);
        }
      } catch (err) {
        console.error(err);
        setError("Error cargando skills");
      } finally {
        setLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);
  

  // 🔹 Agregar skill
  const handleAddSkill = async () => {
    const validFingers = [1, 2, 5];
    if (!selectedSkill || !selectedVariant) {
      setError("Debes seleccionar una skill y una variante.");
      return;
    }
    if (!videoFile) {
      setError("Debes subir un video para agregar esta variante.");
      return;
    }
    if (!validFingers.includes(fingersUsed)) {
      setError("Solo puedes elegir 1, 2 o 5 dedos.");
      return;
    }

    setLoadingSubmit(true);

    try {
      const formData = new FormData();
      formData.append("skillId", selectedSkill._id);
      formData.append("variantKey", selectedVariant.variantKey);
      formData.append("fingers", fingersUsed);
      formData.append("video", videoFile);

      const response = await addSkillVariantService(formData);

      if (!response.success) {
        setError(response.message || "Error agregando la variante");
        return;
      }

      updateViewedProfile(response.user);

      // Reset
      setSelectedSkill(null);
      setSelectedVariant(null);
      setVideoFile(null);
      setFingersUsed(5);
      setError("");
      toast.success("Skill agregada con éxito!");
    } catch (err) {
      console.error(err);
      toast.error("Error agregando la skill");
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingSkills) return <p className="text-white p-5">Cargando skills...</p>;
  if (!skills.length) return <p className="text-white p-5">No hay skills disponibles.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Agregar Skill</h1>

      {!selectedSkill ? (
        <>
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-400">Selecciona una skill:</p>
            <FilterButton onClick={() => console.log("Abrir filtros")} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((s) => (
              <ButtonSkill key={s._id} skill={s} onClick={() => setSelectedSkill(s)} />
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

          <h2 className="text-xl font-semibold mb-2">{selectedSkill.name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedSkill.variants.map((v) => {
                const bgClass = selectedVariant?.variantKey === v.variantKey
                  ? "bg-primary border-blue-700" // seleccionado mantiene tu estilo
                  : getVariantBgColor(v.difficulty); // color según dificultad

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

          {selectedVariant && (
            <div className="mt-6 space-y-3">

              {/* Video */}
              <div>
                  <label className="block text-sm mb-1 text-gray-300">
                    Video (obligatorio)
                  </label>
                  
                  {/* Input oculto */}
                  <input
                    id="skillVideo"
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="hidden"
                  />

                  {/* Label como botón */}
                  <label
                    htmlFor="skillVideo"
                    className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded-md cursor-pointer inline-block transition"
                  >
                    Seleccionar video
                  </label>

                  {/* Preview */}
                  {videoFile && (
                    <div className="relative w-full aspect-[9/16] max-h-[60vh] bg-black rounded-lg overflow-hidden mt-2">
                      <video
                        src={videoFile instanceof File ? URL.createObjectURL(videoFile) : videoFile}
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>

              {/* Selector de dedos */}
              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  Dedos usados
                </label>
                <select
                  value={fingersUsed}
                  onChange={(e) => setFingersUsed(Number(e.target.value))}
                  className="w-28 p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                >
                  <option value={1}>1 dedo</option>
                  <option value={2}>2 dedos</option>
                  <option value={5}>5 dedos</option>
                </select>
              </div>

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}

              <SubmitButton
                onClick={handleAddSkill}
                loading={loadingSubmit}
                text="Agregar Skill"
                type="submit"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddSkill;
