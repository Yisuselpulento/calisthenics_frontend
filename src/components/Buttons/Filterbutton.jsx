
const FilterButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 px-3 border border-neutral-700 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition flex items-center gap-2"
    >
      Filtros
    </button>
  );
};

export default FilterButton;
