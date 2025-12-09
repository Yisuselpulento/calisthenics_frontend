import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { toggleFavoriteSkillService } from "../../Services/skillFetching";
import { useAuth } from "../../context/AuthContext";

const FavoriteToggleButton = ({ userSkillId, variantKey, fingers }) => {
  const { viewedProfile, updateViewedProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // 🔹 Determinar si la skill/variant está en favoritos
  useEffect(() => {
    if (!viewedProfile) return;

    const favorite = viewedProfile.favoriteSkills?.some((fav) => {
      const favId = fav.userSkill?._id || fav.userSkill; // soporta poblado o solo ObjectId
      return favId === userSkillId && fav.variantKey === variantKey;
    });

    setIsFavorite(favorite);
  }, [viewedProfile, userSkillId, variantKey]);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await toggleFavoriteSkillService(userSkillId, variantKey, fingers);

      if (!res.success) {
        toast.error(res.message);
        setLoading(false);
        return;
      }

      // 🔹 Actualizar estado local instantáneamente
      const nowFavorite = res.user.favoriteSkills?.some((fav) => {
        const favId = fav.userSkill?._id || fav.userSkill;
        return favId === userSkillId && fav.variantKey === variantKey;
      });
      setIsFavorite(nowFavorite);

      toast.success(nowFavorite ? "Añadida a favoritos" : "Eliminada de favoritos");

      // 🔹 Actualizar viewedProfile en el contexto
      updateViewedProfile(res.user);

    } catch (err) {
      console.error(err);
      toast.error("Error al cambiar favorito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`text-xl transition ${
        isFavorite ? "text-yellow-400" : "text-gray-400 hover:text-yellow-500"
      }`}
    >
      <FaStar />
    </button>
  );
};

export default FavoriteToggleButton;
