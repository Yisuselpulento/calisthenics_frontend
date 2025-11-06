import ProgressBar from "../components/ProgressBar";
import { users } from "../helpers/users";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const user = users.find((u) => u.username === username);

  if (!user) return <p className="text-white">Usuario no encontrado</p>;

  return (
    <div className="p-2 flex flex-col gap-4">
      <div className="relative flex gap-5 p-3 border-white border rounded-lg backdrop-blur-md bg-opacity-10 bg-white/10">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-34 h-34 rounded-full border-2 border-stone-950 object-cover"
        />
        <div >
          <div className="flex gap-3 items-center">
          <p className="text-xl mt-2">{user.name}</p>
          <p className="bg-purple-900 border border-purple-600 rounded-md px-1 text-xs absolute top-2 right-2 w-[70px]">{user.type}</p>
          </div>
          <div className="flex gap-2 text-xs">
            <p>Altura: {user.peso}</p>
            <p>Peso: {user.altura}</p>
          </div>
            <p className="mt-5 text-xs font-bold">AU : {user.level}</p>
            <ProgressBar level={user.level} />
        </div>
      </div>

      {/*favoriteSkill video*/}
      <div className="">
        {user.favoriteSkills?.length > 0 && (
        <div className="flex gap-3 justify-center">
          {user.favoriteSkills.map((video, index) => (
            <div
              key={index}
            >
              <video
                className="w-30 h-60 object-cover rounded-md"
                src={video.url}
                controls
                playsInline
              />
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Profile;