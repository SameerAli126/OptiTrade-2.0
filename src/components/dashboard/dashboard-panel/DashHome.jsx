import React from 'react';
import Watchlist from '../Watchlist';
import TopNews from '../TopNews';
import TodaysMarkets from '../TodaysMarkets';
import GainersLosers from '../GainersLosers';
import StockDetailInsights from '../StockDetailInsights';

const DashHome = () => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Dashboard Overview</h2>
            <div className="grid grid-cols-3 grid-rows-3 gap-4">
                {/* Watchlist at the top left */}
                <div className="bg-gray-900 p-4 rounded-lg shadow-lg col-start-1 row-start-1">
                    <Watchlist />
                </div>
                {/* Top News below the Watchlist */}
                <div className="bg-gray-900 p-4 rounded-lg shadow-lg col-start-1 row-start-2">
                    <TopNews />
                </div>
                {/* Today's Markets at the top right, spanning two rows and columns */}
                <div className="bg-gray-900 p-4 rounded-lg shadow-lg col-span-2 row-span-2 col-start-2 row-start-1">
                    <TodaysMarkets />
                </div>
                {/* GainersLosers below Today's Markets */}
                <div className="bg-gray-900 p-4 rounded-lg shadow-lg col-start-2 row-start-3">
                    <GainersLosers />
                </div>
                {/* StockDetailInsights below the mid section of Today's Markets */}
                <div className="bg-gray-900 p-4 rounded-lg shadow-lg col-start-3 row-start-3">
                    <StockDetailInsights />
                </div>
            </div>
        </div>
    );
};

export default DashHome;
