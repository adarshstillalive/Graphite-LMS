import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

interface AdminAuthProtectedRouteProps {
  children: ReactNode;
}

const AdminAuthProtectedRoute: React.FC<AdminAuthProtectedRouteProps> = ({
  children,
}) => {
  const { token } = useSelector((state: RootState) => state.admin);

  if (token) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AdminAuthProtectedRoute;
