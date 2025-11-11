import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layouts/Layout"
import Home from "./pages/Home"
import ScrollToTop from "./components/ScrollToTop"
import Profile from "./pages/Profile/Profile"
import NotFound from "./pages/NotFound"
import BottomNavbar from "./components/Navbar/BottomNavbar"
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

function App() {
  return (
   <BrowserRouter>
   <AuthProvider>
   <ScrollToTop/>
          <Routes>
              <Route  path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/vs/:matchId" element={<VsDetails />} />
                    <Route path="profile/:username" element={<ProfileLayout />}>
                        <Route index element={<Profile />} /> 
                        <Route path="skills" element={<ProfileSkills />} /> 
                        <Route path="historial" element={<ProfileHistorial />} />
                        <Route path="edit" element={<EditProfile />} />      
                        <Route path="add-skill" element={<AddSkill />} />  
                        <Route path="combos/add" element={<AddCombo />} />
                          <Route path="combos" element={<CombosLayout />}>
                            <Route index element={<Combos />} /> 
                            <Route path=":comboId" element={<ComboDetails />} /> 
                            <Route path=":comboId/edit" element={<EditCombo />} /> 
                          </Route>    
                    </Route>
                  <Route path="vs/:matchId" element={<Match />} />
                  <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
          <BottomNavbar/>
    </AuthProvider>
   </BrowserRouter>
  )
}

export default App
