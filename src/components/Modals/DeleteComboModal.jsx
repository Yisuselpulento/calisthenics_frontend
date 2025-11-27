
const DeleteComboModal = ({ isOpen, onCancel, onConfirm, comboName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-80 text-white">
        <h2 className="text-lg font-bold mb-4">Eliminar Combo</h2>
        <p className="mb-6">
          ¿Estás seguro que quieres eliminar <span className="font-semibold">{comboName}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-500 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteComboModal;
