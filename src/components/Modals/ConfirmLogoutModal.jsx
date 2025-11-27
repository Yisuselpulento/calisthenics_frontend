 const ConfirmLogoutModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-900 border border-stone-700 p-5 rounded-lg w-full max-w-sm shadow-xl">
        <h2 className="text-white text-lg font-semibold mb-3">Cerrar sesión</h2>

        <p className="text-gray-300 text-sm mb-4">
          ¿Estás seguro que deseas cerrar sesión?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-stone-800 rounded hover:bg-stone-700 transition text-sm"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
 