import { Navigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { username } = useParams()
  const { currentUser } = useAuth()

  if (!currentUser || currentUser.username !== username) {
    return <Navigate to={`/profile/${currentUser?.username || ""}`} replace />
  }

  return children
}

export default ProtectedRoute