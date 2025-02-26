import React from 'react';

const OHLCVMarketCap = ({ stock }) => {
    const { open, high, low, close, volume, marketCap, last_dividend_date, last_dividend_amount, dividend_yield, payment_frequency } = stock;

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
        <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Open</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">${formatValue(open)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">High</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">${formatValue(high)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Low</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">${formatValue(low)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Close</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">${formatValue(close)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Volume</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatValue(volume)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Market Cap</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatMarketCap(marketCap)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Last Dividend Date</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{last_dividend_date || 'N/A'}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Last Dividend Amount</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{last_dividend_amount !== null ? `$${last_dividend_amount.toFixed(2)}` : 'N/A'}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Dividend Yield</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{dividend_yield || 'N/A'}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Payment Frequency</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{payment_frequency || 'N/A'}</p>
            </div>
        </div>
    );
};

export default OHLCVMarketCap;
