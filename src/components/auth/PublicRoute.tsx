
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PublicRouteProps {
  children: JSX.Element;
  restricted?: boolean;
}

const PublicRoute = ({ children, restricted = false }: PublicRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (user && restricted) {
    // If user is logged in and route is restricted, redirect to dashboard
    return <Navigate to={user.userType === 'sme' ? '/sme-dashboard' : '/startup-dashboard'} replace />;
  }

  return children;
};

export default PublicRoute;
