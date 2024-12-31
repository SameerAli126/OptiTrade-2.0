// Filepath: E:\WEB JS\fyp\opti-trade\src\components\dashboard\StockDetails.jsx

import React from "react";

function StockDetails() {
    const stock = {
        symbol: "AAPL",
        price: 171.84,
        change: "-1.16%",
        details: "Apple Inc. is an American multinational technology company headquartered in Cupertino, California.",
    };

    return (
        <div className="bg-cyan-700 text-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Stock Details</h2>
            <div className="flex flex-col">
                <div className="flex justify-between mb-2">
                    <span className="font-bold">{stock.symbol}</span>
                    <span className={`font-bold ${stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.change}
                    </span>
                </div>
                <div className="text-gray-400 mb-2">{stock.details}</div>
                <div className="text-xl font-bold">{stock.price.toFixed(2)}</div>
            </div>
        </div>
    );
}

export default StockDetails;
