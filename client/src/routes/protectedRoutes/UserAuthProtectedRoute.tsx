import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

interface UserAuthProtectedRouteProps {
  children: ReactNode;
}

const UserAuthProtectedRoute: React.FC<UserAuthProtectedRouteProps> = ({
  children,
}) => {
  const { token } = useSelector((state: RootState) => state.user);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default UserAuthProtectedRoute;
