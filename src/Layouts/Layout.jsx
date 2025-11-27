import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar/NavBar";
import BottomNavbar from "../components/Navbar/BottomNavbar";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  // Detecta si estamos en una página de perfil
  const isProfilePage = location.pathname.startsWith("/profile/");
  const username = location.pathname.split("/")[2];

  // Solo mostramos el video si es la página del usuario logueado
  const showVideo = isProfilePage && currentUser?.username === username;

  return (
    <>
      {/* 🎥 Video de fondo global */}
      {showVideo && currentUser?.videoProfile && (
        <div className="fixed inset-0 -z-10">
          <video
            className="w-full h-full object-cover"
            src={currentUser.videoProfile}
            autoPlay
            loop
            muted
            playsInline
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          />
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

        <BottomNavbar />

        <footer className="mt-20 bg-stone-950 text-white">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
