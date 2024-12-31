// Filepath: E:\WEB JS\fyp\opti-trade\src\components\dashboard\StockDetailInsights.jsx

import React from "react";

function StockDetailInsights({ stock }) {
    if (!stock) {
        return <div className="bg-gray-800 text-white rounded-lg shadow-md p-4">Select a stock to view details.</div>;
    }

    return (
        <div className="bg-cyan-700 text-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">{stock.symbol} Insights</h2>
            <div className="flex flex-col">
                <div className="flex justify-between mb-2">
                    <span className="font-bold">Price:</span>
                    <span className="text-xl font-bold">{stock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-bold">Change:</span>
                    <span className={`font-bold ${stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.change}
                    </span>
                </div>
                <div className="text-gray-400 mb-2">{stock.details}</div>
                {/* Add more stock-specific insights here */}
            </div>
        </div>
    );
}

export default StockDetailInsights;
