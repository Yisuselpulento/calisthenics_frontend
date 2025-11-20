import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { skills } from "../../helpers/skills";
import EditAndDeleteButton from "../Buttons/EditAndDeleteButton";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";

const UserSkillCard = ({ skill, ownerUsername, onDelete }) => {
  const { currentUser } = useAuth();
  const isOwner = currentUser?.username === ownerUsername;

  const [showModal, setShowModal] = useState(false);

  // Buscar skill global
  const globalSkill = skills.find((s) => s.skillId === skill.skillId);

  // Buscar variante
  const variant = globalSkill?.variants.find(
    (v) => v.variantId === skill.variantId
  );

  if (!variant) {
    return (
      <div className="bg-stone-900 p-2 border border-red-700 rounded-lg">
        <p className="text-red-400 text-sm">❌ Error: skill no encontrada.</p>
      </div>
    );
  }

  const handleConfirmDelete = () => {
    onDelete(skill.variantId);
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-stone-900 border border-stone-700 rounded-lg text-xs p-2 flex flex-col gap-1 hover:bg-stone-800 transition text-sm">

        {/* Card clickable */}
        <Link
          to={`/profile/${ownerUsername}/skills/${skill.skillId}/${skill.variantId}`}
          className="flex-1"
        >
          <h3 className="font-semibold">{variant.variant}</h3>

          <p className="text-gray-300">
            AU estático:{" "}
            <span className="font-medium text-green-400">
              {variant.staticAU}
            </span>
          </p>

          <p className="text-gray-300">
            AU dinámico:{" "}
            <span className="font-medium text-yellow-400">
              {variant.dynamicAU}
            </span>
          </p>
        </Link>

        {/* Botones solo para el dueño */}
        {isOwner && (
          <EditAndDeleteButton
                className="p-0.5 text-xs rounded w-full flex items-center justify-center"
                editLink={`/profile/${ownerUsername}/edit-skill/${skill.variantId}`}
                onDeleteClick={() => setShowModal(true)}
                />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <ConfirmDeleteModal
          isOpen={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default UserSkillCard;
