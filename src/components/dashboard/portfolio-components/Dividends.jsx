import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider';

const Dividends = () => {
    const { currentColor } = useStateContext();
    const dividendsValue = 1.23;
    const dividendsAmount = 12345;

    return (
        <div
            className="rounded-lg p-3 transition-all duration-300 hover:scale-[1.02]"
            style={{
                backgroundColor: `${currentColor}10`,
                border: `1px solid ${currentColor}20`
            }}
        >
            <p className="text-xs font-medium text-slate-400">Dividends YTD</p>
            <p
                className="text-lg font-semibold my-1"
                style={{ color: currentColor }}
            >
                ${dividendsAmount.toLocaleString()}
            </p>
            <span
                className="text-xs font-medium"
                style={{ color: dividendsValue >= 0 ? currentColor : '#991b1b' }}
            >
        {dividendsValue > 0 ? '+' : ''}{dividendsValue}%
      </span>
        </div>
    );
};

export default Dividends;