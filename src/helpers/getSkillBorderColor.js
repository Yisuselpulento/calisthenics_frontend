export const getSkillBorderColor = (difficulty) => {
  switch (difficulty) {
    case "elite":
      return "border-purple-500";
    case "legendary":
      return "border-yellow-500";
    default:
      return "border-neutral-700";
  }
}; 