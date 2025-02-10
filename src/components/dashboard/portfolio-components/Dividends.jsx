import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider.jsx';

const Dividends = () => {
    const { currentColor } = useStateContext();
    const dividendsValue = 1.23;
    const dividendsAmount = 12345;
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
                    Dividends
                </span>
                <span className={`text-lg px-2 py-1 rounded ${getColorClass(dividendsValue, false)}`}>
                    {dividendsValue > 0 ? '+' : ''}{dividendsValue}%
                </span>
            </div>
            <div className={`text-2xl font-bold ${getColorClass(dividendsAmount, isNeutral)}`}>
                {dividendsAmount > 0 && !isNeutral ? '+' : ''}${dividendsAmount.toLocaleString()}
            </div>
        </div>
    );
};

export default Dividends;
