import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider';

const PortfolioCost = ({ value }) => {
    const { currentColor } = useStateContext();
    const safeValue = value || 0;

    return (
        <div
            className="rounded-lg p-3 transition-all duration-300 hover:scale-[1.02]"
            style={{
                backgroundColor: `${currentColor}10`,
                border: `1px solid ${currentColor}20`
            }}
        >
            <p className="text-xs font-medium text-slate-400">Total Invested</p>
            <p
                className="text-lg font-semibold my-1"
                style={{ color: currentColor }}
            >
                ${safeValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}
            </p>
            <span
                className="text-xs font-medium text-slate-400"
            >
        Since inception
      </span>
        </div>
    );
};

export default PortfolioCost;