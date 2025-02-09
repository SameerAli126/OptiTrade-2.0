import React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import OHLCVMarketCap from './OHLCVMarketCap.jsx';

const StockDetails = ({ stock }) => {
    if (!stock) {
        return <div className="bg-gray-800 text-white rounded-lg shadow-md p-4">Buy & Sell</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {/* Stock Information */}
            <div className="flex items-center mb-6">
                <img
                    src={stock.logo_high_light}
                    alt={`${stock.symbol} Logo`}
                    className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {stock.symbol} - ${stock.close.toFixed(2)}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">{stock.name}</p>
                </div>
            </div>

            {/* OHLCV and Market Cap Data */}
            <OHLCVMarketCap stock={stock} />

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

export default StockDetails;
