import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../../../redux/slices/user/appSlice';
import { RootState } from '../../../redux/store';
import { useLocation } from 'react-router-dom';
import pathAlteration from '../../../utils/commonUtils/pathAlteration';
import useRoleBasedNavigate from '../../../hooks/useRoleBasedNavigate';
import { useEffect } from 'react';

const ToggleButton = () => {
  const { role } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();
  const roleBasedNavigation = useRoleBasedNavigate();
  const location = useLocation();
  useEffect(() => {
    const reRenderPath = pathAlteration(location.pathname);
    roleBasedNavigation(reRenderPath);
  }, [role, location.pathname, roleBasedNavigation]);
  const handleToggle = () => {
    dispatch(setRole());
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center w-14 h-8 p-1 rounded-full transition-colors duration-300 ${
        role === 'instructor'
          ? 'bg-black justify-end'
          : 'bg-gray-300 justify-start'
      }`}
      aria-label="Toggle Button"
    >
      <div className="bg-white h-6 w-6 border rounded-full shadow-md transition-transform duration-300"></div>
    </button>
  );
};

export default ToggleButton;
