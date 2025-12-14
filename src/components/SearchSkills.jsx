import { useState } from "react";

const SearchSkills = ({ onSearchChange, onTypeFilterChange }) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
    onTypeFilterChange(value);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Buscar por nombre de variante..."
        className="w-full sm:w-2/3 p-2 rounded-lg border border-neutral-700 bg-neutral-900 text-white"
      />
      <select
        value={type}
        onChange={handleTypeChange}
        className="w-full sm:w-1/3 p-2 rounded-lg border border-neutral-700 bg-neutral-900 text-white"
      >
        <option value="">Todos los tipos</option>
        <option value="static">Static</option>
        <option value="dynamic">Dynamic</option>
        <option value="basic">Basic</option>
      </select>
    </div>
  );
};

export default SearchSkills;
