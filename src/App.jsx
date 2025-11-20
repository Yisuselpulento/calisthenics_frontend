import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layouts/Layout"
import Home from "./pages/Home"
import ScrollToTop from "./components/ScrollToTop"
import Profile from "./pages/Profile/Profile"
import NotFound from "./pages/NotFound"
import ProfileSkills from "./pages/Profile/ProfileSkills"
import ProfileHistorial from "./pages/Profile/ProfileHistorial"
import ProfileLayout from "./Layouts/ProfileLayout"
import Match from "./pages/Match"
import EditProfile from "./pages/Profile/EditProfile"
import AddSkill from "./pages/Profile/AddSkill"
import { AuthProvider } from "./context/AuthContext"
import Combos from "./pages/Profile/Combos"
import ComboDetails from "./pages/Profile/ComboDetails"
import EditCombo from "./pages/Profile/EditCombo"
import CombosLayout from "./Layouts/CombosLayout"
import AddCombo from "./pages/Profile/AddCombo"
import VsDetails from "./pages/VsDetails"
import Ranks from "./pages/Ranks/Ranks"
import Notifications from "./pages/Notifications"
import SkillsStatsPage from "./pages/SkillStatsPage"
import TeamPage from "./pages/Teampage"
import CreateTeamPage from "./pages/Teams/CreateTeamPage"
import SkillsUser from "./pages/Profile/SkillsUser"
import SkillDetail from "./pages/Profile/SkillDetail"
import EditSkill from "./pages/Profile/EditSkill"

function App() {
  return (
   <BrowserRouter>
   <AuthProvider>
   <ScrollToTop/>
          <Routes>
              <Route  path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/skills-stats" element={<SkillsStatsPage />} />
                  <Route path="/vs/:matchId" element={<VsDetails />} />
                  <Route path="/teams/:teamId" element={<TeamPage />} />
                  <Route path="/ranks" element={<Ranks />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/teams/create" element={<CreateTeamPage />} />
                    <Route path="profile/:username" element={<ProfileLayout />}>
                        <Route index element={<Profile />} /> 
                        <Route path="skills" element={<ProfileSkills />} /> 
                        <Route path="historial" element={<ProfileHistorial />} />
                        <Route path="edit" element={<EditProfile />} />    
                        <Route path="edit-skill/:variantId" element={<EditSkill/>} />  
                        <Route path="add-skill" element={<AddSkill />} />  
                        <Route path="combos/add" element={<AddCombo />} />
                        <Route path="skills/:skillId/:variantId" element={<SkillDetail />} />
                        <Route path="skills/all-skills" element={<SkillsUser />} />
                          <Route path="combos" element={<CombosLayout />}>
                            <Route index element={<Combos />} /> 
                            <Route path=":comboId" element={<ComboDetails />} /> 
                            <Route path=":comboId/edit" element={<EditCombo />} /> 
                          </Route>    
                    </Route>
                  <Route path="match/:matchId" element={<Match />} />
                  <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
    </AuthProvider>
   </BrowserRouter>
  )
}

export default App
