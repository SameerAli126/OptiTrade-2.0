import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider.jsx';

const PortfolioCost = () => {
    const { currentColor } = useStateContext();
    const portfolioCostValue = 0;
    const portfolioCostAmount = 10000;
    const isNeutral = true;

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
                    Portfolio Cost
                </span>
                <span className={`text-lg px-2 py-1 rounded ${getColorClass(portfolioCostValue, isNeutral)}`}>
                    {portfolioCostValue > 0 ? '+' : ''}{portfolioCostValue}%
                </span>
            </div>
            <div className={`text-2xl font-bold ${getColorClass(portfolioCostAmount, isNeutral)}`}>
                {portfolioCostAmount > 0 && !isNeutral ? '+' : ''}${portfolioCostAmount.toLocaleString()}
            </div>
        </div>
    );
};

export default PortfolioCost;
