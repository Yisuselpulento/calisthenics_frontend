
const DeleteSkillVariantModal = ({ isOpen, onCancel, onConfirm, loading, skillName }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modalBackground" && !loading) onCancel();
  };

  return (
    <div
      id="modalBackground"
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-stone-900 border border-stone-700 p-5 rounded-lg w-full max-w-sm shadow-xl">
        <h2 className="text-white text-lg font-semibold mb-3">Eliminar Skill</h2>
        <p className="text-gray-300 text-sm mb-4">
          ¿Estás seguro de que deseas eliminar la skill "{skillName}"? Esta acción no se puede deshacer.
        </p>

        {loading && <p className="text-white text-sm mb-2">Eliminando...</p>}

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 bg-stone-800 rounded hover:bg-stone-700 transition text-sm disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-sm disabled:opacity-50"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSkillVariantModal;
