import React, { useState } from 'react';

    const EmailVerifier = () => {
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage] = useState(10);

      const mockData = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        url: `http://example.com/page${i + 1}`,
        email: `test${i + 1}@example.com`,
        verifyStatus: i % 2 === 0 ? 'Verified' : 'Not Verified',
      }));

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

      const paginate = (pageNumber) => setCurrentPage(pageNumber);

      return (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Verify Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.url}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.verifyStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.ceil(mockData.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-2 rounded-lg ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      );
    };

    export default EmailVerifier;
