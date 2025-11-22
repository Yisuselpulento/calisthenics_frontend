import { skills as allSkills } from "./skills";

export const calculateComboStats = (combo, userSkills = []) => {
  let totalAura = 0;
  let totalEnergy = 0;

  const processedSkills = combo.skills
    .map((comboSkill) => {
      // 1️⃣ Skill real del usuario
      const realUserSkill = userSkills.find(
        (s) => s.userSkillId === comboSkill.userSkillId
      );

      // 2️⃣ Skill base
      const skillData = allSkills.find((s) => s.skillId === comboSkill.skillId);
      if (!skillData) return null;

      // 3️⃣ Variant
      const variantData = skillData.variants.find(
        (v) => v.variantId === comboSkill.variantId
      );
      if (!variantData) return null;

      // 4️⃣ Aura y energía individuales
      let aura = 0;
      let energy = 0;

      if (variantData.type === "static") {
        aura = variantData.dmg.damagePerSecond * (comboSkill.holdSeconds || 1);
        energy = variantData.dmg.energyPerSecond * (comboSkill.holdSeconds || 1);
      } else {
        aura = variantData.dmg.damagePerRep * (comboSkill.reps || 1);
        energy = variantData.dmg.energyPerRep * (comboSkill.reps || 1);
      }

      // Sumar al total
      totalAura += aura;
      totalEnergy += energy;

      // 5️⃣ Retornar skill procesada
      return {
        userSkillId: comboSkill.userSkillId,
        skillId: skillData.skillId,
        skillName: skillData.skillName,
        variantId: variantData.variantId,
        variantName: variantData.variant,
        type: variantData.type,

        videoUrl: realUserSkill?.videoUrl || variantData.videoUrl || null,

        holdSeconds: comboSkill.holdSeconds || 0,
        reps: comboSkill.reps || 0,

        damage: aura,   // ←🔥 Agregado
        energy: energy  // ←🔥 Agregado
      };
    })
    .filter(Boolean);

  return {
    totalAura,
    totalEnergy,
    skills: processedSkills,
  };
};
