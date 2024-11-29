import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

interface InstructorProtectedRouteProps {
  children: ReactNode;
}

const InstructorProtectedRoute: React.FC<InstructorProtectedRouteProps> = ({
  children,
}) => {
  const { token } = useSelector((state: RootState) => state.user);
  const { isInstructor } = useSelector((state: RootState) => state.user);
  const { role } = useSelector((state: RootState) => state.app);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role !== 'instructor') {
    return <Navigate to="/" replace />;
  }

  if (!isInstructor) {
    return <Navigate to="/instructor/request" replace />;
  }

  return <>{children}</>;
};

export default InstructorProtectedRoute;
