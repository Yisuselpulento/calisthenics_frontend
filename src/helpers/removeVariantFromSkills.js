export const removeVariantFromSkills = (skills, userSkillId, variantKey, fingers) => {
  return skills.map((us) =>
    us._id === userSkillId
      ? {
          ...us,
          variants: us.variants.filter(
            (v) => v.variantKey !== variantKey || v.fingers !== fingers
          ),
        }
      : us
  );
};