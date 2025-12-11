import { useState } from "react";
import { toggleFavoriteComboService } from "../../Services/comboFetching";
import { FaStar, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const FavoriteComboStar = ({ comboId, type }) => {
  const { viewedProfile, updateViewedProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!viewedProfile) return null;

  // Verificar si este combo YA es favorito en el perfil cargado
  const isFavorite =
    viewedProfile.favoriteCombos?.[type] &&
    String(viewedProfile.favoriteCombos[type]) === String(comboId);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);

    const res = await toggleFavoriteComboService(comboId, type);
    if (res.success) {
      toast.success("Favorito actualizado");

      // Actualizar el viewedProfile con los nuevos datos
      updateViewedProfile(res.user);
    } else {
      toast.error(res.message || "Error al actualizar favorito");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="text-yellow-400 text-2xl ml-2"
    >
      {isFavorite ? <FaStar /> : <FaRegStar />}
    </button>
  );
};

export default FavoriteComboStar;
