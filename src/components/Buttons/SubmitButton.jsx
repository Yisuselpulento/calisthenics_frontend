const SubmitButton = ({ loading, text }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-primary hover:bg-primary/80 text-white p-2 rounded-md disabled:opacity-50"
    >
      {loading ? "Cargando..." : text}
    </button>
  );
};

export default SubmitButton;
