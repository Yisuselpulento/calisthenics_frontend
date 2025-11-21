import React from "react";

const ReportSkillUserModal = ({ isOpen, onClose, onSend }) => {
  if (!isOpen) return null;

  const [reason, setReason] = React.useState("");

  const handleSend = () => {
    if (!reason.trim()) return;
    onSend(reason);
    setReason("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-stone-900 p-6 rounded-xl w-80 border border-stone-700 shadow-lg">

        <h2 className="text-lg font-semibold mb-4 text-white">
          Reportar skill de usuario
        </h2>

        <div className="flex flex-col gap-3 text-white">

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="reason"
              value="No es la skill correcta"
              onChange={(e) => setReason(e.target.value)}
              className="accent-red-500"
            />
            No es la skill correcta
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="reason"
              value="Contenido sexual"
              onChange={(e) => setReason(e.target.value)}
              className="accent-red-500"
            />
            Contenido sexual
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="reason"
              value="Este usuario no es quien dice ser"
              onChange={(e) => setReason(e.target.value)}
              className="accent-red-500"
            />
            Este usuario no es quien dice ser
          </label>

        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-stone-700 hover:bg-stone-600 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleSend}
            disabled={!reason}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition disabled:bg-red-900 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportSkillUserModal;
