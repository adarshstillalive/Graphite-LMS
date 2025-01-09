import { useState } from 'react';
import {
  MdDashboard,
  MdPeople,
  MdSettings,
  MdMenu,
  MdLogout,
  MdPerson,
} from 'react-icons/md';
import {
  FaChalkboardTeacher,
  FaBook,
  FaComments,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '@/redux/slices/admin/adminSlice';
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { FaListCheck } from 'react-icons/fa6';

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const navItems = [
    { icon: MdDashboard, label: 'Dashboard', to: '/admin/dashboard' },
    { icon: MdPeople, label: 'Users', to: '/admin/users' },
    {
      icon: FaChalkboardTeacher,
      label: 'Instructors',
      to: '/admin/instructors',
    },
    { icon: FaBook, label: 'Courses', to: '/admin/courses' },
    { icon: FaListCheck, label: 'Orders', to: '/admin/orders' },
    { icon: IoReturnDownBackSharp, label: 'Return', to: '/admin/return' },
    { icon: FaComments, label: 'Communication', to: '/admin/communication' },
    { icon: FaMoneyBillWave, label: 'Revenue', to: '/admin/revenue' },
    { icon: MdSettings, label: 'Settings', to: '/admin/settings' },
  ];

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <>
      <button
        className="fixed top-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-md lg:hidden z-50 hover:bg-gray-700"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle Menu"
      >
        <MdMenu size={24} />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-gray-800 text-white shadow-xl
          transition-transform duration-300 ease-in-out z-50
          w-64 lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-600 px-6">
          <img
            className="h-10 w-auto object-contain"
            alt="App Logo"
            src="/logos/graphite_white.png"
          />
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
              >
                <Icon size={22} className="flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-600 p-4 flex justify-between items-center">
          <Link
            to="/admin/profile"
            className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition-all duration-200"
            aria-label="Admin Profile"
          >
            <MdPerson size={24} />
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition-all duration-200"
            aria-label="Logout"
          >
            <MdLogout size={24} />
          </button>
        </div>
      </aside>

      <div className="lg:hidden h-16" />
    </>
  );
};

export default Sidebar;
