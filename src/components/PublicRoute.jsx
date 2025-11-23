import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return !currentUser ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
