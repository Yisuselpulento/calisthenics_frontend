import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar/NavBar";
import BottomNavbar from "../components/Navbar/BottomNavbar";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const location = useLocation();

  const { viewedProfile } = useAuth();

  const isProfilePage = location.pathname.startsWith("/profile/");
  const showVideo = isProfilePage && viewedProfile?.videoProfile;


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
