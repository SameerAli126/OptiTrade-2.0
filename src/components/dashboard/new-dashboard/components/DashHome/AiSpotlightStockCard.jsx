// src/components/DashHome/AISpotlightStockCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import { FaChartLine, FaLightbulb } from 'react-icons/fa'; // Example icons
//push for build error
const AISpotlightStockCard = ({ stock, currentColor }) => {
    if (!stock) return null;

    // Determine color based on AI signal (customize as needed)
    let signalColor = 'text-gray-500';
    if (stock.aiSignal?.toLowerCase().includes('buy')) signalColor = 'text-green-500';
    else if (stock.aiSignal?.toLowerCase().includes('sell') || stock.aiSignal?.toLowerCase().includes('pullback')) signalColor = 'text-red-500';


    return (
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
                <div className="flex items-center mb-3">
                    {stock.logoUrl && <img src={stock.logoUrl} alt={`${stock.name} logo`} className="w-8 h-8 mr-3 rounded-full" />}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{stock.name} ({stock.symbol})</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Price: ${stock.currentPrice}
                            <span className={`ml-2 ${stock.priceChangePercent?.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                ({stock.priceChangePercent})
              </span>
                        </p>
                    </div>
                </div>

                <div className="my-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                        <FaLightbulb className="mr-2 mt-1 flex-shrink-0" style={{ color: currentColor }} />
                        <span className="font-semibold">AI Signal:</span>
                        <span className={signalColor}>{stock.aiSignal}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-5">
                        {stock.aiRationale}
                    </p>
                </div>
            </div>

            <Link
                to={`/dashboard/buy-sell?symbol=${stock.symbol}`} // Adjust link as needed
                className="mt-4 text-sm font-medium text-white py-2 px-4 rounded-lg text-center transition duration-150"
                style={{ backgroundColor: currentColor, }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
                View Details
            </Link>
        </div>
    );
};

export default AISpotlightStockCard;