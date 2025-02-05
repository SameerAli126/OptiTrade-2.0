import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashHome from './new-dashboard/pages/DashHome';
import Portfolio from './new-dashboard/pages/Portfolio';
import DashScreener from './new-dashboard/pages/DashScreener';
import DashNews from './new-dashboard/pages/DashNews';
import Watchlist from './new-dashboard/pages/Watchlist';
import StockInfo from './new-dashboard/pages/StockInfo'; // Import the new StockInfo page

const DashboardRoutes = ({ selectedStock, setSelectedStock }) => {
    return (
        <Routes>
            <Route path="/home" element={<DashHome />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/screener" element={<DashScreener setSelectedStock={setSelectedStock} />} />
            <Route path="/news" element={<DashNews />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/buy-sell" element={<StockInfo stock={selectedStock} />} /> {/* Use StockInfo as the BuySell_o page */}
        </Routes>
    );
};

export default DashboardRoutes;