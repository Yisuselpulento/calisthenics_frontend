import { useEffect, useState } from "react";
import { getFeedEventsService } from "../Services/feedFetching.js";
import PostCard from "../components/Cards/PostCard";
import Spinner from "../components/Spinner/Spinner.jsx";

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

   if (loading)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size="3em" />
    </div>
  );

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
