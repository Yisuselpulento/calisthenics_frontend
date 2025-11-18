import { getSkillBorderColor } from "../../helpers/getSkillBorderColor";

const ButtonSkill = ({ skill, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition border 
        ${getSkillBorderColor(skill.baseDifficulty)}
      `}
    >
      {skill.skillName}
    </button>
  );
};

export default ButtonSkill;
