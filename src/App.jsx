import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound";
import ProfileSkills from "./pages/Profile/ProfileSkills";
import ProfileHistorial from "./pages/Profile/ProfileHistorial";
import ProfileLayout from "./Layouts/ProfileLayout";
import Match from "./pages/Match";
import EditProfile from "./pages/Profile/EditProfile";
import AddSkill from "./pages/Profile/AddSkill";
import { AuthProvider } from "./context/AuthContext";
import Combos from "./pages/Profile/Combos";
import ComboDetails from "./pages/Profile/ComboDetails";
import EditCombo from "./pages/Profile/EditCombo";
import CombosLayout from "./Layouts/CombosLayout";
import AddCombo from "./pages/Profile/AddCombo";
import VsDetails from "./pages/VsDetails";
import Ranks from "./pages/Ranks/Ranks";
import Notifications from "./pages/Notifications";
import SkillsStatsPage from "./pages/SkillStatsPage";
import TeamPage from "./pages/Teampage";
import CreateTeamPage from "./pages/Teams/CreateTeamPage";
import SkillsUser from "./pages/Profile/SkillsUser";
import SkillDetail from "./pages/Profile/SkillDetail";
import EditSkill from "./pages/Profile/EditSkill";
import UserFriendsPage from "./pages/Profile/UserFriendsPage";

// 🔐 Auth Pages
import Login from "./pages/AuthPages/Login";
import SignUp from "./pages/AuthPages/SignUp";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import EmailVerification from "./pages/AuthPages/EmailVerification";
import UpdatePassword from "./pages/AuthPages/UpdatePassword";

// Middleware
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <AuthProvider>
        <ScrollToTop />

        <Routes>
          {/* 🔓 RUTAS PÚBLICAS (solo sin sesión) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />

          <Route
            path="/verify-email"
            element={
              <PublicRoute>
                <EmailVerification />
              </PublicRoute>
            }
          />

          <Route
            path="/update-password"
            element={
              <PublicRoute>
                <UpdatePassword />
              </PublicRoute>
            }
          />

          {/* 🔒 RUTAS PROTEGIDAS */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* --- Home --- */}
            <Route index element={<Home />} />

            {/* --- Otras páginas generales --- */}
            <Route path="/skills-stats" element={<SkillsStatsPage />} />
            <Route path="/vs/:matchId" element={<VsDetails />} />
            <Route path="/teams/:teamId" element={<TeamPage />} />
            <Route path="/teams/create" element={<CreateTeamPage />} />
            <Route path="/ranks" element={<Ranks />} />
            <Route path="/notifications" element={<Notifications />} />

            {/* --- Perfil --- */}
            <Route path="profile/:username" element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="skills" element={<ProfileSkills />} />
              <Route path="historial" element={<ProfileHistorial />} />
              <Route path="edit" element={<EditProfile />} />

              <Route path="skills/all-skills" element={<SkillsUser />} />
              <Route path="skills/:variantId" element={<SkillDetail />} />

              <Route path="edit-skill/:variantId" element={<EditSkill />} />
              <Route path="add-skill" element={<AddSkill />} />

              <Route path="friends" element={<UserFriendsPage />} />

              {/* Combos */}
              <Route path="combos" element={<CombosLayout />}>
                <Route index element={<Combos />} />
                <Route path="add" element={<AddCombo />} />
                <Route path=":comboId" element={<ComboDetails />} />
                <Route path=":comboId/edit" element={<EditCombo />} />
              </Route>
            </Route>

            {/* Matches */}
            <Route path="match/:matchId" element={<Match />} />
          </Route>

          {/* ❌ 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
