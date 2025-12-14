import { useEffect } from "react";

const ImageLightbox = ({ src, alt = "", isOpen, onClose }) => {
  // Cerrar con ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
    >
      {/* Imagen */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[100vw] max-h-[100vh] object-contain rounded-lg shadow-2xl"
      />

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl hover:scale-110 transition"
      >
        ×
      </button>
    </div>
  );
};

export default ImageLightbox;
