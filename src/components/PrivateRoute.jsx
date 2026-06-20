import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, rol }) {
  const { usuarioActual } = useAuth();

  if (!usuarioActual) return <Navigate to="/login" replace />;
  if (rol && usuarioActual.rol !== rol) return <Navigate to="/login" replace />;

  return children;
}