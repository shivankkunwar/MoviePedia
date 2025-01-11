import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ requireAdmin = false }) => {
  const { token, user } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!token) {
  
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
  
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;