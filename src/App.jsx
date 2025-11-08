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

function App() {
  return (
   <BrowserRouter>
   <ScrollToTop/>
          <Routes>
              <Route  path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                    <Route path="profile/:username" element={<ProfileLayout />}>
                        <Route index element={<Profile />} /> 
                        <Route path="skills" element={<ProfileSkills />} /> 
                        <Route path="historial" element={<ProfileHistorial />} />
                    </Route>
                  <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
          <BottomNavbar/>
   </BrowserRouter>
  )
}

export default App
