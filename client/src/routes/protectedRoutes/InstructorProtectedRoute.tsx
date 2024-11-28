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
  const { token, isInstructor } = useSelector((state: RootState) => state.user);
  const { role } = useSelector((state: RootState) => state.app);

  if (!token || role !== 'instructor' || !isInstructor) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default InstructorProtectedRoute;
