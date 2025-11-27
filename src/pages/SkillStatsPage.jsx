
const SkillsStatsPage = () => {
  return (
    <div className="w-full min-h-screen p-6 bg-neutral-950 text-white">
    {/*   <h1 className="text-3xl font-bold mb-6">Skills Stats</h1>

      
      <div className="flex flex-col gap-8">
        {skills.map((skill) => (
          <div
            key={skill.skillId}
            className="w-full p-4 bg-neutral-900 rounded-xl shadow-lg"
          >
           
            <h2 className="text-2xl font-bold mb-4">{skill.skillName}</h2>

           
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-sm text-gray-300 border-b border-gray-700">
                    <th className="p-2">Variante</th>
                    <th className="p-2">Dmg</th>
                    <th className="p-2">Energía</th>
                    <th className="p-2">Static AU</th>
                    <th className="p-2">Dynamic AU</th>
                  </tr>
                </thead>

                <tbody>
                  {skill.variants.map((v) => {
                    const dmg =
                      v.type === "static"
                        ? `${v.dmg.damagePerSecond} DPS`
                        : `${v.dmg.damagePerRep} DPR`;

                    const energy =
                      v.type === "static"
                        ? `${v.dmg.energyPerSecond} EPS`
                        : `${v.dmg.energyPerRep} EPR`;

                    return (
                      <tr
                        key={v.variantId}
                        className="border-b border-gray-800 hover:bg-neutral-800 duration-150"
                      >
                        <td className="p-2 font-medium">{v.variant}</td>
                        <td className="p-2">{dmg}</td>
                        <td className="p-2">{energy}</td>
                        <td className="p-2 text-blue-400 font-semibold">
                          {v.staticAU ?? 0}
                        </td>
                        <td className="p-2 text-purple-400 font-semibold">
                          {v.dynamicAU ?? 0}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SkillsStatsPage;
