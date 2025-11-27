import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ButtonSkill from "../../components/Buttons/ButtonSkill";
import FilterButton from "../../components/Buttons/Filterbutton";
import { addSkillVariantService } from "../../Services/skillFetching.js";
import { getAllSkillsAdminService } from "../../Services/SkillAdminFetching.js";
import toast from "react-hot-toast";
import SubmitButton from "../../components/Buttons/SubmitButton.jsx";

const AddSkill = () => {
  const { currentUser, updateCurrentUser } = useAuth();

  const [skills, setSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true); // ⚡ loading inicial
  const [loadingSubmit, setLoadingSubmit] = useState(false); // ⚡ loading del botón

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [fingersUsed, setFingersUsed] = useState(5);
  const [error, setError] = useState("");

  // 🔹 Traer todas las skills desde DB
  useEffect(() => {
    const fetchSkills = async () => {
      setLoadingSkills(true);
      try {
        const data = await getAllSkillsAdminService();
        if (data.success === false) {
          setError(data.message || "Error cargando skills");
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
    if (!selectedSkill || !selectedVariant) {
      setError("Debes seleccionar una skill y una variante.");
      return;
    }
    if (!videoFile) {
      setError("Debes subir un video para agregar esta variante.");
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

      // 🔹 Actualizar currentUser correctamente
      updateCurrentUser({
        ...currentUser,
        skills: [
          ...(currentUser.skills || []).filter(s => s._id !== response.userSkill._id),
          response.userSkill,
        ],
      });

      // Reset de formulario
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
            {selectedSkill.variants.map((v) => (
              <button
                key={v.variantKey}
                onClick={() => setSelectedVariant(v)}
                className={`p-3 rounded-xl border transition ${
                  selectedVariant?.variantKey === v.variantKey
                    ? "bg-primary border-blue-700"
                    : "bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
                }`}
              >
                {v.name} <br />
                <span className="text-xs text-gray-400">
                  ({v.type}, {v.difficulty || "-"})
                </span>
              </button>
            ))}
          </div>

          {selectedVariant && (
            <div className="mt-6 space-y-3">
              <div>
                <label className="block text-sm mb-1 text-gray-300">Video (obligatorio)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  className="w-full p-2 rounded-lg bg-neutral-900 border border-neutral-700"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-300">Dedos usados</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={fingersUsed}
                  onChange={(e) => setFingersUsed(parseInt(e.target.value))}
                  className="w-20 p-2 rounded-lg bg-neutral-900 border border-neutral-700"
                />
              </div>

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}

              <SubmitButton
                onClick={handleAddSkill}
                loading={loadingSubmit} // ⚡ solo botón
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
