import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider';

const NewComponent = () => {
    const { currentColor } = useStateContext();
    const sampleValue = 42;
    const sampleChange = 5.67;

    return (
        <div
            className="rounded-lg p-3 transition-all duration-300 hover:scale-[1.02]"
            style={{
                backgroundColor: `${currentColor}10`,
                border: `1px solid ${currentColor}20`
            }}
        >
            <p className="text-xs font-medium text-slate-400">New Metric</p>
            <p
                className="text-lg font-semibold my-1"
                style={{ color: currentColor }}
            >
                {sampleValue}%
            </p>
            <span
                className="text-xs font-medium"
                style={{ color: sampleChange >= 0 ? currentColor : '#991b1b' }}
            >
        {sampleChange > 0 ? '+' : ''}{sampleChange}%
      </span>
        </div>
    );
};

export default NewComponent;