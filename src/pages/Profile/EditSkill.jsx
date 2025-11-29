import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "../../components/Buttons/BackButton";
import { useAuth } from "../../context/AuthContext";
import { getUserVariants } from "../../helpers/getUserVariants";
import { editSkillVariantService } from "../../Services/skillFetching";
import toast from "react-hot-toast";

const EditSkill = () => {
  const { username, variantKey, fingers } = useParams();
  const navigate = useNavigate();
  const { viewedProfile, profileLoading } = useAuth();

  // 🔥 LOG 1: params recibidos
  console.log("🔹 Params recibidos:", { username, variantKey, fingers });

  const user = viewedProfile;

  // 🔥 LOG 2: perfil crudo recibido
  console.log("🔹 ViewedProfile crudo:", user);

  // 1️⃣ Aplanar variantes
  const userVariants = user?.skills ? getUserVariants(user.skills) : [];

  // 🔥 LOG 3: variantes generadas
  console.log("🔹 Variantes planas generadas:", userVariants);

  // 2️⃣ Buscar variante por params
  const variant = userVariants.find(
    (v) =>
      v.variantKey === variantKey &&
      Number(v.fingers) === Number(fingers)
  );

  // 🔥 LOG 4: resultado de la búsqueda de variante
  console.log("🔹 Variante encontrada:", variant);

  // 🔥 LOG 5: estado de loading
  console.log("🔹 profileLoading:", profileLoading);

  // 🔥 LOG 6: si user es null
  if (!user) console.log("⛔ El perfil es NULL antes del render");

  // 3️⃣ Loading o errores
  if (profileLoading) return <p className="text-white">Cargando...</p>;
  if (!user) return <p className="text-white">Perfil no encontrado</p>;
  if (!variant) return <p className="text-white">Variante no encontrada</p>;

  return (
    <div className="p-2 max-w-xl mx-auto text-white min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Editar variante</h1>
        <BackButton />
      </div>

      {/* 4️⃣ MOSTRAR LA VARIANTE */}
      <div className="bg-white/10 p-5 border border-white/20 rounded-xl space-y-4">
        <h2 className="text-lg font-bold">{variant.name}</h2>

        <p className="text-sm text-gray-300">
          <span className="font-semibold">Skill base:</span> {variant.skillName}
        </p>

        <p className="text-sm text-gray-300">
          <span className="font-semibold">Variant Key:</span> {variant.variantKey}
        </p>

        <p className="text-sm text-gray-300">
          <span className="font-semibold">Fingers:</span> {variant.fingers}
        </p>

        {variant.video && (
          <video
            src={variant.video}
            className="rounded-lg w-full mt-3"
            controls
          />
        )}
      </div>
    </div>
  );
};

export default EditSkill;
