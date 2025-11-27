/* import { useParams } from "react-router-dom";
import { useState } from "react";
import { users } from "../../helpers/users";
import { skills as skillsBase } from "../../helpers/skills";
import ButtonSubmit from "../../components/Buttons/ButtonSubmit";
import SelectCustom from "../../components/SelectCustom";

const formatVariantName = (str) =>
  str.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()); */

const EditCombo = () => {
 /*  const { username, comboId } = useParams();

  const user = users.find((u) => u.username === username);
  const combo = user?.combos?.find((c) => c.comboId === comboId);
  const userSkills = user?.skills || [];

  if (!user || !combo)
    return <p className="text-white text-center mt-10">Combo no encontrado.</p>;

  const findVariantData = (skillId, variantId) => {
    const baseSkill = skillsBase.find((s) => s.skillId === skillId);
    if (!baseSkill) return null;
    return baseSkill.variants.find((v) => v.variantId === variantId);
  };

  const [form, setForm] = useState({
    comboName: combo.comboName,
    type: combo.type,
    skills: combo.skills.map((s) => ({ ...s })),
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillChange = (index, field, value) => {
    const updated = [...form.skills];
    updated[index][field] = value;
    setForm({ ...form, skills: updated });
    console.log("Skill updated:", updated[index]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Combo final:", form);
  }; */

  return (
    <div className="max-w-xl mx-auto text-white min-h-screen">
    {/*   <h1 className="text-xl font-bold mb-2">Editar Combo</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-5 backdrop-blur-md border border-white/20 rounded-2xl space-y-5"
      >
     
        <div>
          <label className="block mb-1 font-semibold">Nombre del combo</label>
          <input
            type="text"
            value={form.comboName}
            onChange={(e) => handleChange("comboName", e.target.value)}
            className="w-full bg-black/30 border border-gray-700 p-2 rounded-lg"
          />
        </div>

   
        <div>
          <label className="block mb-1 font-semibold">Tipo</label>
          <SelectCustom
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
            options={[
              { label: "Static", value: "static" },
              { label: "Dynamic", value: "dynamic" },
              { label: "Mixed", value: "mixed" },
            ]}
          />
        </div>

     
        <div>
          <label className="block mb-2 font-semibold">Skills del combo</label>
          {form.skills.map((s, index) => {
            const variantData = findVariantData(s.skillId, s.variantId);
            const isStatic = variantData?.type === "static";
            const isDynamic = variantData?.type === "dynamic";

            return (
              <div
                key={index}
                className="bg-black/30 border border-gray-700 p-3 rounded-xl mb-3"
              >
                <h3 className="font-bold mb-2">
                  {variantData?.variant || s.variantId}
                </h3>

                <p className="text-xs opacity-80 mb-2">
                  staticAU: {variantData?.staticAU ?? "?"} | dynamicAU:{" "}
                  {variantData?.dynamicAU ?? "?"}
                </p>

                {isStatic && (
                  <div className="flex items-center gap-2">
                    <label>Hold (s):</label>
                    <input
                      type="number"
                      value={s.holdSeconds || 0}
                      onChange={(e) =>
                        handleSkillChange(index, "holdSeconds", Number(e.target.value))
                      }
                      className="bg-black/30 border border-gray-700 p-2 rounded-lg w-24"
                    />
                  </div>
                )}

                {isDynamic && (
                  <div className="flex items-center gap-2">
                    <label>Reps:</label>
                    <input
                      type="number"
                      value={s.reps || 0}
                      onChange={(e) =>
                        handleSkillChange(index, "reps", Number(e.target.value))
                      }
                      className="bg-black/30 border border-gray-700 p-2 rounded-lg w-24"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <ButtonSubmit type="submit">Guardar cambios (console.log)</ButtonSubmit>
      </form> */}
    </div>
  );
};

export default EditCombo;
