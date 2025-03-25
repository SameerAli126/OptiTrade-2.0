import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider.jsx';

const OverallReturn = ({ totalInvested, currentValue }) => {
    const { currentColor } = useStateContext();
    const safeTotal = totalInvested || 0;
    const safeCurrent = currentValue || 0;

    const overallReturn = safeCurrent - safeTotal;
    const returnPercentage = safeTotal > 0
        ? ((overallReturn / safeTotal) * 100).toFixed(2)
        : 0;

    const getColorClass = () => {
        if (overallReturn === 0) return 'text-white';
        return overallReturn > 0 ? 'text-green-400' : 'text-red-800';
    };

    return (
        <div className="text-white rounded-lg shadow-md p-4 m-2 flex-1" style={{ backgroundColor: currentColor }}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-md font-bold text-white flex items-center">
                    Overall Return
                </span>
                <span className={`text-lg px-2 py-1 rounded ${getColorClass()}`}>
                    {overallReturn > 0 ? '+' : ''}{returnPercentage}%
                </span>
            </div>
            <div className={`text-2xl font-bold ${getColorClass()}`}>
                {overallReturn > 0 ? '+' : ''}${Math.abs(overallReturn).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
        </div>
    );
};

export default OverallReturn;