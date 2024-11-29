import ToggleButton from './ToggleButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IoCartSharp } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import UserProfileDropdown from './UserProfileDropdown';
import InstructorProfileDropdown from '@/components/instructor/InstructorProfileDropdown';

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { role } = useSelector((state: RootState) => state.app);

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
            <FiSearch className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-black text-gray-500" />
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-end space-x-4 px-4">
        {/* Toggle Buttons */}
        {currentUser ? (
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-medium text-gray-600">User</h2>
            <ToggleButton />
            <h2 className="text-sm font-medium text-gray-600">Instructor</h2>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-medium text-gray-600">Guest</h2>
          </div>
        )}

        {/* Cart Button */}
        {currentUser && (
          <Button
            className="rounded-full bg-gray-200 hover:bg-gray-300 p-5"
            variant="default"
          >
            <IoCartSharp className="text-gray-800" />
          </Button>
        )}

        {/* Profile Button */}

        {currentUser ? (
          role === 'user' ? (
            <UserProfileDropdown />
          ) : (
            <InstructorProfileDropdown />
          )
        ) : (
          <Button className="rounded-none" variant="default">
            <Link to={'/auth/login'}>Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
