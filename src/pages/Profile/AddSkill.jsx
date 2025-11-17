import { useState } from "react";
import { skills } from "../../helpers/skills";
import { useAuth } from "../../context/AuthContext";
import ButtonSubmit from "../../components/Buttons/ButtonSubmit";

const AddSkill = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [armsUsed, setArmsUsed] = useState(2);
  const [fingersUsed, setFingersUsed] = useState(5);
  const [error, setError] = useState("");

  const handleAddSkill = () => {
    if (!selectedSkill || !selectedVariant) {
      setError("Debes seleccionar una skill y una variante.");
      return;
    }
    if (!videoUrl) {
      setError("Debes subir un video para agregar esta variante.");
      return;
    }

    const newSkill = {
      skillId: selectedSkill.skillId,
      variantId: selectedVariant.variantId,
      variantName: selectedVariant.variant,
      armsUsed,
      fingersUsed,
      videoUrl,
    };

    updateCurrentUser({
      skills: [...(currentUser.skills || []), newSkill],
    });

    // Reset
    setSelectedSkill(null);
    setSelectedVariant(null);
    setVideoUrl("");
    setError("");
    alert("✅ Skill agregada con éxito!");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Agregar Skill</h1>

      {!selectedSkill ? (
        <>
          <p className="text-gray-400 mb-2 text-center">Selecciona una skill:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((s) => (
              <button
                key={s.skillId}
                onClick={() => setSelectedSkill(s)}
                className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition"
              >
                {s.skillName}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-4">
          <button
            onClick={() => setSelectedSkill(null)}
            className="text-sm text-blue-500 mb-3 hover:text-white "
          >
            ← Volver
          </button>

          <h2 className="text-xl font-semibold mb-2">{selectedSkill.skillName}</h2>
          <p className="text-gray-400 mb-3">{selectedSkill.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedSkill.variants.map((v) => (
              <button
                key={v.variantId}
                onClick={() => setSelectedVariant(v)}
                className={`p-3 rounded-xl border transition ${
                  selectedVariant?.variantId === v.variantId
                    ? "bg-primary border-blue-700"
                    : "bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
                }`}
              >
                {v.variant} <br />
                <span className="text-xs text-gray-400">
                  ({v.type}, {v.difficulty})
                </span>
              </button>
            ))}
          </div>

          {selectedVariant && (
            <div className="mt-6 space-y-3">
              <div>
                <label className="block text-sm mb-1 text-gray-300">
                  URL del video (obligatorio)
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-900 border border-neutral-700"
                  placeholder="https://res.cloudinary.com/..."
                />
              </div>

              <div className="flex gap-3">
                <div>
                  <label className="block text-sm mb-1 text-gray-300">
                    Brazos usados
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="2"
                    value={armsUsed}
                    onChange={(e) => setArmsUsed(parseInt(e.target.value))}
                    className="w-20 p-2 rounded-lg bg-neutral-900 border border-neutral-700"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-300">
                    Dedos usados
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={fingersUsed}
                    onChange={(e) => setFingersUsed(parseInt(e.target.value))}
                    className="w-20 p-2 rounded-lg bg-neutral-900 border border-neutral-700"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

            <ButtonSubmit onClick={handleAddSkill} className="mt-2">
              Agregar Skill
            </ButtonSubmit>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddSkill;
