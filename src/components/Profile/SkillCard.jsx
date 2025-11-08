import { skills } from "../../helpers/skills"

const SkillCard = ({ skill }) => {
    const baseSkill = skills.find((s) => s.skillId === skill.skillId);

  // Buscar la variante específica por variantId
  const variant = baseSkill?.variants?.find(
    (v) => v.variantId === skill.variantId
  );

  // Extraer los valores de AU
  const staticAu = variant?.staticAU ?? 0;
  const dynamicAu = variant?.dynamicAU ?? 0;


  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
      {/* Nombre del skill */}
      <h3 className="text-lg font-semibold text-white mb-1">
        {skill.variantName}
      </h3>

      {/* Stats de AU */}
      <p className="text-sm text-gray-300 mb-2">
        🔹 Static AU: <span className="text-blue-400">{staticAu}</span> | 🔸 Dynamic AU:{" "}
        <span className="text-green-400">{dynamicAu}</span>
      </p>
      {/* Video */}
      <video
        src={skill.videoUrl}
        controls
        className="rounded-lg mt-2 w-full"
      />
    </div>
  )
}

export default SkillCard
