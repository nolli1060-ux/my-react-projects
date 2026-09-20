import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

/**
 * Guarded/protected route wrapper.
 * Demonstrates Day 31 (Guarded routes in React Router).
 */
export function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="status">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
