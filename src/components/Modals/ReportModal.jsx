import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ReportModal = ({ isOpen, onClose, onSend, loading, reasons }) => {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!isOpen) setReason("");
  }, [isOpen]);

  const handleSend = () => {
    if (!reason) return;
    onSend(reason);
    setReason("");
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      ></div>

      <div
        className="relative bg-stone-900 p-6 rounded-xl w-80 border border-stone-700 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4 text-white">Reportar usuario</h2>

        <div className="flex flex-col gap-3 text-white">
          {reasons.map((r) => (
            <label key={r.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="reason"
                value={r.value}
                checked={reason === r.value}
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
    </div>,
    document.body // 👈 el portal renderiza el modal al nivel del body
  );
};

export default ReportModal;