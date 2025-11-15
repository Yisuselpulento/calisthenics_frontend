import { Outlet, useParams, Link } from "react-router-dom"
import BackButton from "../components/Buttons/BackButton"

const CombosLayout = () => {
  const { username } = useParams()

  return (
    <div className="min-h-screen text-white p-2">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <BackButton />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default CombosLayout