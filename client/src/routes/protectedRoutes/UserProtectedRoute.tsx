import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

interface UserProtectedRouteProps {
  children: ReactNode;
}

const UserProtectedRoute: React.FC<UserProtectedRouteProps> = ({
  children,
}) => {
  const { token } = useSelector((state: RootState) => state.user);
  const { role } = useSelector((state: RootState) => state.app);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  if (role !== 'user') {
    return <Navigate to="/instructor" replace />;
  }

  return <>{children}</>;
};

export default UserProtectedRoute;
