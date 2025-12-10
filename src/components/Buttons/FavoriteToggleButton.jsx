import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { toggleFavoriteSkillService } from "../../Services/skillFetching";
import { useAuth } from "../../context/AuthContext";

const FavoriteToggleButton = ( {userSkillVariantId} ) => {
  const { viewedProfile, updateViewedProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  console.log(viewedProfile)

  // 🔹 Determinar si la variante está en favoritos usando solo userSkillVariantId
  useEffect(() => {
    if (!viewedProfile) return;

    const favorite = viewedProfile.favoriteSkills?.some(
      (fav) => fav.userSkillVariantId === userSkillVariantId
    );
    console.log(favorite)

    setIsFavorite(favorite);
  }, [viewedProfile, userSkillVariantId]);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // 🔹 Solo pasamos userSkillVariantId
      const res = await toggleFavoriteSkillService(userSkillVariantId);

      if (!res.success) {
        toast.error(res.message);
        setLoading(false);
        return;
      }

      // 🔹 Actualizar estado local instantáneamente
      const nowFavorite = res.user.favoriteSkills?.some(
        (fav) => fav.userSkillVariantId === userSkillVariantId
      );
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
