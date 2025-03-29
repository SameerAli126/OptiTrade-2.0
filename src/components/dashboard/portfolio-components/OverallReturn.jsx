import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider';

const OverallReturn = ({ totalInvested, currentValue }) => {
    const { currentColor } = useStateContext();
    const overallReturn = currentValue - totalInvested;
    const returnPercentage = totalInvested > 0
        ? ((overallReturn / totalInvested) * 100).toFixed(2)
        : 0;

    return (
        <div
            className="rounded-lg p-3 transition-all duration-300 hover:scale-[1.02]"
            style={{
                backgroundColor: `${currentColor}10`,
                border: `1px solid ${currentColor}20`
            }}
        >
            <p className="text-xs font-medium text-slate-400">Overall Return</p>
            <p
                className="text-lg font-semibold my-1"
                style={{ color: currentColor }}
            >
                ${Math.abs(overallReturn).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <span
                className="text-xs font-medium"
                style={{ color: overallReturn >= 0 ? currentColor : '#991b1b' }}
            >
        {overallReturn > 0 ? '+' : ''}{returnPercentage}%
      </span>
        </div>
    );
};

export default OverallReturn;