import React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'; // Import the ButtonComponent
import { FiPlus } from 'react-icons/fi'; // Import the plus icon
import '@syncfusion/ej2/styles/customized/material.css';
import OHLCVMarketCap from './buy-sell/OHLCVMarketCap.jsx';
import StockData from './buy-sell/StockChart.jsx';

const StockInfo = ({ stock }) => {
    if (!stock) {
        return <div className="bg-gray-800 text-white rounded-lg shadow-md p-4">Buy & Sell</div>;
    }

    const handleAddToFavorites = () => {
        // Implement the logic to add the stock to favorites
        console.log(`Added ${stock.symbol} to favorites`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {/* Stock Information */}
            <div className="flex items-center mb-6">
                <img
                    src={stock.logo_high_light}
                    alt={`${stock.symbol} Logo`}
                    className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex items-center">
                    <div className="flex flex-col mr-4">
                        <div className="C1-top text-2xl font-semibold text-gray-900 dark:text-white">
                            {stock.symbol}
                        </div>
                        <div className="C1-bottom text-gray-600 dark:text-gray-300">
                            {stock.name}
                        </div>
                    </div>
                    <button
                        onClick={handleAddToFavorites}
                        className="text-xl text-gray-900 dark:text-white hover:text-blue-500"
                    >
                        <FiPlus />
                    </button>
                </div>
            </div>

            {/* OHLCV and Market Cap Data */}
            <OHLCVMarketCap stock={stock} />

            {/* Stock Data Chart */}
            <StockData stock={stock} />

            {/* Buy/Sell Buttons */}
            <div className="flex justify-between">
                <ButtonComponent
                    cssClass="e-success"
                    content="Buy"
                    style={{ padding: '10px 20px', borderRadius: '8px' }}
                />
                <ButtonComponent
                    cssClass="e-danger"
                    content="Sell"
                    style={{ padding: '10px 20px', borderRadius: '8px' }}
                />
            </div>
        </div>
    );
};

export default StockInfo;
