import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider.jsx';

const PortfolioValue = ({ value }) => {
    const { currentColor } = useStateContext();
    const safeValue = value || 0; // Handle undefined

    return (
        <div className="text-white rounded-lg shadow-md p-4 m-2 flex-1" style={{ backgroundColor: currentColor }}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-md font-bold text-white flex items-center">
                    Portfolio Value
                </span>
                <span className="text-lg px-2 py-1 rounded text-white">
                    0.00% {/* Placeholder */}
                </span>
            </div>
            <div className="text-2xl font-bold text-white">
                ${safeValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}
            </div>
        </div>
    );
};
export default PortfolioValue;