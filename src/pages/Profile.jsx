import ProgressBar from "../components/ProgressBar";
import { getLevelColor } from "../helpers/getLevelColor";
import { tailwindColors } from "../helpers/tailwindColor";
import { users } from "../helpers/users";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const user = users.find((u) => u.username === username);

  if (!user) return <p className="text-white">Usuario no encontrado</p>;

  const color = getLevelColor(user.level);
  const bgColor = tailwindColors[color] || "#eab308";
  const borderColor = bgColor + "CC";

  return (
    <div className="p-2 flex flex-col gap-4 min-h-screen">
      <div
        className="relative flex gap-5 p-3 border-white border rounded-lg backdrop-blur-md"   
      >
        <img
          src={user.avatar}
          alt={user.name}
          className={`w-34 h-34 rounded-full border object-cover`}
          style={{ borderColor: bgColor }}
        />
        <div >
          <div className="flex gap-3 items-center">
          <p className="text-xl mt-2">{user.name}</p>
          <p
            className="rounded-md px-1 text-xs absolute top-2 right-2 border text-center"
            style={{
              backgroundColor: bgColor,
              border: `1px solid ${borderColor}`,
            }}
          >{user.type}</p>
          </div>
          <div className="flex gap-2 text-xs">
            <p>Peso: {user.peso}</p>
            <p>Altura: {user.altura}</p>
          </div>
          <div>
              <p className="mt-5 text-xs font-bold">AU : {user.level}</p>
              <ProgressBar level={user.level} maxLevel={18000} label="Main AU" />
          </div>
          <div>
              <div className="flex gap-2 items-center">
                <ProgressBar level={user.staticAu} maxLevel={9000} label="Static AU" />
              </div>
              <div className="flex gap-2 items-center">
                <ProgressBar level={user.dynamicAu} maxLevel={9000} label="Dynamic AU" />
              </div>
          </div>
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