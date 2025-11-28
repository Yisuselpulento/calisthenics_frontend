import { useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { toggleFavoriteSkillService } from "../../Services/skillFetching";
import { useAuth } from "../../context/AuthContext";

const FavoriteToggleButton = ({ userSkillId, variantKey }) => {
  const { currentUser, updateCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!currentUser) return null;

  // Verifica si ESTA variante ya está en favoritos
  const isFavorite = currentUser.favoriteSkills?.some(
    (fav) =>
      fav.userSkill === userSkillId &&
      fav.variantKey === variantKey
  );

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await toggleFavoriteSkillService(userSkillId, variantKey);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      // Actualizar currentUser FAVORITES en el contexto
      updateCurrentUser({
        ...currentUser,
        favoriteSkills: res.favoriteSkills
      });

      toast.success(isFavorite ? "Eliminada de favoritos" : "Añadida a favoritos");
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
