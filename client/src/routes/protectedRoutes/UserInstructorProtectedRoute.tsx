import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

interface UserInstructorProtectedRouteProps {
  children: ReactNode;
}

const UserInstructorProtectedRoute: React.FC<
  UserInstructorProtectedRouteProps
> = ({ children }) => {
  const { role } = useSelector((state: RootState) => state.app);

  if (role && role !== 'user') {
    return <Navigate to="/instructor" replace />;
  }

  return <>{children}</>;
};

export default UserInstructorProtectedRoute;
