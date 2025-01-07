import React, { useState } from 'react';
    import { FaEye, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

    const EmailScraper = ({ scraperData, setScraperData }) => {
      const [url, setUrl] = useState('');
      const [logs, setLogs] = useState('');
      const [showLogsModal, setShowLogsModal] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage] = useState(10);
      const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

      const handleAddUrl = () => {
        const newId = scraperData.length > 0 ? Math.max(...scraperData.map((item) => item.id)) + 1 : 1;
        const newUrl = {
          id: newId,
          url: url,
          status: 'Pending',
          addedDate: new Date().toLocaleDateString(),
          logs: `Logs for ${url}...`,
        };
        setScraperData([...scraperData, newUrl]);
        setUrl('');
      };

      const handleViewLogs = (logContent) => {
        setLogs(logContent);
        setShowLogsModal(true);
      };

      const handleDelete = (id) => {
        setScraperData(scraperData.filter((item) => item.id !== id));
      };

      const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
        }
        setSortConfig({ key, direction });
      };

      const sortedData = React.useMemo(() => {
        let sortableItems = [...scraperData];
        if (sortConfig.key !== null) {
          sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
          });
        }
        return sortableItems;
      }, [scraperData, sortConfig]);

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

      const paginate = (pageNumber) => setCurrentPage(pageNumber);

      const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
          return <FaSort />;
        }
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
      };

      return (
        <div>
          <div className="mb-4 flex items-center">
            <textarea
              className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md mr-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Enter URL to scrape"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleAddUrl}
            >
              Add URL
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    URL
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('status')}
                  >
                    Status {getSortIcon('status')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('addedDate')}
                  >
                    Added Date {getSortIcon('addedDate')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Logs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.url}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.addedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleViewLogs(item.logs)}
                      >
                        <FaEye />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.ceil(sortedData.length / itemsPerPage) }, (_, i) => (
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

          {/* Logs Modal */}
          {showLogsModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-1/2">
                <h3 className="text-lg font-medium mb-2">Logs</h3>
                <textarea
                  className="w-full h-64 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  value={logs}
                  readOnly
                />
                <button
                  className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => setShowLogsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      );
    };

    export default EmailScraper;
