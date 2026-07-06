import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Estructura (se necesita de inmediato → eager)
import Layout from "./Layouts/Layout";
import ProfileLayout from "./Layouts/ProfileLayout";
import ScrollToTop from "./components/ScrollToTop";
import Spinner from "./components/Spinner/Spinner";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { RankedSocketProvider } from "./context/RankedSocketContext";
import { CasualSocketProvider } from "./context/CasualSocketContext";

// Middleware de rutas (eager)
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import OwnerRoute from "./components/OwnerRoute";

// 📄 Páginas (lazy → cada una en su propio chunk, se baja al visitarla)
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProfileSkills = lazy(() => import("./pages/Profile/ProfileSkills"));
const ProfileHistorial = lazy(() => import("./pages/Profile/ProfileHistorial"));
const Match = lazy(() => import("./pages/Match"));
const EditProfile = lazy(() => import("./pages/Profile/EditProfile"));
const AddSkill = lazy(() => import("./pages/Profile/AddSkill"));
const Combos = lazy(() => import("./pages/Profile/Combos"));
const ComboDetails = lazy(() => import("./pages/Profile/ComboDetails"));
const EditCombo = lazy(() => import("./pages/Profile/EditCombo"));
const AddCombo = lazy(() => import("./pages/Profile/AddCombo"));
const VsDetails = lazy(() => import("./pages/VsDetails"));
const Ranks = lazy(() => import("./pages/Ranks/Ranks"));
const Notifications = lazy(() => import("./pages/Notifications"));
const SkillsStatsPage = lazy(() => import("./pages/SkillStatsPage"));
const TeamPage = lazy(() => import("./pages/Teampage"));
const CreateTeamPage = lazy(() => import("./pages/Teams/CreateTeamPage"));
const SkillsUser = lazy(() => import("./pages/Profile/SkillsUser"));
const SkillDetail = lazy(() => import("./pages/Profile/SkillDetail"));
const EditSkill = lazy(() => import("./pages/Profile/EditSkill"));
const UserFriendsPage = lazy(() => import("./pages/Profile/UserFriendsPage"));
const EditAdvancedProfile = lazy(() => import("./pages/Profile/EditAdvancedProfile"));
const EnergyUpgrade = lazy(() => import("./pages/EnergyUpgrade"));

// 🔐 Auth Pages (lazy)
const Login = lazy(() => import("./pages/AuthPages/Login"));
const SignUp = lazy(() => import("./pages/AuthPages/SignUp"));
const ForgotPassword = lazy(() => import("./pages/AuthPages/ForgotPassword"));
const EmailVerification = lazy(() => import("./pages/AuthPages/EmailVerification"));
const UpdatePassword = lazy(() => import("./pages/AuthPages/UpdatePassword"));

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <AuthProvider>
        <SocketProvider>
          <RankedSocketProvider>
            <CasualSocketProvider>
              <ScrollToTop />
              <Suspense fallback={<Spinner />}>
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
                  <Route path="/energy/upgrade" element={<EnergyUpgrade />} />

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
              </Suspense>
              </CasualSocketProvider>
          </RankedSocketProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
