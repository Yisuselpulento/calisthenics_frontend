const SubmitButton = ({ loading, text, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`bg-primary hover:bg-primary/80 text-white p-2 rounded-md disabled:opacity-50 transition ${className}`}
    >
      {loading ? "Cargando..." : text}
    </button>
  );
};

export default SubmitButton;