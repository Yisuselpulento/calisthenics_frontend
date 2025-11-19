import { skills as allSkills } from "./skills";

/**
 * Calcula el total de aura, energía y datos completos del combo
 * @param {Object} combo - Combo del usuario
 * @param {Array} userSkills - Skills completas del usuario (con videoUrl)
 * @returns {Object} - { totalAura, totalEnergy, skills: [] }
 */
export const calculateComboStats = (combo, userSkills = []) => {
  let totalAura = 0;
  let totalEnergy = 0;

  const processedSkills = combo.skills.map((comboSkill) => {
    // 1️⃣ Buscar skill REAL del usuario (donde viene videoUrl)
    const realUserSkill = userSkills.find(
      (s) => s.userSkillId === comboSkill.userSkillId
    );

    // 2️⃣ Buscar skill base
    const skillData = allSkills.find((s) => s.skillId === comboSkill.skillId);
    if (!skillData) return null;

    // 3️⃣ Buscar variant
    const variantData = skillData.variants.find(
      (v) => v.variantId === comboSkill.variantId
    );
    if (!variantData) return null;

    // 4️⃣ Cálculo de aura/energía
    if (variantData.type === "static") {
      totalAura += variantData.dmg.damagePerSecond * (comboSkill.holdSeconds || 1);
      totalEnergy += variantData.dmg.energyPerSecond * (comboSkill.holdSeconds || 1);
    } else if (variantData.type === "dynamic") {
      totalAura += variantData.dmg.damagePerRep * (comboSkill.reps || 1);
      totalEnergy += variantData.dmg.energyPerRep * (comboSkill.reps || 1);
    }

    // 5️⃣ Devolver skill procesada con video incluído
    return {
      userSkillId: comboSkill.userSkillId,
      skillId: skillData.skillId,
      skillName: skillData.skillName,
      variantId: variantData.variantId,
      variantName: variantData.variant,
      type: variantData.type,

      // 🔥 PRIORIDAD: user → variant → null
      videoUrl: realUserSkill?.videoUrl || variantData.videoUrl || null,

      holdSeconds: comboSkill.holdSeconds || 0,
      reps: comboSkill.reps || 0,
    };
  }).filter(Boolean); // elimina nulls

  return {
    totalAura,
    totalEnergy,
    skills: processedSkills,
  };

   console.log("📌 calculateComboStats result:", result);

    console.log("📌 calculateComboStats result:", result);
};
