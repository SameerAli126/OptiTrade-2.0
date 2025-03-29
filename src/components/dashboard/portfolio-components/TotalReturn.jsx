import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider.jsx';

const TotalReturn = ({ value, percentage }) => {
    const { currentColor } = useStateContext();

    return (
        <div className="h-full w-full rounded-lg p-3 transition-all duration-300 hover:scale-[1.02]"
             style={{
                 backgroundColor: `${currentColor}10`,
                 border: `1px solid ${currentColor}20`
             }}>
            <p className="text-xs font-medium text-slate-400">Total Return</p>
            <p className="text-lg font-semibold my-1" style={{ color: currentColor }}>
                ${value}
            </p>
            <span className="text-xs font-medium"
                  style={{ color: percentage >= 0 ? currentColor : '#991b1b' }}>
        {percentage > 0 ? '+' : ''}{percentage}%
      </span>
        </div>
    );
};

export default TotalReturn;