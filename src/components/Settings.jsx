import React, { useState } from 'react';

    const Settings = () => {
      const [setting1, setSetting1] = useState('');
      const [setting2, setSetting2] = useState(false);

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Settings submitted:', { setting1, setting2 });
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="setting1" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Setting 1
            </label>
            <input
              type="text"
              id="setting1"
              value={setting1}
              onChange={(e) => setSetting1(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={setting2}
                onChange={(e) => setSetting2(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Setting 2</span>
            </label>
          </div>
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Settings
          </button>
        </form>
      );
    };

    export default Settings;
