import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../../../redux/slices/user/appSlice';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';

const ToggleButton = () => {
  const { role } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();

  // useEffect(() => {

  // }, [role, navigate]);
  const handleToggle = () => {
    dispatch(setRole(role === 'user' ? 'instructor' : 'user'));
    if (role === 'user') {
      navigate('/instructor');
    } else if (role === 'instructor') {
      navigate('/');
    }
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
