import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar/NavBar";
import BottomNavbar from "../components/Navbar/BottomNavbar";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import toast from "react-hot-toast";
import { doMatchService } from "../Services/matchFetching";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const socket = useSocket();
  const { viewedProfile } = useAuth();

  const isProfilePage = location.pathname.startsWith("/profile/");
  const showVideo = isProfilePage && viewedProfile?.videoProfile;

useEffect(() => {
  if (!socket) return;

  socket.on("challengeAccepted", async ({ challengeId, opponentId }) => {
  console.log("✅ Desafío aceptado, challengeId:", challengeId, "opponentId:", opponentId);

  try {
    if (!opponentId) throw new Error("Opponent ID no definido");

    const matchData = await doMatchService(opponentId, "static"); 
    navigate("/match", { state: { matchData } });
  } catch (err) {
    toast("No se pudo cargar el enfrentamiento");
  }
});

  // 👉 desafío rechazado
  socket.on("challengeRejected", ({ message }) => {
    toast(message || "Desafío rechazado");
  });

  return () => {
    socket.off("challengeAccepted");
    socket.off("challengeRejected");
  };
}, [socket, navigate, viewedProfile]);


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
          <div className="absolute inset-0 bg-black/70" />
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
