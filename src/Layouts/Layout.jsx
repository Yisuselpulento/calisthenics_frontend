import { Outlet, useLocation , useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar/NavBar";
import BottomNavbar from "../components/Navbar/BottomNavbar";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  const { viewedProfile } = useAuth(); 
  const navigate = useNavigate();
  const socket = useSocket();

  const isProfilePage = location.pathname.startsWith("/profile/");

  const showVideo = isProfilePage && viewedProfile?.videoProfile;

  useEffect(() => {
    if (!socket) return;

    // Recibir desafío
    socket.on("incomingChallenge", ({ challengeId, fromUserId, type }) => {
      const accepted = window.confirm(
        `Usuario ${fromUserId} te desafía en ${type}. ¿Aceptar?`
      );

      socket.emit("challengeResponse", { challengeId, accepted });
    });

    // Desafío aceptado → ir al match
    socket.on("challengeAccepted", (matchData) => {
  navigate("/match", { state: { matchData } });
});

    // Desafío rechazado
    socket.on("challengeRejected", ({ message }) => {
      alert(message);
    });

    return () => {
      socket.off("incomingChallenge");
      socket.off("challengeAccepted");
      socket.off("challengeRejected");
    };
  }, [socket, navigate]);

  return (
    <>
      {showVideo && (
        <div className="fixed inset-0 -z-10">
          <video
            className="w-full h-full object-cover"
            src={viewedProfile.videoProfile}
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
