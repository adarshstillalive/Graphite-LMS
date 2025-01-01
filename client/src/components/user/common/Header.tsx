import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IoCartSharp, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import UserProfileDropdown from './UserProfileDropdown';
import ToggleButton from './ToggleButton';
import { FaHeart } from 'react-icons/fa6';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { role } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="h-16 w-full bg-white border-b border-gray-400 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center">
        {/* Logo and Search Container */}
        <div className="flex items-center w-1/2">
          <div
            className="flex items-center justify-center mr-4 cursor-pointer"
            onClick={() =>
              role === 'instructor' ? navigate('/instructor') : navigate('/')
            }
          >
            <img
              className="h-8 object-contain"
              alt="Graphite logo"
              src="/logos/graphite_black.png"
            />
          </div>

          {/* Search (Desktop) */}
          <div className="hidden md:flex mx-4 w-full">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for courses"
                className="w-full h-12 px-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <FiSearch className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-black text-gray-500" />
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="w-1/2 flex items-center justify-end space-x-4">
          {/* wishlist Button */}
          {currentUser && role !== 'instructor' && (
            <Link to="/profile/wishlist">
              <Button
                className="relative md:flex rounded-full bg-gray-200 hover:bg-gray-300 p-5"
                variant="default"
              >
                <FaHeart className="text-gray-800" />
                {currentUser.wishlist && currentUser.wishlist?.length > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full">
                    {currentUser.wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {/* Cart Button */}
          {currentUser && role !== 'instructor' && (
            <Link to="/profile/cart">
              <Button
                className="relative md:flex rounded-full bg-gray-200 hover:bg-gray-300 p-5"
                variant="default"
              >
                <IoCartSharp className="text-gray-800" />
                {currentUser.cart && currentUser.cart?.length > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full">
                    {currentUser.cart.length}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {/* Profile/Login Button */}
          {currentUser ? (
            role === 'user' && <UserProfileDropdown />
          ) : (
            <Button className="hidden md:flex rounded-none" variant="default">
              <Link to={'/auth/login'}>Login</Link>
            </Button>
          )}

          {/* Toggle Buttons */}
          {currentUser ? (
            <div className="hidden md:flex items-center space-x-2">
              <h2 className="text-sm font-medium text-gray-600">User</h2>
              <ToggleButton />
              <h2 className="text-sm font-medium text-gray-600">Instructor</h2>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <h2 className="text-sm font-medium text-gray-600">Guest</h2>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
            <div className="px-4 pt-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search for courses"
                  className="w-full h-12 px-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <FiSearch className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-black text-gray-500" />
              </div>
              <div className="space-y-4">
                {currentUser ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h2 className="text-sm font-medium text-gray-600">
                          User
                        </h2>
                        <ToggleButton />
                        <h2 className="text-sm font-medium text-gray-600">
                          Instructor
                        </h2>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={'/auth/login'}>
                    <Button className="w-full rounded-none" variant="default">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
