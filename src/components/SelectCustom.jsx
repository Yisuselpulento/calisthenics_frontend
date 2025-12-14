const SelectCustom = ({ label, value, onChange, options }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            appearance-none
            bg-stone-900
            text-white
            border
            border-gray-300
            rounded-lg
            px-4
            py-1.5
            focus:outline-none
            focus:ring
            focus:ring-primary
            focus:border-primary
            cursor-pointer
          "
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* flecha */}
        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
          ▼
        </div>
      </div>
    </div>
  );
};

export default SelectCustom;
