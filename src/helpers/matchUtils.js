import { skills as allSkills } from "../helpers/skills";

export const getFullMatchUserData = (user, type) => {
  if (!user) return null;

  // Buscar combo según el tipo de match
  const combo = user.combos?.find((c) => c.type === type.toLowerCase());
  if (!combo) return null;

  // Procesar skills del combo
  const processedSkills = combo.skills.map((comboSkill) => {
    // 1️⃣ Buscar el userSkill REAL que está en user.skills (donde viene videoUrl)
    const realUserSkill = user.skills.find(
      (s) => s.userSkillId === comboSkill.userSkillId
    );

    const baseSkill = allSkills.find((s) => s.skillId === comboSkill.skillId);
    if (!baseSkill) return null;

    const variant = baseSkill.variants.find(
      (v) => v.variantId === comboSkill.variantId
    );
    if (!variant) return null;

    // Calcular daño según tipo
    let damage = 0;
    if (variant.type === "static") {
      damage = (variant.dmg?.damagePerSecond || 0) * (comboSkill.holdSeconds || 0);
    } else {
      damage = (variant.dmg?.damagePerRep || 0) * (comboSkill.reps || 0);
    }

    return {
      userSkillId: comboSkill.userSkillId,
      skillId: baseSkill.skillId,
      skillName: baseSkill.skillName,

      variantId: variant.variantId,
      variantName: variant.variant,
      baseType: variant.type,

      // 🔥 Ahora SÍ funciona:
      // user.skills → PRIORIDAD
      videoUrl: realUserSkill?.videoUrl || variant.videoUrl || null,

      holdSeconds: comboSkill.holdSeconds || 0,
      reps: comboSkill.reps || 0,

      // fingersUsed también viene desde user.skills
      fingersUsed: realUserSkill?.fingersUsed ?? null,

      damage
    };
  });

  return {
    name: user.name,
    username: user.username,
    avatar: user.avatar,
    combo: {
      comboId: combo.comboId,
      comboName: combo.comboName,
      type: combo.type,
      skills: processedSkills
    }
  };
};
