import { Outlet, NavLink, useParams } from "react-router-dom";

const ProfileLayout = () => {
  const { username } = useParams();

  const linkClass = ({ isActive }) =>
    `flex-1 text-center py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-yellow-400 border-b-2 border-yellow-400"
        : "text-gray-400 hover:text-gray-200"
    }`;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🔹 Navbar interna */}
      <div className="flex border-b border-gray-700 bg-black/40 backdrop-blur-md sticky top-0 z-10">
        <NavLink to={`/profile/${username}`} end className={linkClass}>
          Perfil
        </NavLink>
        <NavLink to={`/profile/${username}/skills`} className={linkClass}>
          Skills
        </NavLink>
        <NavLink to={`/profile/${username}/historial`} className={linkClass}>
          Historial
        </NavLink>
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;