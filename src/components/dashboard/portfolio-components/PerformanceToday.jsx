import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider';

const PerformanceToday = () => {
    const { currentColor } = useStateContext();
    const performanceValue = -1.23;
    const performanceAmount = -182.74;

    return (
        <div
            className="rounded-lg p-3 transition-all duration-300 hover:scale-[1.02]"
            style={{
                backgroundColor: `${currentColor}10`,
                border: `1px solid ${currentColor}20`
            }}
        >
            <p className="text-xs font-medium text-slate-400">Today's Performance</p>
            <p
                className="text-lg font-semibold my-1"
                style={{ color: currentColor }}
            >
                ${Math.abs(performanceAmount).toFixed(2)}
            </p>
            <span
                className="text-xs font-medium"
                style={{ color: performanceAmount >= 0 ? currentColor : '#991b1b' }}
            >
        {performanceAmount > 0 ? '+' : ''}{performanceValue}%
      </span>
        </div>
    );
};

export default PerformanceToday;