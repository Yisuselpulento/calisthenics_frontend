import { skills } from "../../helpers/skills"

const SkillCard = ({ skill, view = "card" }) => {

  const baseSkill = skills.find((s) => s.skillId === skill.skillId);

  const variant = baseSkill?.variants?.find(
    (v) => v.variantId === skill.variantId
  );

  if (!variant) return null; // Prevención

  const staticAu = variant.staticAU ?? 0;
  const dynamicAu = variant.dynamicAU ?? 0;

  // === VISTA TARJETA COMPLETA ===
  if (view === "card") {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
        <h3 className=" text-white mb-1">
          {variant.variant}
        </h3>

        <p className="text-sm text-gray-300 mb-2">
          🔹 Static AU: <span className="text-blue-400">{staticAu}</span> |
          🔸 Dynamic AU: <span className="text-green-400">{dynamicAu}</span>
        </p>

        {skill.videoUrl && (
          <video
            src={skill.videoUrl}
            controls
            className="rounded-lg mt-2 w-full"
          />
        )}
      </div>
    );
  }

  // === VISTA DETALLADA SIMPLE ===
  if (view === "detail") {
    return (
      <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
        <p className="font-bold">{variant.variant}</p>
        <p className="text-sm text-gray-400">Static AU: {staticAu}</p>
        <p className="text-sm text-gray-400">Dynamic AU: {dynamicAu}</p>
      </div>
    );
  }

  return null;
};

export default SkillCard;
