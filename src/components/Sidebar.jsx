import React from 'react';

    const Sidebar = ({ activeSection, setActiveSection }) => {
      return (
        <div className="w-64 p-4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <ul>
            <li
              className={`mb-2 p-2 rounded-lg cursor-pointer ${
                activeSection === 'email-scraper' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveSection('email-scraper')}
            >
              Email Scraper
            </li>
            <li
              className={`mb-2 p-2 rounded-lg cursor-pointer ${
                activeSection === 'email-verifier' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveSection('email-verifier')}
            >
              Email Verifier
            </li>
            <li
              className={`p-2 rounded-lg cursor-pointer ${
                activeSection === 'settings' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveSection('settings')}
            >
              Settings
            </li>
          </ul>
        </div>
      );
    };

    export default Sidebar;
