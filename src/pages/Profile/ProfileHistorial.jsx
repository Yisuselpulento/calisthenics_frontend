import { useParams } from "react-router-dom";
import { historial } from "../../helpers/historial";
import { users } from "../../helpers/users";
import { useAuth } from "../../context/AuthContext";
import HistorialCard from "../../components/Profile/HistorialCard";

const ProfileHistorial = () => {
  const { username } = useParams();
  const { currentUser } = useAuth();

  const user = users.find((u) => u.username === username);

  if (!user) {
    return (
      <div className="p-2 md:p-6">
        <p className="text-red-400">Usuario no encontrado.</p>
      </div>
    );
  }

  // ✔ Saber si está viendo su propio historial
  const isOwner = currentUser?.username === username;

  // 🔍 Filtrar batallas donde aparece el usuario
  const userHistorial = historial.filter(
    (h) => h.userId === user._id || h.opponentId === user._id
  );

  // 🔁 Ordenar por fecha descendente
  const sortedHistorial = [...userHistorial].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="p-2 md:p-6">
      <h2 className="text-xl font-bold text-white mb-4">
        Historial de Batallas
      </h2>

      {sortedHistorial.length > 0 ? (
        sortedHistorial.map((item) => (
          <HistorialCard key={item._id} item={item} users={users} />
        ))
      ) : (
        <p className="text-gray-400">
          {isOwner
            ? "Aún no tienes batallas registradas."
            : "Este usuario aún no tiene batallas registradas."}
        </p>
      )}
    </div>
  );
};

export default ProfileHistorial;
