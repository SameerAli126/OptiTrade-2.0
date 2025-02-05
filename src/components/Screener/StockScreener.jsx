import React, { useState, useEffect } from 'react';

const StockScreener = ({ setSelectedStock }) => {
    const [stocks, setStocks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const stocksPerPage = 10; // Number of stocks per page
    const maxPageButtons = 5; // Maximum number of page buttons to display

    useEffect(() => {
        const fetchStocks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://archlinux.tail9023a4.ts.net/stocks');
                const data = await response.json();
                setStocks(data);
                setTotalPages(Math.ceil(data.length / stocksPerPage));
            } catch (error) {
                console.error('Error fetching stocks:', error);
                setError('Failed to fetch stocks.');
            } finally {
                setLoading(false);
            }
        };

        fetchStocks();
    }, []);

    const handleStockClick = (stock) => {
        setSelectedStock(stock);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Determine the range of page numbers to display
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // Get current stocks to display
    const indexOfLastStock = currentPage * stocksPerPage;
    const indexOfFirstStock = indexOfLastStock - stocksPerPage;
    const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

    return (
        <div className="stock-screener-container p-4">
            <h2 className="text-2xl mb-4">Stock Screener</h2>
            {loading ? (
                <p>Loading stocks...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <table className="min-w-full bg-cyan-700 rounded-md">
                        <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Last Sale</th>
                            <th>Net Change</th>
                            <th>Pct Change</th>
                            <th>Volume</th>
                            <th>Market Cap</th>
                            <th>Sector</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentStocks.map((stock) => (
                            <tr key={stock.symbol} onClick={() => handleStockClick(stock)} className="cursor-pointer hover:bg-gray-100">
                                <td>{stock.symbol}</td>
                                <td>{stock.name}</td>
                                <td>{stock.lastsale}</td>
                                <td>{stock.netchange}</td>
                                <td>{stock.pctchange}</td>
                                <td>{stock.volume}</td>
                                <td>{stock.marketCap}</td>
                                <td>{stock.sector}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 mx-1 bg-gray-200"
                        >
                            &lt;
                        </button>
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(startPage + i)}
                                className={`px-3 py-1 mx-1 ${currentPage === startPage + i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {startPage + i}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 mx-1 bg-gray-200"
                        >
                            &gt;
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StockScreener;
