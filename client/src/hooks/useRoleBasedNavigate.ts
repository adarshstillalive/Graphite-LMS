import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

const useRoleBasedNavigate = () => {
  const navigate = useNavigate();
  const { role } = useSelector((state: RootState) => state.app);

  const roleBasedNavigate = useCallback(
    (path: string) => {
      const basePath = role === 'instructor' ? '/instructor' : '';
      navigate(`${basePath}${path}`);
    },
    [navigate, role]
  );

  return roleBasedNavigate;
};

export default useRoleBasedNavigate;
