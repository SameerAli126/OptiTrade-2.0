import React from 'react';

const PerformanceToday = () => {
    const performanceValue = -1.23; // Example value, replace with dynamic data as needed
    const performanceAmount = -182.74; // Example value, replace with dynamic data as needed

    const getColorClass = (value) => {
        if (value > 0) return 'text-green-400';
        if (value < 0) return 'text-red-800';
        return 'text-white';
    };

    return (
        <div className="bg-cyan-700 text-white rounded-lg shadow-md p-4 m-2 flex-1">
            <div className="flex items-center justify-between mb-2">
                <span className="text-md font-bold text-white flex items-center">
                    Performance Today
                </span>
                <span
                    className={`text-lg px-2 py-1 rounded ${getColorClass(performanceValue)}`}>
                    {performanceValue > 0 ? '+' : ''}{performanceValue}%
                </span>
            </div>
            <div className={`text-2xl font-bold ${getColorClass(performanceAmount)}`}>
                {performanceAmount > 0 ? '+' : ''}${performanceAmount.toFixed(2)}
            </div>
        </div>
    );
};

export default PerformanceToday;
