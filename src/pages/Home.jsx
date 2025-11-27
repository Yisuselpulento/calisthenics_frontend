import { useEffect, useState } from "react";
import { getFeedEventsService } from "../Services/feedFetching.js";
import PostCard from "../components/Cards/PostCard";

const Home = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeed = async () => {
      const res = await getFeedEventsService();

      if (res.success) {
        setFeed(res.data);
      } else {
        console.error(res.message);
      }

      setLoading(false);
    };

    loadFeed();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400 mt-20">Cargando feed...</p>;
  }

  return (
    <div className="p-2 flex flex-col gap-4">
      {feed.length > 0 ? (
        feed.map((event) => <PostCard key={event._id} activity={event} />)
      ) : (
        <p className="text-gray-400 text-center mt-20">
          No hay actividades recientes.
        </p>
      )}
    </div>
  );
};

export default Home;
