import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider.jsx';

const PortfolioValue = () => {
    const { currentColor } = useStateContext();
    const portfolioValueValue = 0;
    const portfolioValueAmount = 12345.67;
    const isNeutral = false;

    const getColorClass = (value, isNeutral) => {
        if (isNeutral) return 'text-white';
        if (value > 0) return 'text-green-400';
        if (value < 0) return 'text-red-800';
        return 'text-white';
    };

    return (
        <div className="text-white rounded-lg shadow-md p-4 m-2 flex-1" style={{ backgroundColor: currentColor }}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-md font-bold text-white flex items-center">
                    Portfolio Value
                </span>
                <span className={`text-lg px-2 py-1 rounded ${getColorClass(portfolioValueValue, isNeutral)}`}>
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
