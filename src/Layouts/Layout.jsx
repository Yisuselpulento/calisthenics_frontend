import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar/NavBar";
import { users } from "../helpers/users";

const Layout = () => {
  const location = useLocation();

  // Detecta si estamos en una página de perfil
  const isProfilePage = location.pathname.startsWith("/profile/");
  const username = location.pathname.split("/")[2];
  const user = users.find((u) => u.username === username);

  return (
    <>
      {/* 🎥 Video de fondo global */}
      {isProfilePage && user && (
        <div className="fixed inset-0 -z-10">
          {/* Video */}
          <video
            className="w-full h-full object-cover"
            src={user.videoProfile}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay negro */}
          <div   className="absolute inset-0"
               style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
        </div>
      )}

      {/* 🔝 Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <header>
          <NavBar />
        </header>

        <main className="grow">
          <Outlet />
        </main>

        <footer className="mt-20 bg-stone-950 text-white">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
