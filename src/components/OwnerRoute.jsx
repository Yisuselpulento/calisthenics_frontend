import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const OwnerRoute = ({ children }) => {
  const { currentUser, viewedProfile } = useAuth();;

  if (currentUser?.username !== viewedProfile.username) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OwnerRoute;
