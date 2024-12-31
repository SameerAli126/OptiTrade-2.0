import React from "react";

function Watchlist() {
    const stocks = [
        { symbol: "ZM", price: 62.63, name: "Zoom Video Communications", change: "-4.63%" },
        { symbol: "WDAY", price: 196.19, name: "Workdays, Inc.", change: "+1.72%" },
        { symbol: "XLNX", price: 194.92, name: "Xilinx, Inc.", change: "-9.99%" },
        { symbol: "VRSN", price: 222.04, name: "VeriSign, Inc.", change: "+0.42%" },
    ];

    return (
        <div className="bg-cyan-700 text-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Watchlist</h2>
                <button className="text-sm bg-gray-700 px-3 py-1 rounded-lg">Close</button>
            </div>
            <ul className="space-y-4">
                {stocks.map((stock) => (
                    <li key={stock.symbol} className="flex justify-between items-center">
                        <div>
                            <span className="text-sm font-medium">{stock.symbol}</span>
                            <div className="text-xs text-gray-400">{stock.name}</div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-lg font-semibold">{stock.price.toFixed(2)}</span>
                            <span
                                className={`text-sm font-medium ${
                                    stock.change.startsWith("+") ? "text-green-400" : "text-red-400"
                                }`}
                            >
                {stock.change}
              </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Watchlist;
