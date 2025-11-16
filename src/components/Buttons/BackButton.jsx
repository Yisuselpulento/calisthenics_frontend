import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="text-sm text-blue-500 hover:underline cursor-pointer"
    >
      ← Volver
    </button>
  );
};

export default BackButton;