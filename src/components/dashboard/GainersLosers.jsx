// Filepath: E:\WEB JS\fyp\opti-trade\src\components\dashboard\GainersLosers.jsx

import React from "react";

function GainersLosers() {
    const gainers = [
        { symbol: "PANW", price: 204.31, change: "+17.68%" },
        { symbol: "ILMN", price: 212.65, change: "+14.05%" },
    ];

    const losers = [
        { symbol: "NFLX", price: 364.85, change: "-12.49%" },
        { symbol: "AAPL", price: 171.84, change: "-1.16%" },
    ];

    return (
        <div className="bg-cyan-700  text-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Gainers / Losers</h2>
            <div className="flex justify-between">
                <div className="w-1/2 pr-4"> {/* Add padding to the right */}
                    <h3 className="font-bold text-green-500">Gainers</h3>
                    <ul>
                        {gainers.map((stock) => (
                            <li key={stock.symbol} className="flex justify-between mb-2"> {/* Add margin-bottom */}
                                <span>{stock.symbol}</span>
                                <span className="text-green-500">{stock.change}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-1/2 pl-4"> {/* Add padding to the left */}
                    <h3 className="font-bold text-red-500">Losers</h3>
                    <ul>
                        {losers.map((stock) => (
                            <li key={stock.symbol} className="flex justify-between mb-2"> {/* Add margin-bottom */}
                                <span>{stock.symbol}</span>
                                <span className="text-red-500">{stock.change}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default GainersLosers;
