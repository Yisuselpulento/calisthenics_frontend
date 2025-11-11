import { Outlet, useParams, Link } from "react-router-dom"

const CombosLayout = () => {
  const { username } = useParams()

  return (
    <div className="min-h-screen text-white p-2">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            to={`/profile/${username}/skills`}
            className="text-sm text-blue-400 hover:underline"
          >
            ← Volver
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default CombosLayout