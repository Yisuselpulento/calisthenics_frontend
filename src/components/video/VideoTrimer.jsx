/* import { useState } from "react";
import { trimVideo } from "../../helpers/videoTrimmer";

const VideoTrimmer = ({ file, src, onCancel, onConfirm }) => {
  const [start, setStart] = useState("0");
  const [end, setEnd] = useState("5")
  const [loading, setLoading] = useState(false);

  const handleTrim = async () => {
        if (Number(start) >= Number(end)) return;

        setLoading(true);
        try {
            const trimmedFile = await trimVideo({
            file,
            start: Number(start),
            end: Number(end),
            });
            onConfirm(trimmedFile);
        } catch (e) {
            alert("Error al procesar el video");
        } finally {
            setLoading(false);
        }
        };


  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-4 rounded-xl w-96">
        <h3 className="text-white mb-2 font-semibold">
          Recortar video
        </h3>

        <video
          src={src}
          controls
          className="w-full rounded-lg mb-3"
        />

        <div className="flex gap-2 mb-3">
         <input
                type="text"
                inputMode="numeric"
                value={start}
                onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                    setStart(e.target.value);
                    }
                }}
                className="w-full p-2 rounded bg-neutral-800 text-white"
                placeholder="Inicio (s)"
                />

                <input
                type="text"
                inputMode="numeric"
                value={end}
                onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                    setEnd(e.target.value);
                    }
                }}
                className="w-full p-2 rounded bg-neutral-800 text-white"
                placeholder="Fin (s)"
                />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="w-full py-2 rounded bg-neutral-700 hover:bg-neutral-600"
          >
            Cancelar
          </button>

          <button
            onClick={handleTrim}
            disabled={loading}
            className="w-full py-2 rounded bg-purple-600 hover:bg-purple-700"
          >
            {loading ? "Procesando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTrimmer;
 */