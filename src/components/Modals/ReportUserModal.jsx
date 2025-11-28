import reasons from "../../helpers/reportsOptions.js";
import { useState, useEffect } from "react";

const ReportUserModal = ({ isOpen, onClose, onSend, loading }) => {
  const [reason, setReason] = useState("");

  // Limpiar razón cuando se abre o cierra el modal
  useEffect(() => {
    if (!isOpen) setReason("");
  }, [isOpen]);

  const handleSend = () => {
    if (!reason) return; // no hacer nada si no hay selección
    onSend(reason);       // enviar la razón seleccionada al padre
    setReason("");        // limpiar selección
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center min-h-screen z-50">
      <div className="bg-stone-900 p-6 rounded-xl w-80 border border-stone-700 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Reportar usuario
        </h2>

        <div className="flex flex-col gap-3 text-white">
          {reasons.map((r) => (
            <label key={r.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="reason"
                value={r.value}
                checked={reason === r.value} // marcar el radio seleccionado
                onChange={(e) => setReason(e.target.value)}
                className="accent-red-500"
                disabled={loading}
              />
              {r.label}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded bg-stone-700 hover:bg-stone-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>

          <button
            onClick={handleSend}
            disabled={!reason || loading}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition disabled:bg-red-900 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportUserModal;
