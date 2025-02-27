// Filepath: src/components/dashboard/new-dashboard/components/StockSearch.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStockData } from '../contexts/StockDataContext';

const StockSearch = () => {
    const navigate = useNavigate();
    const { stockData, error } = useStockData();
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const wrapperRef = useRef(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle search functionality with error checking
    useEffect(() => {
        if (error) {
            alert('Server is offline. Please try again later.');
            return;
        }

        if (searchQuery.length > 1 && stockData) {
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    }, [searchQuery, stockData, error]);

    const handleStockSelect = (stock) => {
        navigate('/dashboard/buy-sell', {
            state: { stock } // Pass stock data via navigation state
        });
        setSearchQuery('');
        setShowResults(false);
    };

    // Safe filtering with null checks
    const filteredResults = (stockData || []).filter(stock =>
        stock.symbol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    return (
        <div ref={wrapperRef} className="relative mx-4" style={{ height: '40px' }}>
            <div className="flex items-center h-full bg-white rounded-lg px-3 shadow-sm">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    className="text-gray-400"
                >
                    <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
                </svg>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    placeholder="Search stocks..."
                    className="w-48 ml-2 bg-transparent outline-none text-sm placeholder-gray-400"
                    disabled={!!error} // Disable input when server is offline
                />
            </div>

            {showResults && filteredResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredResults.map((stock) => (
                        <div
                            key={stock.symbol}
                            onClick={() => handleStockSelect(stock)}
                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <img
                                src={stock.logo_light}
                                alt={stock.symbol}
                                className="w-6 h-6 mr-2 rounded-full"
                            />
                            <div>
                                <div className="text-sm font-medium">{stock.symbol}</div>
                                <div className="text-xs text-gray-500 truncate">{stock.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StockSearch;