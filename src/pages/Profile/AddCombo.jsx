/* import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { users } from "../../helpers/users";
import { skills as skillsBase } from "../../helpers/skills";
import BackButton from "../../components/Buttons/BackButton";
import ButtonSubmit from "../../components/Buttons/ButtonSubmit"; */

const AddCombo = () => {
 /*  const { username } = useParams();
  const navigate = useNavigate();
  const user = users.find((u) => u.username === username);

  if (!user)
    return (
      <p className="text-white text-center mt-10">
        Usuario no encontrado.
      </p>
    );

  const userSkills = user.skills || [];

  const [form, setForm] = useState({
    comboName: "",
    type: "static",
    selectedSkills: [],
  });

  const findVariantData = (skillId, variantId) => {
    const baseSkill = skillsBase.find((s) => s.skillId === skillId);
    if (!baseSkill) return null;
    return baseSkill.variants.find((v) => v.variantId === variantId);
  };

  const toggleSkill = (skill) => {
    setForm((prev) => {
      const isAdded = prev.selectedSkills.some(
        (s) => s.skillId === skill.skillId
      );

      if (isAdded) {
        return {
          ...prev,
          selectedSkills: prev.selectedSkills.filter(
            (s) => s.skillId !== skill.skillId
          ),
        };
      }

      if (prev.selectedSkills.length >= 5) return prev;

      return {
        ...prev,
        selectedSkills: [
          ...prev.selectedSkills,
          {
            skillId: skill.skillId,
            variantId: skill.variantId,
            holdSeconds: 0,
            reps: 0,
          },
        ],
      };
    });
  };

  const updateSkillField = (skillId, field, value) => {
    setForm((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.map((s) =>
        s.skillId === skillId ? { ...s, [field]: value } : s
      ),
    }));
    console.log("Update skill:", skillId, field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM DATA:", form);
  }; */

  return (
    <div className="text-white min-h-screen p-4">
  {/*     <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Crear nuevo Combo</h2>
        <BackButton />
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white/10 p-5 rounded-md backdrop-blur-md border border-white/20 flex flex-col gap-4"
      >
    
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input
            type="text"
            value={form.comboName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, comboName: e.target.value }))
            }
            className="w-full bg-black/30 rounded-md border border-white/20 p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Tipo</label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, type: e.target.value }))
            }
            className="w-full bg-black/30 rounded-md border border-white/20 p-2 text-sm"
          >
            <option value="static">Static</option>
            <option value="dynamic">Dynamic</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

       
        <div>
          <label className="block text-sm mb-2">
            Skills del usuario (máx. 5)
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {userSkills.map((skill) => {
              const isSelected = form.selectedSkills.some(
                (s) => s.skillId === skill.skillId
              );
              const variantData = findVariantData(skill.skillId, skill.variantId);

              return (
                <button
                  key={skill.skillId}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`p-2 rounded-md text-left text-sm border transition ${
                    isSelected
                      ? "bg-blue-600 border-blue-400"
                      : "bg-black/30 border-white/20 hover:border-blue-300"
                  }`}
                >
                  {variantData?.variant || skill.variantId}
                </button>
              );
            })}
          </div>
        </div>

     
        <div className="flex flex-col gap-4 mt-4">
          {form.selectedSkills.map((s, index) => {
            const variantData = findVariantData(s.skillId, s.variantId);
            const isStatic = variantData?.type === "static";
            const isDynamic = variantData?.type === "dynamic";

            return (
              <div
                key={index}
                className="bg-white/10 border border-white/20 rounded-lg p-4"
              >
                <h3 className="font-bold mb-2">
                  {variantData?.variant || "Skill"}
                </h3>

                <p className="text-xs opacity-80 mb-2">
                  staticAU: {variantData?.staticAU ?? "?"} | dynamicAU:{" "}
                  {variantData?.dynamicAU ?? "?"}
                </p>

                {isStatic && (
                  <div>
                    <label className="text-sm">Hold Seconds</label>
                    <input
                      type="number"
                      min={1}
                      value={s.holdSeconds}
                      onChange={(e) =>
                        updateSkillField(
                          s.skillId,
                          "holdSeconds",
                          Number(e.target.value)
                        )
                      }
                      className="w-full bg-black/30 border border-white/20 rounded-md p-2 mt-1"
                    />
                  </div>
                )}

                {isDynamic && (
                  <div>
                    <label className="text-sm">Reps</label>
                    <input
                      type="number"
                      min={1}
                      value={s.reps}
                      onChange={(e) =>
                        updateSkillField(s.skillId, "reps", Number(e.target.value))
                      }
                      className="w-full bg-black/30 border border-white/20 rounded-md p-2 mt-1"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <ButtonSubmit type="submit" className="text-sm mt-4">
          Crear Combo (solo console.log)
        </ButtonSubmit>
      </form> */}
    </div>
  );
};

export default AddCombo;
