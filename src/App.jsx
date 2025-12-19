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
import EditAdvancedProfile from "./pages/Profile/EditAdvancedProfile";
import OwnerRoute from "./components/OwnerRoute";
import { SocketProvider } from "./context/SocketContext";
import CookieInfoBox from "./components/CookieInfoBox";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <AuthProvider>
        <SocketProvider>
              <ScrollToTop />
        {/*       <CookieInfoBox /> */}
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
                      
                      {/* Rutas solo accesibles por el dueño */}
                      <Route path="edit" element={
                        <OwnerRoute>
                          <EditProfile />
                        </OwnerRoute>
                      } />
                      <Route path="edit-advanced" element={
                        <OwnerRoute>
                          <EditAdvancedProfile />
                        </OwnerRoute>
                      } />

                      <Route path="skills/all-skills" element={<SkillsUser />} />
                      <Route path="skill/:userSkillVariantId" element={<SkillDetail />} />

                      <Route path="edit-skill/:userSkillVariantId" element={
                        <OwnerRoute>
                          <EditSkill />
                        </OwnerRoute>
                      } />
                      <Route path="add-skill" element={
                        <OwnerRoute>
                          <AddSkill />
                        </OwnerRoute>
                      } />

                      <Route path="friends" element={<UserFriendsPage />} />

                      <Route path="combos">
                          <Route
                            index
                            element={
                              <OwnerRoute>
                                <Combos />
                              </OwnerRoute>
                            }
                          />
                          <Route
                            path="add"
                            element={
                              <OwnerRoute>
                                <AddCombo />
                              </OwnerRoute>
                            }
                          />
                          <Route path=":comboId" element={<ComboDetails />} />
                          <Route
                            path=":comboId/edit"
                            element={
                              <OwnerRoute>
                                <EditCombo />
                              </OwnerRoute>
                            }
                          />
                        </Route>
                    </Route>

                  {/* Matches */}
                  <Route path="match/:matchId" element={<Match />} />
                </Route>

                {/* ❌ 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
