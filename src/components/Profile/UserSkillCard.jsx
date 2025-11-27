import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EditAndDeleteButton from "../Buttons/EditAndDeleteButton";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";

const UserSkillCard = ({ skill, ownerUsername, onDelete }) => {
  const { currentUser } = useAuth();
  const isOwner = currentUser?.username === ownerUsername;
  const [showModal, setShowModal] = useState(false);

  if (!skill) return null;

  const {
    variantKey,
    name,
    skillName,
    fingers,
    type,
    stats,
    staticAU,
    dynamicAU,
    video,
  } = skill;

  const handleConfirmDelete = () => {
    onDelete(variantKey);
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-stone-900 border border-stone-700 rounded-lg text-xs p-2 flex flex-col gap-1 hover:bg-stone-800 transition text-sm">

        {/* Card clickable */}
        <Link
          to={`/profile/${ownerUsername}/skills/${variantKey}`}
          className="flex-1"
        >
          <h3 className="font-semibold text-white">{name}</h3>
          <p className="text-gray-300">
            AU estático:{" "}
            <span className="font-medium text-green-400">{staticAU}</span>
          </p>
          <p className="text-gray-300">
            AU dinámico:{" "}
            <span className="font-medium text-yellow-400">{dynamicAU}</span>
          </p>
        </Link>

        {/* Botones solo para el dueño */}
        {isOwner && (
          <EditAndDeleteButton
            className="p-0.5 text-xs rounded w-full flex items-center justify-center"
            editLink={`/profile/${ownerUsername}/edit-skill/${variantKey}`}
            onDeleteClick={() => setShowModal(true)}
          />
        )}
      </div>

      {/* Modal de confirmación */}
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
