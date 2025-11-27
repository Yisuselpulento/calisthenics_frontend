import { Link } from "react-router-dom";
import EditAndDeleteButton from "../Buttons/EditAndDeleteButton";

const UserComboCard = ({ combo, username, isOwner, onDeleteClick }) => {
    
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:border-blue-500 transition-all">
      <h3 className="text-xl font-bold mb-2">{combo.comboName}</h3>

      <div className="text-sm space-y-1 mb-4">
        <p>
          <span className="font-semibold text-blue-300">Tipo:</span> {combo.type}
        </p>
        <p>
          <span className="font-semibold text-blue-300">Energía Total:</span> {combo.totalEnergyCost}
        </p>
      </div>

      <div className="flex justify-between">
        <Link
          to={`/profile/${username}/combos/${combo._id}`}
          className="bg-primary hover:bg-primary/80 cursor-pointer text-white text-sm px-3 py-1 rounded-lg"
        >
          Ver detalles
        </Link>

        {isOwner && (
          <EditAndDeleteButton
            editLink={`/profile/${username}/combos/${combo.comboId}/edit`}
            onDeleteClick={() => onDeleteClick(combo)}
            className="px-2 rounded"
          />
        )}
      </div>
    </div>
  );
};

export default UserComboCard;
