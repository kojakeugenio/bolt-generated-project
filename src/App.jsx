import React, { useState, useEffect } from 'react';
    import Sidebar from './components/Sidebar';
    import EmailScraper from './components/EmailScraper';
    import EmailVerifier from './components/EmailVerifier';
    import Settings from './components/Settings';
    import Navbar from './components/Navbar';

    const App = () => {
      const [activeSection, setActiveSection] = useState('email-scraper');
      const [darkMode, setDarkMode] = useState(false);
      const [scraperData, setScraperData] = useState(
        Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          url: `http://example.com/page${i + 1}`,
          status: i % 2 === 0 ? 'Completed' : 'Pending',
          addedDate: new Date(Date.now() - i * 86400000).toLocaleDateString(),
          logs: `Logs for URL ${i + 1}...`,
        }))
      );

      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [darkMode]);

      return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="flex flex-1">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="flex-1 p-4">
              {activeSection === 'email-scraper' && (
                <EmailScraper scraperData={scraperData} setScraperData={setScraperData} />
              )}
              {activeSection === 'email-verifier' && <EmailVerifier />}
              {activeSection === 'settings' && <Settings />}
            </div>
          </div>
        </div>
      );
    };

    export default App;
