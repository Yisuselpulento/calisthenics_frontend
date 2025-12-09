import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DeleteSkillVariantModal from "../Modals/DeleteSkillVariantModal";
import toast from "react-hot-toast";
import { getVariantBgColor } from "../../helpers/colorTargetVariants";

const UserSkillCard = ({ skill, ownerUsername }) => {
  const { currentUser, removeVariant } = useAuth();
  const isOwner = currentUser?.username === ownerUsername;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!skill) return null;

  const { userSkillId, variantKey, name, fingers, staticAU, dynamicAU, difficulty } = skill;

 const handleConfirmDelete = async () => {
  setLoading(true);
  const res = await removeVariant(userSkillId, variantKey, fingers);

  if (res.success) {
    toast.success("Variante eliminada correctamente!");
    setShowModal(false);
  }
  setLoading(false);
};

  return (
    <>
      <div
          className={`border rounded-lg text-xs p-2 flex flex-col gap-1 transition ${
            getVariantBgColor(skill.difficulty) // <- color según difficulty
          }`}
        >
        <Link to={`/profile/${ownerUsername}/skill/${userSkillId}/${variantKey}/${fingers}`} className="flex-1">
          <h3 className="font-semibold text-white">{name}</h3>
          <p className="text-gray-200">AU estático: <span className="font-medium text-green-400">{staticAU}</span></p>
          <p className="text-gray-200">AU dinámico: <span className="font-medium text-yellow-400">{dynamicAU}</span></p>
        </Link>

        {isOwner && (
          <button
            onClick={() => setShowModal(true)}
            disabled={loading}
            className="p-0.5 text-xs rounded w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Eliminar
          </button>
        )}
      </div>

      <DeleteSkillVariantModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
        skillName={name}
      />
    </>
  );
};

export default UserSkillCard;
