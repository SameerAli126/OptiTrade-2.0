import React, { useState, useEffect } from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { FiPlus, FiCheck } from 'react-icons/fi';
import '@syncfusion/ej2/styles/customized/material.css';
import OHLCVMarketCap from './buy-sell/OHLCVMarketCap.jsx';
import StockData from './buy-sell/StockChart.jsx';
import { WatchlistService } from '../services/WatchlistService';
import { useStateContext } from '../contexts/ContextProvider';

const StockInfo = ({ stock }) => {
    const { user } = useStateContext();
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    // Check if stock is in watchlist on component mount
    useEffect(() => {
        const checkWatchlistStatus = async () => {
            if (user?.id && stock?.symbol) {
                try {
                    const watchlist = await WatchlistService.getWatchlist(user.id);
                    const symbols = watchlist.map(item => item.stock_symbol);
                    setIsInWatchlist(symbols.includes(stock.symbol));
                } catch (error) {
                    console.error('Error checking watchlist status:', error);
                }
            }
        };
        checkWatchlistStatus();
    }, [user, stock]);

    const handleAddToFavorites = async () => {
        if (!user?.id || !stock?.symbol) return;

        try {
            const success = await WatchlistService.addToWatchlist(user.id, stock.symbol);
            if (success) setIsInWatchlist(true);
        } catch (error) {
            console.error('Watchlist update error:', error);
        }
    };

    if (!stock) {
        return <div className="bg-gray-800 text-white rounded-lg shadow-md p-4">Buy & Sell</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
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
                        onClick={!isInWatchlist ? handleAddToFavorites : undefined}
                        className={`text-xl p-2 rounded-full transition-all duration-300 ${
                            isInWatchlist
                                ? 'text-green-500 bg-green-100 dark:bg-green-900/30 cursor-default'
                                : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                        }`}
                        disabled={isInWatchlist}
                    >
                        {isInWatchlist ? (
                            <FiCheck className="w-5 h-5" />
                        ) : (
                            <FiPlus className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            <OHLCVMarketCap stock={stock} />
            <StockData stock={stock} />

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