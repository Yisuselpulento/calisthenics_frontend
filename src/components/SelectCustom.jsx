import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function SelectCustom({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Cerrar cuando se hace clic afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      {/* Botón principal */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="
          w-full bg-black/40 backdrop-blur-md 
          text-white text-sm border border-white/20 
          hover:border-white/40 focus:border-white/40 
          px-3 py-2 rounded-md flex items-center justify-between
          transition shadow-sm focus:shadow-md
        "
      >
        {options.find((o) => o.value === value)?.label || "Seleccionar"}
        <IoChevronDown
          className={`transition duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute left-0 top-full mt-2 w-full
            bg-black/70 backdrop-blur-md border border-white/20 
            rounded-md shadow-lg z-50
            animate-fadeIn
          "
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {options.map((op) => (
            <button
              key={op.value}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange(op.value);
                setOpen(false);
              }}
              className="
                w-full text-left px-3 py-2 text-sm 
                text-white hover:bg-white/10 rounded-md transition
              "
            >
              {op.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
