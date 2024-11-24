import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import ToggleButton from './ToggleButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <header className="h-16 w-screen bg-white border-b border-gray-400 fixed top-0 z-50 flex px-4">
      <div className="w-1/2 flex items-center">
        <div className="flex items-center justify-center">
          <img
            className="h-8 object-contain"
            alt="Graphite logo"
            src="/logos/graphite_black.png"
          />
        </div>

        <div className="flex-grow mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for courses"
              className="w-full h-12 px-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" />
          </div>
        </div>
      </div>

      {/* Right Section: User/Instructor Toggle + Cart + Profile */}
      <div className="w-1/2 flex items-center justify-end space-x-4">
        {/* Toggle Buttons */}
        {currentUser && (
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-medium text-gray-600">User</h2>
            <ToggleButton />
            <h2 className="text-sm font-medium text-gray-600">Instructor</h2>
          </div>
        )}

        {/* Cart Button */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Cart Button"
        >
          <FaShoppingCart className="text-xl text-gray-700" />
        </button>

        {/* Profile Button */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Profile Button"
        >
          <FaUserCircle className="text-xl text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;
