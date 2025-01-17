import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IoCartSharp, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import UserProfileDropdown from './UserProfileDropdown';
import ToggleButton from './ToggleButton';
import { FaHeart } from 'react-icons/fa6';
import { ICourse } from '@/interfaces/Course';
import { searchCourses } from '@/services/user/courseService';
import { Loader2 } from 'lucide-react';
import { MdStar, MdStarOutline } from 'react-icons/md';

const Header = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchFocused, setMobileSearchFocused] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { role } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileSearchFocused(false);
  };

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        if (query) {
          const response = await searchCourses(query);
          setLoading(false);
          setSuggestions(response.data);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const renderSearchSuggestions = () => (
    <div
      className="absolute w-full bg-white border border-gray-300 shadow-md z-10 max-h-60 overflow-y-auto"
      onMouseDown={(e) => e.preventDefault()}
    >
      {loading ? (
        <div className="p-4 text-gray-500 flex items-center justify-center">
          <Loader2 className="animate-spin w-6 h-6" />
        </div>
      ) : suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-none"
            onClick={() => {
              const isCreated =
                currentUser?._id === suggestion.instructorId || false;
              navigate(`/courses/courseDetail/${suggestion._id}/${isCreated}`);
              setShowDropdown(false);
              setMobileSearchFocused(false);
              setIsMobileMenuOpen(false);
            }}
          >
            <img
              src={suggestion.thumbnail}
              alt={suggestion.title}
              className="w-12 h-12 object-cover rounded-md mr-3"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                {suggestion.title}
              </span>
              <div className="flex items-center">
                <span className="font-semibold mr-1">
                  {suggestion.rating && suggestion.rating.toFixed(1)}
                </span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= Math.round(suggestion.rating || 0) ? (
                      <MdStar key={star} className="h-4 w-4 fill-yellow-400" />
                    ) : (
                      <MdStarOutline
                        key={star}
                        className="h-4 w-4 text-gray-400"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-2 text-gray-500">No results found</div>
      )}
    </div>
  );

  return (
    <header className="h-16 w-full bg-white border-b border-gray-400 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo and Search Container */}
        <div className="flex items-center flex-1 md:w-1/2">
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

          {/* Desktop Search */}
          <div className="hidden md:flex mx-4 w-full relative">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="Search for courses"
                className="w-full h-12 px-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                value={query}
              />
              <FiSearch className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-black text-gray-500" />
              {showDropdown && query.length > 0 && renderSearchSuggestions()}
            </div>
          </div>
        </div>

        {/* Desktop Right Side Actions */}
        <div className="hidden md:flex items-center justify-end space-x-4">
          {currentUser && role !== 'instructor' && (
            <>
              <Link to="/profile/wishlist">
                <Button
                  className="relative rounded-full bg-gray-200 hover:bg-gray-300 p-5"
                  variant="default"
                >
                  <FaHeart className="text-gray-800" />
                  {currentUser.wishlist && currentUser.wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full">
                      {currentUser.wishlist.length}
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/profile/cart">
                <Button
                  className="relative rounded-full bg-gray-200 hover:bg-gray-300 p-5"
                  variant="default"
                >
                  <IoCartSharp className="text-gray-800" />
                  {currentUser.cart && currentUser.cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full">
                      {currentUser.cart.length}
                    </span>
                  )}
                </Button>
              </Link>
            </>
          )}

          {currentUser ? (
            role === 'user' && <UserProfileDropdown />
          ) : (
            <Link to="/auth/login">
              <Button className="rounded-none" variant="default">
                Login
              </Button>
            </Link>
          )}

          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-medium text-gray-600">
              {currentUser ? 'User' : 'Guest'}
            </h2>
            {currentUser && (
              <>
                <ToggleButton />
                <h2 className="text-sm font-medium text-gray-600">
                  Instructor
                </h2>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          {isMobileMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for courses"
                className="w-full h-12 px-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setMobileSearchFocused(true)}
                value={query}
              />
              <FiSearch className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-black text-gray-500" />
              {mobileSearchFocused &&
                query.length > 0 &&
                renderSearchSuggestions()}
            </div>

            {/* Mobile Actions */}
            <div className="space-y-4 flex flex-col justify-center">
              {currentUser && role !== 'instructor' && (
                <div className="flex space-x-4">
                  <Link to="/profile/wishlist" className="flex-1">
                    <Button
                      className="w-full rounded-none bg-gray-600 hover:bg-gray-300"
                      variant="default"
                    >
                      <FaHeart className="mr-2" />
                      Wishlist
                      {currentUser.wishlist &&
                        currentUser.wishlist.length > 0 && (
                          <span className="ml-2 bg-black text-white px-2 py-1 rounded-full text-xs">
                            {currentUser.wishlist.length}
                          </span>
                        )}
                    </Button>
                  </Link>
                  <Link to="/profile/cart" className="flex-1">
                    <Button
                      className="w-full rounded-none bg-gray-600 hover:bg-gray-300"
                      variant="default"
                    >
                      <IoCartSharp className="mr-2" />
                      Cart
                      {currentUser.cart && currentUser.cart.length > 0 && (
                        <span className="ml-2 bg-white text-gray-600 px-2 py-1 rounded-full text-xs">
                          {currentUser.cart.length}
                        </span>
                      )}
                    </Button>
                  </Link>
                </div>
              )}

              {currentUser ? (
                role === 'user' && <UserProfileDropdown />
              ) : (
                <Link to="/auth/login">
                  <Button className="w-full rounded-none" variant="default">
                    Login
                  </Button>
                </Link>
              )}

              <div className="flex items-center justify-center space-x-2 py-2">
                <h2 className="text-sm font-medium text-gray-600">
                  {currentUser ? 'User' : 'Guest'}
                </h2>
                {currentUser && (
                  <>
                    <ToggleButton />
                    <h2 className="text-sm font-medium text-gray-600">
                      Instructor
                    </h2>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
