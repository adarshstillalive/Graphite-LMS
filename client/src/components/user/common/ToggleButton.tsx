import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/slices/user/appSlice';
import { RootState } from '../../../redux/store';

const ToggleButton = () => {
  const { user } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setUser());
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center w-14 h-8 p-1 rounded-full transition-colors duration-300 ${
        user === 'instructor'
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
