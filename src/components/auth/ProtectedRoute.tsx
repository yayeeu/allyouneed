
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { protectedRoutes } from '@/types';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const requiresAuth = protectedRoutes.some(path => 
    location.pathname.startsWith(path)
  );

  if (requiresAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // SME specific routes
  if (location.pathname.startsWith('/sme-dashboard') && user?.userType !== 'sme') {
    return <Navigate to="/dashboard" replace />;
  }

  // Startup specific routes
  if (location.pathname.startsWith('/startup-dashboard') && user?.userType !== 'startup') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
