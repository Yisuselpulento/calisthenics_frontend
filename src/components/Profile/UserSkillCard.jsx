import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DeleteSkillVariantModal from "../Modals/DeleteSkillVariantModal";
import toast from "react-hot-toast";
import { getVariantBgColor } from "../../helpers/colorTargetVariants";
import {deleteSkillVariantService } from "../../Services/skillFetching.js"

const UserSkillCard = ({ skill, ownerUsername }) => {
  const { currentUser,updateViewedProfile } = useAuth();
  const isOwner = currentUser?.username === ownerUsername;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!skill) return null;

  const {  name,  staticAU, dynamicAU, difficulty, userSkillVariantId, fingers  } = skill;

 const handleConfirmDelete = async () => {
  setLoading(true);

  try {
    const res = await deleteSkillVariantService(userSkillVariantId);
    if (!res.success) {
      toast.error(res.message || "No se pudo eliminar la variante.");
      setLoading(false);
      return;
    }
    toast.success("Skill eliminada correctamente!");
    updateViewedProfile(res.user);
    setShowModal(false);

  } catch (err) {
    toast.error("Error eliminando la variante.");
  }

  setLoading(false);
};

  return (
    <>
      <div
          className={`border rounded-lg text-xs p-2 flex flex-col gap-1 transition ${
            getVariantBgColor(difficulty) // <- color según difficulty
          }`}
        >
        <Link to={`/profile/${ownerUsername}/skill/${userSkillVariantId}`} className="flex-1">
           {name} <span className="text-gray-300">({fingers})</span>
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
