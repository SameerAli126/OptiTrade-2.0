import React, { useState, useEffect } from 'react';
import data from '../../../data/csvjson.json'; // Adjust the path as necessary

const StockScreener = () => {
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('symbol');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const stocksPerPage = 10; // Number of stocks per page
    const maxPageButtons = 5; // Maximum number of page buttons to display

    useEffect(() => {
        // Load data from JSON file
        setStocks(data);
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (key) => {
        const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortKey(key);
        setSortOrder(order);
    };

    const filteredStocks = stocks.filter(stock =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedStocks = [...filteredStocks].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    // Calculate the stocks to display on the current page
    const indexOfLastStock = currentPage * stocksPerPage;
    const indexOfFirstStock = indexOfLastStock - stocksPerPage;
    const currentStocks = sortedStocks.slice(indexOfFirstStock, indexOfLastStock);

    // Calculate total pages
    const totalPages = Math.ceil(sortedStocks.length / stocksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Determine the range of page numbers to display
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    return (
        <div className="stock-screener-container p-4">
            <h2 className="text-2xl mb-4">Stock Screener</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search stocks"
                className="p-2 border border-green-800 rounded mb-4"
            />
            <table className="min-w-full bg-cyan-700 rounded-md">
                <thead>
                <tr>
                    {['symbol', 'name', 'price', 'change', 'marketCap', 'peRatio', 'dividendYield', 'sector'].map((key) => (
                        <th
                            key={key}
                            onClick={() => handleSort(key)}
                            className="cursor-pointer p-2 bg-cyan-700 hover:bg-gray-200 transition-colors"
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                            <span className="ml-2">
                                {sortKey === key ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                            </span>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {currentStocks.map(stock => (
                    <tr key={stock.symbol} className="hover:bg-gray-100 transition-colors">
                        <td className="p-2">{stock.symbol}</td>
                        <td className="p-2">{stock.name}</td>
                        <td className="p-2">${stock.price}</td>
                        <td className="p-2">{stock.change}%</td>
                        <td className="p-2">{stock.marketCap}</td>
                        <td className="p-2">{stock.peRatio}</td>
                        <td className="p-2">{stock.dividendYield}%</td>
                        <td className="p-2">{stock.sector}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 bg-cyan-700"
                >
                    &lt;
                </button>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(startPage + i)}
                        className={`px-3 py-1 mx-1 ${currentPage === startPage + i ? 'bg-green-600 text-white' : 'bg-cyan-700'}`}
                    >
                        {startPage + i}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 bg-cyan-700"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default StockScreener;
