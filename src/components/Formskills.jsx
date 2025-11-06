import { useState } from "react";
import { skills } from "../helpers/skills.js";

export default function FormSkills({ onSave }) {
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [userSkills, setUserSkills] = useState({});

  const handleSelectSkill = (skillId) => {
    const id = Number(skillId);
    setSelectedSkillId(id);

    if (!userSkills[id]) {
      const skill = skills.find((s) => s.id === id);
      setUserSkills((prev) => ({
        ...prev,
        [id]: JSON.parse(JSON.stringify(skill)),
      }));
    }
  };

  const handleChangeProgress = (id, value) => {
    setUserSkills((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        progress: { ...prev[id].progress, value: Number(value) },
      },
    }));
  };

  const handleChangeAmount = (id, value) => {
    setUserSkills((prev) => ({
      ...prev,
      [id]: { ...prev[id], amount: Number(value) },
    }));
  };

  const handleVariantChange = (id, variant, field, value) => {
    setUserSkills((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        variants: {
          ...prev[id].variants,
          [variant]: {
            ...prev[id].variants[variant],
            [field]: Number(value),
          },
        },
      },
    }));
  };

  const handleSave = () => {
    onSave(userSkills);
  };

  // Devuelve nivel + color
  const getLevel = (value) => {
    if (value < 25) return { text: "Novato", color: "text-red-500" };
    if (value < 50) return { text: "Normal", color: "text-green-500" };
    if (value < 75) return { text: "Avanzado", color: "text-purple-500" };
    return { text: "Experto", color: "text-yellow-400" };
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Selecciona tus Skills</h2>

      <select
        className="w-full p-2 rounded-lg bg-gray-800 mb-4"
        onChange={(e) => handleSelectSkill(e.target.value)}
        value={selectedSkillId || ""}
      >
        <option value="">-- Selecciona una skill --</option>
        {skills.map((skill) => (
          <option key={skill.id} value={skill.id}>
            {skill.name}
          </option>
        ))}
      </select>

      {selectedSkillId && (
        <div className="space-y-5 bg-gray-800 p-4 rounded-xl transition-all duration-300">
          <h3 className="text-xl font-semibold mb-2">
            {skills.find((s) => s.id === selectedSkillId).name}
          </h3>

          {/* PROGRESO GENERAL */}
          <div>
            <label className="block text-gray-300 font-medium mb-1 text-sm uppercase tracking-wider">
              Progreso general
            </label>
            <div
              className={`font-bold text-center mb-1 ${
                getLevel(userSkills[selectedSkillId].progress.value).color
              }`}
            >
              {getLevel(userSkills[selectedSkillId].progress.value).text}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={userSkills[selectedSkillId].progress.value}
              onChange={(e) => handleChangeProgress(selectedSkillId, e.target.value)}
              className="w-full accent-blue-500"
            />
          </div>

          {/* CANTIDAD */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Cantidad de repeticiones
            </label>
            <input
              type="number"
              min="0"
              max="200"
              value={userSkills[selectedSkillId].amount}
              onChange={(e) => handleChangeAmount(selectedSkillId, e.target.value)}
              className="w-full p-2 rounded-lg text-black"
            />
          </div>

          {/* DEDOS */}
          <div>
            <label className="block text-gray-300 font-medium mb-1 text-sm uppercase tracking-wider">
              Control de dedos
            </label>
            <div
              className={`font-bold text-center mb-1 ${
                getLevel(userSkills[selectedSkillId].variants.fingers.value).color
              }`}
            >
              {getLevel(userSkills[selectedSkillId].variants.fingers.value).text}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={userSkills[selectedSkillId].variants.fingers.value}
              onChange={(e) =>
                handleVariantChange(selectedSkillId, "fingers", "value", e.target.value)
              }
              className="w-full accent-purple-500"
            />
          </div>

          {/* BRAZOS */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Brazos (1 o 2)
            </label>
            <input
              type="number"
              min="1"
              max="2"
              value={userSkills[selectedSkillId].variants.arms.count}
              onChange={(e) =>
                handleVariantChange(selectedSkillId, "arms", "count", e.target.value)
              }
              className="w-full p-2 rounded-lg text-black"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-lg mt-4 font-semibold transition"
          >
            Guardar skill
          </button>
        </div>
      )}
    </div>
  );
}