import { activities } from "../helpers/activities";
import PostCard from "../components/Cards/PostCard";

const Home = () => {
  // Ordena las actividades más recientes
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="p-2 flex flex-col gap-4">
      {sortedActivities.length > 0 ? (
        sortedActivities.map((activity) => (
          <PostCard key={activity._id} activity={activity} />
        ))
      ) : (
        <p className="text-gray-400 text-center mt-20">
          No hay actividades recientes.
        </p>
      )}
    </div>
  );
};

export default Home;