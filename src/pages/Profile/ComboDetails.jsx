import { useParams } from "react-router-dom";
import { useState } from "react";
import { users } from "../../helpers/users";
import { calculateComboStats } from "../../helpers/skillUtils";
import EditAndDeleteButton from "../../components/Buttons/EditAndDeleteButton";
import ConfirmDeleteModal from "../../components/Modals/ConfirmDeleteModal";

const ComboDetails = () => {
  const { username, comboId } = useParams();

  const user = users.find((u) => u.username === username);
  const combo = user?.combos?.find((c) => c.comboId === comboId);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!user || !combo)
    return <p className="text-white text-center mt-10">Combo no encontrado.</p>;

  const { totalAura, totalEnergy, skills: processedSkills } =
    calculateComboStats(combo, user.skills);

  const confirmDelete = () => {
    console.log("Eliminar combo:", comboId);
    setShowDeleteModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto text-white min-h-screen">

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">{combo.comboName}</h1>

        <EditAndDeleteButton
          editLink={`/profile/${username}/combos/${combo.comboId}/edit`}
          onDeleteClick={() => setShowDeleteModal(true)}
          className="px-2 rounded"
        />
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6">
        <p><strong>Tipo:</strong> {combo.type}</p>
        <p><strong>Total Aura:</strong> {totalAura}</p>
        <p><strong>Energía total:</strong> {totalEnergy}</p>

        <p className="text-xs mt-4">
          Creado: {new Date(combo.createdAt).toLocaleDateString()}
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-2">Skills del Combo</h2>

      <div className="space-y-4">
        {processedSkills.map((skill, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20"
          >
            <h3 className="font-bold mb-2">
              {skill.skillName} – {skill.variantName}
            </h3>

            {skill.videoUrl && (
              <video
                src={skill.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-xl mb-3"
              />
            )}

           <div className="grid grid-cols-2 gap-2 text-sm">
              {skill.holdSeconds > 0 && (
                <p>⏱ Hold: {skill.holdSeconds}s</p>
              )}

              {skill.reps > 0 && (
                <p>🔁 Reps: {skill.reps}</p>
              )}

              <p>💫 Aura generada: {skill.damage}</p>
              <p>⚡ Energía usada: {skill.energy}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          isOpen={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default ComboDetails;
