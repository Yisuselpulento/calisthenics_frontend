import { Link } from "react-router-dom";

const EditAndDeleteButton = ({
  editLink,
  onDeleteClick,
  className = ""
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>

      {/* EDITAR (siempre Link) */}
      <Link
        to={editLink}
        className={`${className} bg-yellow-500` }
      >
        Editar
      </Link>

      {/* ELIMINAR */}
      <button
        onClick={onDeleteClick}
        className={`${className} bg-red-500` }
      >
        Eliminar
      </button>

    </div>
  );
};

export default EditAndDeleteButton;
