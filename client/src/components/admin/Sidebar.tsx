// src/components/admin/Sidebar.tsx
import React, { useState } from 'react';
import {
  MdDashboard,
  MdPeople,
  MdSettings,
  MdMenu,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import {
  FaChalkboardTeacher,
  FaBook,
  FaComments,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: MdDashboard, label: 'Dashboard', to: '/admin/dashboard' },
    { icon: MdPeople, label: 'Users', to: '/admin/users' },
    {
      icon: FaChalkboardTeacher,
      label: 'Instructors',
      to: '/admin/instructors',
    },
    { icon: FaBook, label: 'Courses', to: '/admin/courses' },
    { icon: FaComments, label: 'Communication', to: '/admin/communication' },
    { icon: FaMoneyBillWave, label: 'Revenue', to: '/admin/revenue' },
    { icon: MdSettings, label: 'Settings', to: '/admin/settings' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-md lg:hidden z-50 hover:bg-gray-700"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle Menu"
      >
        <MdMenu size={24} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-gray-800 text-white shadow-xl
          transition-all duration-300 ease-in-out z-50
          ${expanded ? 'w-64' : 'w-20'} 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Toggle Button */}
        <button
          className="absolute -right-3 top-10 hidden lg:block bg-gray-800 text-white border border-gray-600 rounded-full p-1.5 hover:bg-gray-700"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {expanded ? (
            <MdChevronLeft size={20} />
          ) : (
            <MdChevronRight size={20} />
          )}
        </button>

        {/* Logo */}
        <div
          className={`h-16 flex items-center justify-center border-b border-gray-600
          ${expanded ? 'px-6' : 'px-2'}`}
        >
          <img
            className="h-10 w-auto object-contain"
            alt="App Logo"
            src="/logos/graphite_white.png"
          />
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group
                  ${expanded ? 'justify-start' : 'justify-center'}
                  ${
                    isActive
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
              >
                <Icon
                  size={22}
                  className={`flex-shrink-0 transition-colors duration-200
                    ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}
                />
                <span
                  className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-200
                    ${expanded ? 'opacity-100 w-auto' : 'w-0 opacity-0 hidden'}`}
                >
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {!expanded && (
                  <div
                    className="absolute left-20 bg-gray-900 text-white px-3 py-2 rounded-lg
                      text-sm invisible opacity-0 group-hover:visible group-hover:opacity-100 
                      transition-all duration-200 whitespace-nowrap shadow-lg"
                  >
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Padding for Mobile */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default Sidebar;
