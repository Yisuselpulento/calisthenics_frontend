import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layouts/Layout"
import Home from "./pages/Home"
import ScrollToTop from "./components/ScrollToTop"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"

function App() {
  return (
   <BrowserRouter>
   <ScrollToTop/>
          <Routes>
              <Route  path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="profile/:username" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
   </BrowserRouter>
  )
}

export default App
