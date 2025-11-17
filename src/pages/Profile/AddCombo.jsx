import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { users } from "../../helpers/users";
import BackButton from "../../components/Buttons/BackButton";
import ButtonSubmit from "../../components/Buttons/ButtonSubmit";

const AddCombo = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const user = users.find((u) => u.username === username);
  const userSkills = user?.skills || [];

  const [form, setForm] = useState({
    comboName: "",
    description: "",
    type: "static",
    selectedSkills: [],
    totalAuraUsed: 0,
    totalEnergyCost: 0,
    totalDamage: 0,
  });

  if (!user)
    return (
      <p className="text-white text-center mt-10">
        Usuario no encontrado.
      </p>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (skillId) => {
    setForm((prev) => {
      const already = prev.selectedSkills.includes(skillId);
      if (already)
        return {
          ...prev,
          selectedSkills: prev.selectedSkills.filter((id) => id !== skillId),
        };
      if (prev.selectedSkills.length >= 5) return prev; // máximo 5
      return { ...prev, selectedSkills: [...prev.selectedSkills, skillId] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCombo = {
      comboId: `combo_${Math.random().toString(36).slice(2, 8)}`,
      comboName: form.comboName,
      description: form.description,
      type: form.type,
      skills: form.selectedSkills.map((id) => ({
        skillId: id,
        auraUsed: 100,
        energyCost: 80,
      })),
      totalAuraUsed: form.totalAuraUsed,
      totalEnergyCost: form.totalEnergyCost,
      totalDamage: form.totalDamage,
      createdAt: new Date(),
    };

    user.combos.push(newCombo);
    navigate(`/profile/${username}/combos`);
  };

  return (
    <div className="text-white min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Crear nuevo Combo</h2>
      <BackButton/>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white/10 p-5 rounded-md backdrop-blur-md border border-white/20 flex flex-col gap-4"
      >
        <div>
          <label className="block text-sm mb-1">Nombre del Combo</label>
          <input
            type="text"
            name="comboName"
            value={form.comboName}
            onChange={handleChange}
            className="w-full bg-black/30 rounded-md border border-white/20 p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-black/30 rounded-md border border-white/20 p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Tipo</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full bg-black/30 rounded-md border border-white/20 p-2 text-sm"
          >
            <option value="static">Static</option>
            <option value="dynamic">Dynamic</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm mb-2">
            Skills del usuario (máx. 5)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {userSkills.map((skill) => (
              <button
                key={skill.skillId}
                type="button"
                onClick={() => toggleSkill(skill.skillId)}
                className={`p-2 rounded-md text-left text-sm border transition ${
                  form.selectedSkills.includes(skill.skillId)
                    ? "bg-blue-600 border-blue-400"
                    : "bg-black/30 border-white/20 hover:border-blue-300"
                }`}
              >
                {skill.variantName}
              </button>
            ))}
          </div>
        </div>

        {/* Totales */}
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            name="totalAuraUsed"
            placeholder="Aura total"
            value={form.totalAuraUsed}
            onChange={handleChange}
            className="bg-black/30 rounded-md border border-white/20 p-2 text-sm"
          />
          <input
            type="number"
            name="totalEnergyCost"
            placeholder="Energía total"
            value={form.totalEnergyCost}
            onChange={handleChange}
            className="bg-black/30 rounded-md border border-white/20 p-2 text-sm"
          />
          <input
            type="number"
            name="totalDamage"
            placeholder="Daño total"
            value={form.totalDamage}
            onChange={handleChange}
            className="bg-black/30 rounded-md border border-white/20 p-2 text-sm"
          />
        </div>

      <ButtonSubmit type="submit" className="text-sm">
          Crear Combo
      </ButtonSubmit>
      </form>
    </div>
  );
};

export default AddCombo;
