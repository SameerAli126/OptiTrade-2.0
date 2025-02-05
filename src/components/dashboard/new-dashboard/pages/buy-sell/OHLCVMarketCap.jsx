import React from 'react';

const OHLCVMarketCap = ({ stock }) => {
    const { open, high, low, close, volume, marketCap } = stock;

    const formatMarketCap = (marketCap) => {
        if (!marketCap) return 'N/A';

        if (marketCap >= 1e12) {
            return `$${(marketCap / 1e12).toFixed(2)}T`; // Trillions
        } else if (marketCap >= 1e9) {
            return `$${(marketCap / 1e9).toFixed(2)}B`; // Billions
        } else if (marketCap >= 1e6) {
            return `$${(marketCap / 1e6).toFixed(2)}M`; // Millions
        } else {
            return `$${marketCap.toLocaleString()}`; // Less than a million
        }
    };

    const formatValue = (value) => {
        if (value === null || value === undefined) return 'N/A';
        return typeof value === 'number' ? value.toLocaleString() : value;
    };

    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Open</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">${formatValue(open)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">High</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">${formatValue(high)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Low</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">${formatValue(low)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Close</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">${formatValue(close)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Volume</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatValue(volume)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Market Cap</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatMarketCap(marketCap)}</p>
            </div>
        </div>
    );
};

export default OHLCVMarketCap;