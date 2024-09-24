import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { AuthContext } from '../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const { auth, user, setUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to control mobile menu visibility
  const dropdownRef = useRef(null); // Reference to the dropdown container
  console.log("userData",user);
  const logout = () => {
    localStorage.removeItem('userToken');
    setUser(null); // Clear user data on logout
    navigate('/login');
  };

  // Toggle dropdown visibility when clicking the button
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Toggle mobile menu visibility when clicking the button
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown
      }
    };

    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-black">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="#" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">News Aggregator</span>
          </a>

          <div className="flex items-center lg:order-2">
            {auth ? (
              <div className="relative inline-block text-left" ref={dropdownRef}>
                <button
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  onClick={toggleDropdown}
                  id="menu-button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {user?.name || "User"}
                  <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414L10 13.414l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1" role="none">
                      <Link to="/preference" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                        Preferences
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                Log in
              </Link>
            )}
          </div>

          <button 
            data-collapse-toggle="mobile-menu-2" 
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleMobileMenu}
            aria-controls="mobile-menu-2"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className={`lg:flex lg:w-auto lg:order-1 ${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link 
                  to="/news" 
                  onClick={toggleMobileMenu}
                  className={`block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${location.pathname === '/news' ? 'text-white bg-primary-700' : 'text-white-700 hover:bg-black-50 dark:text-gray-400 dark:hover:text-white'}`} 
                  aria-current={location.pathname === '/news' ? 'page' : undefined}
                >
                  News
                </Link>
              </li>
              <li>
                <Link 
                  to="/newyork"
                  onClick={toggleMobileMenu} 
                  className={`block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${location.pathname === '/newyork' ? 'text-white bg-primary-700' : 'text-white-700 hover:bg-black-50 dark:text-gray-400 dark:hover:text-white'}`} 
                  aria-current={location.pathname === '/newyork' ? 'page' : undefined}
                >
                  NewYork Time
                </Link>
              </li>
              <li>
                <Link 
                  to="/theguardian" 
                  onClick={toggleMobileMenu}
                  className={`block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${location.pathname === '/theguardian' ? 'text-white bg-primary-700' : 'text-white-700 hover:bg-black-50 dark:text-gray-400 dark:hover:text-white'}`} 
                  aria-current={location.pathname === '/theguardian' ? 'page' : undefined}
                >
                  The Guardian
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
