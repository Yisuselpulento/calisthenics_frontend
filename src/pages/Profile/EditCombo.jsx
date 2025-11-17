import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { users } from "../../helpers/users"
import ButtonSubmit from "../../components/Buttons/ButtonSubmit"
import SelectCustom from "../../components/SelectCustom"

const EditCombo = () => {
  const { username, comboId } = useParams()
  const navigate = useNavigate()

  const user = users.find((u) => u.username === username)
  const combo = user?.combos?.find((c) => c.comboId === comboId)
  const allSkills = user?.skills || []

  const [form, setForm] = useState(
    combo || {
      comboName: "",
      description: "",
      type: "static",
      skills: [],
      totalAuraUsed: 0,
      totalEnergyCost: 0,
      totalDamage: 0,
    }
  )

  if (!user || !combo)
    return (
      <p className="text-white text-center mt-10">
        Combo no encontrado.
      </p>
    )

  // === Handlers ===
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillChange = (index, field, value) => {
    const updated = [...form.skills]
    updated[index][field] = value
    setForm({ ...form, skills: updated })
  }

  const handleAddSkill = () => {
    setForm({
      ...form,
      skills: [
        ...form.skills,
        {
          skillId: allSkills[0]?.skillId || "",
          variantId: allSkills[0]?.variantId || "",
          auraUsed: 0,
          energyCost: 0,
        },
      ],
    })
  }

  const handleRemoveSkill = (index) => {
    const updated = [...form.skills]
    updated.splice(index, 1)
    setForm({ ...form, skills: updated })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("✅ Combo actualizado:", form)
    navigate(`/profile/${username}/combos/${comboId}`)
  }

  return (
    <div className="max-w-4xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Editar Combo</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" bg-white/10 p-4 backdrop-blur-md border border-white/20 rounded-2xl   space-y-5"
      >
        {/* === Info principal === */}
        <div>
          <label className="block mb-1 font-semibold">Nombre del combo</label>
          <input
            type="text"
            name="comboName"
            value={form.comboName}
            onChange={handleChange}
            className="w-full bg-black/30 border border-gray-700 p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-black/30 border border-gray-700 p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Tipo</label>
          <SelectCustom
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            options={[
              { label: "Static", value: "static" },
              { label: "Dynamic", value: "dynamic" },
              { label: "Mixed", value: "mixed" },
            ]}
          />
        </div>

        {/* === Skills === */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">Skills del combo</label>
            <button
              type="button"
              onClick={handleAddSkill}
              className="text-sm bg-primary hover:bg-primary/80 px-3 py-1"
            >
              + Agregar Skill
            </button>
          </div>

          {form.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-black/30 border border-gray-700 p-3 rounded-xl mb-3"
            >
            <div className="flex justify-between items-center mb-2">
                <SelectCustom
                  value={skill.skillId}
                  onChange={(e) =>
                    handleSkillChange(index, "skillId", e.target.value)
                  }
                  options={allSkills.map((s) => ({
                    label: s.variantName,
                    value: s.skillId,
                  }))}
                />

                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-red-400 text-sm ml-2"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <input
                  type="number"
                  placeholder="Aura usada"
                  value={skill.auraUsed || ""}
                  onChange={(e) =>
                    handleSkillChange(index, "auraUsed", Number(e.target.value))
                  }
                  className="bg-black/30 border border-gray-700 p-2 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Energía usada"
                  value={skill.energyCost || ""}
                  onChange={(e) =>
                    handleSkillChange(index, "energyCost", Number(e.target.value))
                  }
                  className="bg-black/30 border border-gray-700 p-2 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Hold (s)"
                  value={skill.holdSeconds || ""}
                  onChange={(e) =>
                    handleSkillChange(index, "holdSeconds", Number(e.target.value))
                  }
                  className="bg-black/30 border border-gray-700 p-2 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={skill.reps || ""}
                  onChange={(e) =>
                    handleSkillChange(index, "reps", Number(e.target.value))
                  }
                  className="bg-black/30 border border-gray-700 p-2 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>

        {/* === Totales === */}
        <div className="grid grid-cols-3 gap-3">
          <input
            type="number"
            name="totalAuraUsed"
            placeholder="Total Aura"
            value={form.totalAuraUsed}
            onChange={handleChange}
            className="bg-black/30 border border-gray-700 p-2 rounded-lg"
          />
          <input
            type="number"
            name="totalEnergyCost"
            placeholder="Total Energía"
            value={form.totalEnergyCost}
            onChange={handleChange}
            className="bg-black/30 border border-gray-700 p-2 rounded-lg"
          />
          <input
            type="number"
            name="totalDamage"
            placeholder="Total Daño"
            value={form.totalDamage}
            onChange={handleChange}
            className="bg-black/30 border border-gray-700 p-2 rounded-lg"
          />
        </div>

         <ButtonSubmit type="submit">
          Guardar cambios
        </ButtonSubmit>
      </form>
    </div>
  )
}

export default EditCombo
