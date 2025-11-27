/* import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { users } from "../../helpers/users";
import { skills as baseSkills } from "../../helpers/skills";
import BackButton from "../../components/Buttons/BackButton";
import ButtonSubmit from "../../components/Buttons/ButtonSubmit"; */

const EditSkill = () => {
 /*  const { username, variantId } = useParams();
  const navigate = useNavigate();

  const user = users.find((u) => u.username === username);
  const skill = user?.skills?.find((s) => s.variantId === variantId);

  if (!user || !skill)
    return <p className="text-white text-center mt-10">Skill no encontrada</p>;

  // Buscar el nombre real de la variant desde helpers/skills
  const baseSkill = baseSkills.find((s) =>
    s.variants.some((v) => v.variantId === variantId)
  );

  const variantData = baseSkill?.variants.find(
    (v) => v.variantId === variantId
  );

  const variantName = variantData?.variant || "Nombre desconocido";

  const [form, setForm] = useState({
    videoUrl: skill.videoUrl || "",
    fingersUsed: skill.fingersUsed || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    skill.videoUrl = form.videoUrl;
    skill.fingersUsed = form.fingersUsed;

    alert("Skill actualizada");
    navigate(-1);
  };
 */
  return (
    <div className="p-2 max-w-xl mx-auto text-white min-h-screen">
    {/*   <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Editar Skill</h1>
        <BackButton />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-5 backdrop-blur-md border border-white/20 rounded-2xl space-y-5"
      >
     
        <div>
          <p className="font-bold text-lg">{variantName}</p>
        </div>

   
        <div>
          <label className="block mb-1 font-semibold">URL del video</label>
          <input
            type="text"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            className="w-full bg-black/30 border border-gray-700 p-2 rounded-lg"
            placeholder="https://..."
          />
        </div>

      
        <div>
          <label className="block mb-1 font-semibold">Fingers Used</label>
          <input
            type="text"
            value={form.fingersUsed}
            onChange={(e) => setForm({ ...form, fingersUsed: e.target.value })}
            className="w-full bg-black/30 border border-gray-700 p-2 rounded-lg"
            placeholder="Ej: 3-4 / 2-3-4 ..."
          />
        </div>

        <ButtonSubmit type="submit">Guardar cambios</ButtonSubmit>
      </form> */}
    </div>
  );
};

export default EditSkill;
