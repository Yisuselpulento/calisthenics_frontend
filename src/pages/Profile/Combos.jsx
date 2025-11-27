/* import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { users } from "../../helpers/users";
import { calculateComboStats } from "../../helpers/skillUtils";
import EditAndDeleteButton from "../../components/Buttons/EditAndDeleteButton";
import ConfirmDeleteModal from "../../components/Modals/ConfirmDeleteModal"; */

const Combos = () => {
/*   const { username } = useParams();
  const user = users.find((u) => u.username === username);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [comboToDelete, setComboToDelete] = useState(null);

  if (!user)
    return <p className="text-white text-center mt-10">Usuario no encontrado</p>;

  const combos = user.combos || [];

  const handleDeleteClick = (comboId) => {
    setComboToDelete(comboId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Eliminar combo:", comboToDelete);
    setShowDeleteModal(false);
  }; */

  return (
    <div className="max-w-5xl mx-auto text-white min-h-screen">
   {/*    <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Tus Combos</h1>
        <Link
          to={`/profile/${username}/combos/add`}
          className="px-3 py-1 text-sm bg-primary hover:bg-primary/80 cursor-pointer rounded-md transition"
        >
          + Combo
        </Link>
      </div>

      {combos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {combos.map((combo) => {
            const { totalAura, totalEnergy } = calculateComboStats(combo);

            return (
              <div
                key={combo.comboId}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:border-blue-500 transition-all"
              >
                <h3 className="text-xl font-bold mb-2">{combo.comboName}</h3>

                <div className="text-sm space-y-1 mb-4">
                  <p>
                    <span className="font-semibold text-blue-300">Tipo:</span>{" "}
                    {combo.type}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-300">Total Aura:</span>{" "}
                    {totalAura}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-300">Energía:</span>{" "}
                    {totalEnergy}
                  </p>
                </div>

                <div className="flex justify-between">
                  <Link
                    to={`/profile/${username}/combos/${combo.comboId}`}
                    className="bg-primary hover:bg-primary/80 cursor-pointer text-white text-sm px-3 py-1 rounded-lg"
                  >
                    Ver detalles
                  </Link>

                  <EditAndDeleteButton
                    editLink={`/profile/${username}/combos/${combo.comboId}/edit`}
                    onDeleteClick={() => handleDeleteClick(combo.comboId)}
                    className="px-2 rounded"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 italic text-center">
          Aún no has creado combos.
        </p>
      )}

     
      {showDeleteModal && (
        <ConfirmDeleteModal
          isOpen={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )} */}
    </div>
  );
};

export default Combos;
