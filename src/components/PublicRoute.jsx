import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner/Spinner";

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size="3em" />
    </div>
  );

  return !currentUser ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
