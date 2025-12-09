/**
 * Transforma un array de UserSkills en un array plano de variantes enriquecidas
 * @param {Array} userSkills - Array de UserSkill poblados con Skill
 * @returns {Array} Array de variantes con info de userSkill y skill
 */
export const getUserVariants = (userSkills = []) => {
  return userSkills.flatMap((userSkill) =>
    userSkill.variants.map((variant) => ({
      userSkillId: userSkill._id,       
      variantKey: variant.variantKey,
      fingers: variant.fingers,
      video: variant.video,
      name: variant.name,
      type: variant.type,
      stats: variant.stats,
      staticAU: variant.staticAU,
      dynamicAU: variant.dynamicAU,
      skillName: userSkill.skill.name,  
      skillId: userSkill.skill._id,   
      difficulty: variant.difficulty, 
    }))
  );
};
