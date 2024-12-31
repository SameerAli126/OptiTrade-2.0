import React from 'react';

const PortfolioValue = () => {
    const portfolioValueValue = 0; // Example value, replace with dynamic data as needed
    const portfolioValueAmount = 12345.67; // Example value, replace with dynamic data as needed
    const isNeutral = false; // Adjust this flag as needed

    const getColorClass = (value, isNeutral) => {
        if (isNeutral) return 'text-white';
        if (value > 0) return 'text-green-400';
        if (value < 0) return 'text-red-800';
        return 'text-white';
    };

    return (
        <div className="bg-cyan-700 text-white rounded-lg shadow-md p-4 m-2 flex-1">
            <div className="flex items-center justify-between mb-2">
                <span className="text-md font-bold text-white flex items-center">
                    Portfolio Value
                </span>
                <span
                    className={`text-lg px-2 py-1 rounded ${getColorClass(portfolioValueValue, isNeutral)}`}>
                    {portfolioValueValue > 0 ? '+' : ''}{portfolioValueValue}%
                </span>
            </div>
            <div className={`text-2xl font-bold ${getColorClass(portfolioValueAmount, isNeutral)}`}>
                {portfolioValueAmount > 0 && !isNeutral ? '+' : ''}${portfolioValueAmount.toLocaleString()}
            </div>
        </div>
    );
};

export default PortfolioValue;
