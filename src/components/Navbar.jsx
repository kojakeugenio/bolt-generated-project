import React from 'react';
    import { FaSun, FaMoon } from 'react-icons/fa';

    const Navbar = ({ darkMode, setDarkMode }) => {
      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };

      return (
        <nav className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">Scraper Tool</div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </nav>
      );
    };

    export default Navbar;
