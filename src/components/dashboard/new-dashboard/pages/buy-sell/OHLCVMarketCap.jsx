import React from 'react';

const OHLCVMarketCap = ({ stock }) => {
    const safeGet = (obj, prop) => obj?.[prop] ?? 'N/A';

    const formatMarketCap = (marketCap) => {
        const value = parseFloat(marketCap);
        if (isNaN(value)) return 'N/A';

        if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
        if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
        if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
        return `$${value.toLocaleString()}`;
    };

    const formatValue = (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? 'N/A' : num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    return (
        <div className="grid grid-cols-5 gap-4 mb-6">
            {/* Open */}
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Open</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${formatValue(safeGet(stock, 'open'))}
                </p>
            </div>

            {/* High */}
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">High</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${formatValue(safeGet(stock, 'high'))}
                </p>
            </div>

            {/* Low */}
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Low</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${formatValue(safeGet(stock, 'low'))}
                </p>
            </div>

            {/* Close */}
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Close</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${formatValue(safeGet(stock, 'close'))}
                </p>
            </div>

            {/* Volume */}
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Volume</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {safeGet(stock, 'volume').toLocaleString()}
                </p>
            </div>

            {/* Market Cap */}
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Market Cap</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatMarketCap(safeGet(stock, 'marketCap'))}
                </p>
            </div>

            {/* Dividend Fields */}
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Last Dividend Date</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {safeGet(stock, 'last_dividend_date')}
                </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Last Dividend Amount</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {safeGet(stock, 'last_dividend_amount') !== 'N/A' ?
                        `$${parseFloat(stock.last_dividend_amount).toFixed(2)}` : 'N/A'}
                </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Dividend Yield</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {safeGet(stock, 'dividend_yield')}
                </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">Payment Frequency</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {safeGet(stock, 'payment_frequency')}
                </p>
            </div>
        </div>
    );
};

export default OHLCVMarketCap;