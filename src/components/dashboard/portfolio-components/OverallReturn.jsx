import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider.jsx';

const OverallReturn = () => {
    const { currentColor } = useStateContext();
    const overallReturnValue = 1.23;
    const overallReturnAmount = 12444;
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
                    Overall Return
                </span>
                <span className={`text-lg px-2 py-1 rounded ${getColorClass(overallReturnValue, false)}`}>
                    {overallReturnValue > 0 ? '+' : ''}{overallReturnValue}%
                </span>
            </div>
            <div className={`text-2xl font-bold ${getColorClass(overallReturnAmount, isNeutral)}`}>
                {overallReturnAmount > 0 && !isNeutral ? '+' : ''}${overallReturnAmount.toLocaleString()}
            </div>
        </div>
    );
};

export default OverallReturn;
