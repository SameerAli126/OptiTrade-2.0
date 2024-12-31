import React from 'react';

const OverallReturn = () => {
    const overallReturnValue = 1.23; // Example value, replace with dynamic data as needed
    const overallReturnAmount = 12444; // Example value, replace with dynamic data as needed
    const isNeutral = true; // Set this flag to true for neutral values

    // Determine the color class based on the sign of the value
    const getColorClass = (value, isNeutral) => {
        if (isNeutral) return 'text-white'; // Neutral color
        if (value > 0) return 'text-green-400'; // Updated to match the second component
        if (value < 0) return 'text-red-800'; // Updated to match the second component
        return 'text-white';
    };

    return (
        <div className="bg-cyan-700 text-white rounded-lg shadow-md p-4 m-2 flex-1"> {/* Updated background color */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-md font-bold text-white flex items-center">
                    Overall Return
                </span>
                <span
                    className={`text-lg px-2 py-1 rounded ${getColorClass(overallReturnValue, false)}`}> {/* Updated text size */}
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
