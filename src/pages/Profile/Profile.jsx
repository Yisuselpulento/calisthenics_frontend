import { useState , useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import ProgressBar from "../../components/ProgressBar";
import { getLevelColor } from "../../helpers/getLevelColor";
import { tailwindColors } from "../../helpers/tailwindColor";
import VsButton from "../../components/VsButton";
import ButtonFollow from "../../components/Profile/ButtonFollow";
import ButtonConfigProfile from "../../components/Profile/ButtonConfigProfile";
import { createReportService } from "../../Services/reportsFetching";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";

const Profile = () => {
  const { username } = useParams();
  const { currentUser, viewedProfile, profileLoading, loadProfile, toggleFollow } = useAuth();

  const [loadingReport, setLoadingReport] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // 🔍 Cargar perfil cuando cambia el username
  useEffect(() => {
    loadProfile(username);
  }, [username]); 


  if (!viewedProfile)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size="2em" />
    </div>
  );

  const user = viewedProfile; // Alias para no cambiar todo el código
  const isCurrentUser = currentUser?._id === user._id;
  const isFollowing = currentUser?.following?.some(f => f._id === user._id);

  const color = getLevelColor(user);
  const bgColor = tailwindColors[color] || "#eab308";
  const borderColor = bgColor + "CC";

  const userTeam = user.teams && user.teams.length > 0 ? user.teams[0] : null;
  const showPesoAltura = (user.peso ?? 0) > 0 || (user.altura ?? 0) > 0;

    const handleReportSend = async (reasonValue) => {
      try {
        setLoadingReport(true);

        await createReportService({
          targetType: "User",   // 👈 la U debe ser mayúscula
          target: user._id,
          reason: reasonValue,  
          description: "",
        });

        toast.success("Reporte enviado correctamente");
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Error al enviar el reporte");
      } finally {
        setLoadingReport(false);
      }
    };


  return (
    <div className="p-2 flex flex-col gap-2 min-h-screen">
      {/* PERFIL */}
      <section className="relative flex gap-5 p-3 border-white border rounded-lg backdrop-blur-md">
        {!isCurrentUser && (
          <div className="absolute top-2 left-2 z-50">
            <ButtonConfigProfile
              isFollowing={isFollowing}
              onUnfollowConfirmed={() => toggleFollow({ _id: user._id })}
              onReportSend={handleReportSend} 
              loadingReport={loadingReport}
            />
          </div>
        )}

        <div className="relative w-34 h-34 xs:w-20 xs:h-20 shrink-0">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-full h-full object-cover rounded-full border"
            style={{ borderColor: bgColor }}
          />
          {!isCurrentUser && (
            <ButtonFollow
                targetUserId={user._id}
              />
          )}
        </div>

        <div className="w-full">
          <div className="flex gap-3 items-center relative">
            <p className="text-xl mt-2">{user.fullName}</p>
            <p
              className={`rounded-md px-1 text-xs absolute -top-1 -right-1 border text-center ${
                bgColor === "#ffffff" ? "text-gray-800" : "text-white"
              }`}
              style={{
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
              }}
            >
              {user.profileType}
            </p>
          </div>

          {showPesoAltura && (
            <div className="flex gap-2 text-xs">
              {user.peso != null && <p>Peso: {user.peso} kg</p>}
              {user.altura != null && <p>Altura: {user.altura} m</p>}
            </div>
          )}

          {isCurrentUser && (
            <Link
              to={`/profile/${user.username}/edit`}
              className="text-xs px-3 py-1 bg-primary hover:bg-primary/80 rounded-md transition"
            >
              Upgrade
            </Link>
          )}

          {/* AU */}
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold">AU: {user.stats?.mainAura || 0}</p>
              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="text-[10px] px-2 py-1 border rounded-md hover:bg-gray-700 transition-all"
              >
                {showMore ? <HiMiniEyeSlash /> : <IoEyeSharp />}
              </button>
            </div>

            <ProgressBar level={user.stats?.mainAura || 0} maxLevel={18000} label="Main AU" />

            {showMore && (
              <div className="mt-1 flex flex-col animate-fadeIn">
                <ProgressBar level={user.stats?.staticAura || 0} maxLevel={9000} label="Static AU" showPercent={false} />
                <ProgressBar level={user.stats?.dynamicAura || 0} maxLevel={9000} label="Dynamic AU" showPercent={false} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TEAM */}
      {userTeam && (
        <section className="flex justify-center items-center mt-3">
          <Link
            to={`/teams/${userTeam._id}`}
            className="flex flex-col items-center gap-2 w-full h-full"
          >
            <img
              src={userTeam.avatar}
              alt={userTeam.name}
              className="w-full h-[80px] object-cover rounded-lg border-[0.2px] border-gray-800 hover:opacity-90 transition"
            />
          </Link>
        </section>
      )}

      {/* FAVORITE SKILLS / VIDEOS */}
      {user.favoriteSkills?.length > 0 && (
        <section className="flex gap-3 justify-center mt-3">
          {user.favoriteSkills.map((fs, index) => (
            <div key={index}>
              <video
                className="w-30 h-60 object-cover rounded-md"
                src={fs.video || ""}
                controls
                playsInline
              />
            </div>
          ))}
        </section>
      )}

      {/* VS BUTTON */}
      {!isCurrentUser && (
        <section className="flex items-center justify-center h-full mt-3">
          <VsButton opponent={user} />
        </section>
      )}
    </div>
  );
};

export default Profile;
