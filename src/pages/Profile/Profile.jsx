import { useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import { getLevelColor } from "../../helpers/getLevelColor";
import { tailwindColors } from "../../helpers/tailwindColor";
import { users } from "../../helpers/users";
import { Link, useParams } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";
import VsButton from "../../components/VsButton";


const Profile = () => {
  const { username } = useParams();
  const { currentUser } = useAuth();
  const user = users.find((u) => u.username === username);

  // 🔘 Estado para mostrar/ocultar estadísticas
  const [showMore, setShowMore] = useState(false);

  if (!user) return <p className="text-white">Usuario no encontrado</p>;

  const isCurrentUser = currentUser?._id === user._id;
  const color = getLevelColor(user.level);
  const bgColor = tailwindColors[color] || "#eab308";
  const borderColor = bgColor + "CC";

  return (
    <div className="p-2 flex flex-col gap-4 min-h-screen">
      <section className="relative flex gap-5 p-3 border-white border rounded-lg backdrop-blur-md">
        <img
          src={user.avatar}
          alt={user.name}
          className="aspect-square w-34 h-34 xs:w-20 xs:h-20 rounded-full border object-cover"
          style={{ borderColor: bgColor }}
        />

        <div className="w-full">
          {/* Nombre y tipo */}
          <div className="flex gap-3 items-center">
            <p className="text-xl mt-2">{user.name}</p>
            <p
               className={`rounded-md px-1 text-xs absolute top-2 right-2 border text-center ${
              bgColor === "#ffffff" ? "text-gray-800" : "text-white"
            }`}
              style={{
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
              }}
            >
              {user.type}
            </p>
          </div>

          {/* Peso y altura */}
          <div className="flex gap-2 text-xs">
            <p>Peso: {user.peso}</p>
            <p>Altura: {user.altura}</p>
          </div>

          {isCurrentUser && (
            <Link 
            to={`/profile/${user.username}/edit`}
            className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md transition">
              Upgrade
            </Link>
          )}

          {/* Barra principal y botón */}
          <div >
            <div className="flex items-center gap-2 mt-5">
              <p className="text-xs font-bold">AU : {user.level}</p>

              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="text-[10px] px-2 py-1 border rounded-md hover:bg-gray-700 transition-all"
              >
                {showMore ? <HiMiniEyeSlash /> : <IoEyeSharp />
}
              </button>
            </div>

            <ProgressBar level={user.level} maxLevel={18000} label="Main AU" />

            {/* Barras secundarias ocultables */}
            {showMore && (
              <div className="mt-1 flex flex-col animate-fadeIn">
                <ProgressBar
                  level={user.staticAu}
                  maxLevel={9000}
                  label="Static AU"
                />
                <ProgressBar
                  level={user.dynamicAu}
                  maxLevel={9000}
                  label="Dynamic AU"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Videos de habilidades favoritas */}
      {user.favoriteSkills?.length > 0 && (
        <section className="flex gap-3 justify-center">
          {user.favoriteSkills.map((video, index) => (
            <div key={index}>
              <video
                className="w-30 h-60 object-cover rounded-md"
                src={video.url}
                controls
                playsInline
              />
            </div>
          ))}
        </section>
      )}
      {!isCurrentUser && (
        <section className="flex items-center justify-center h-full mt-20">
          <VsButton opponent={user} />
        </section>
      )}
    </div>
  );
};

export default Profile;
