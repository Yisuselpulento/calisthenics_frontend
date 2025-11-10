import { useState } from "react";
import { users } from "../helpers/users";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
   const { currentUser } = useAuth();

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    // Filtrar usuarios por nombre o username
      const filtered = users.filter(
      (u) =>
        u._id !== currentUser._id && // ⬅️ excluir al usuario actual
        (u.name.toLowerCase().includes(value) ||
          u.username.toLowerCase().includes(value))
    );

    setResults(filtered);
  };

  return (
    <div className="w-full max-w-sm min-w-[200px] relative">
      {/* Input */}
      <div className="relative">
        <input
          value={search}
          onChange={handleSearch}
          className="w-full bg-white/10 text-white placeholder:text-gray-400 text-sm border border-white/20 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-white/40 hover:border-white/30 shadow-sm focus:shadow-md backdrop-blur-md"
          placeholder="Buscar usuario..."
        />
      </div>

      {/* Resultados */}
      {results.length > 0 && (
        <div className="absolute mt-2 w-full bg-black/70 backdrop-blur-md border border-white/20 rounded-md shadow-lg z-50">
          {results.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              key={user._id}
              className="flex items-center gap-2 p-2 hover:bg-white/10 transition rounded-md"
              onClick={() => {
                setSearch("");
                setResults([]);
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-white/30"
              />
              <div>
                <p className="text-sm text-white">{user.name}</p>
                <p className="text-xs text-gray-400">@{user.username}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;