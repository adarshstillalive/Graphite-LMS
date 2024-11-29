import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

interface PreInstructorProtectedRouteProps {
  children: ReactNode;
}

const PreInstructorProtectedRoute: React.FC<
  PreInstructorProtectedRouteProps
> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.user);
  const { role } = useSelector((state: RootState) => state.app);

  if (!token || role !== 'instructor') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PreInstructorProtectedRoute;
