// src/pages/Combos/ComboDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EditAndDeleteButton from "../../components/Buttons/EditAndDeleteButton";
import DeleteComboModal from "../../components/Modals/DeleteComboModal";

const ComboDetails = () => {
  const { username, comboId } = useParams();
  const { currentUser, viewedProfile, profileLoading, loadProfile } = useAuth();

  console.log(viewedProfile)

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (username) loadProfile(username);
  }, [username]);

  if (profileLoading)
    return <p className="text-white text-center mt-10">Cargando...</p>;

  if (!viewedProfile)
    return <p className="text-white text-center mt-10">Usuario no encontrado</p>;

  const user = viewedProfile;
  const isOwner = currentUser?.username === user.username;

  const combo = user.combos?.find((c) => c._id === comboId);

  console.log("Combo encontrado:", combo);

  if (!combo)
    return <p className="text-white text-center mt-10">Combo no encontrado.</p>;

  // 🧠 Normaliza un elemento del combo
  const normalizeComboElement = (el) => {
    const variant = el.userSkill.variants.find(v => v.variantKey === el.variantKey);

    return {
      skillName: el.skill.name,
      variantName: el.variantData.name,
      videoUrl: variant?.video || null,
      hold: el.hold || 0,
      energyPerRep: el.variantData.stats?.energyPerRep ?? 0,
    energyPerSecond: el.variantData.stats?.energyPerSecond ?? 0,
    pointsPerRep: el.variantData.stats?.pointsPerRep ?? 0,
    pointsPerSecond: el.variantData.stats?.pointsPerSecond ?? 0,
    };
  };

  const normalizedElements = combo.elements.map(normalizeComboElement);

  const confirmDelete = () => {
    console.log("Eliminar combo:", combo._id);
    setShowDeleteModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto text-white min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">{combo.name}</h1>

        {isOwner && (
          <EditAndDeleteButton
            editLink={`/profile/${username}/combos/${combo._id}/edit`}
            onDeleteClick={() => setShowDeleteModal(true)}
            className="px-2 rounded"
          />
        )}
      </div>

      {/* DETALLES DEL COMBO */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6">
        <p><strong>Tipo:</strong> {combo.type}</p>
        <p><strong>Total puntos:</strong> {combo.totalPoints}</p>
        <p><strong>Energía total:</strong> {combo.totalEnergyCost}</p>
        <p className="text-xs mt-4">
          Creado: {new Date(combo.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* SKILLS DEL COMBO */}
      <h2 className="text-2xl font-bold mb-2">Skills del Combo</h2>

      <div className="space-y-4">
        {normalizedElements.map((el, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20"
          >
            <h3 className="font-bold mb-2">{el.skillName} – {el.variantName}</h3>

            {el.videoUrl && (
              <video
                src={el.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-xl mb-3"
              />
            )}

            {el.hold > 0 && <p>⏱ Hold: {el.hold}s</p>}

            <div className="grid grid-cols-2 gap-2 text-sm mt-2">
              <p>⚡ Energía / Rep: {el.energyPerRep}</p>
              <p>⚡ Energía / Segundo: {el.energyPerSecond}</p>
              <p>🏅 Puntos / Rep: {el.pointsPerRep}</p>
              <p>🏅 Puntos / Segundo: {el.pointsPerSecond}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <DeleteComboModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        comboName={combo.name}
      />
    </div>
  );
};

export default ComboDetails;
