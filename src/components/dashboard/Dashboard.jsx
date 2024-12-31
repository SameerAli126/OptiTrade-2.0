// Filepath: E:\WEB JS\fyp\opti-trade\src\components\dashboard\Dashboard.jsx

import React, { useState, useEffect } from "react";
import DashboardPanel from "./DashboardPanel"; // Adjusted import path
import DashHome from "./dashboard-panel/DashHome"; // Import DashHome component
import PerformanceToday from "./dashboard-panel/portfolio-components/PerformanceToday";
import OverallReturn from "./dashboard-panel/portfolio-components/OverallReturn";
import PortfolioCost from "./dashboard-panel/portfolio-components/PortfolioCost";
import PortfolioValue from "./dashboard-panel/portfolio-components/PortfolioValue";
import Dividends from "./dashboard-panel/portfolio-components/Dividends";
import ScreenerWorker from "./dashboard-panel/screener-components/ScreenerWorker";
import NewsWorker from "./dashboard-panel/news-components/NewsWorker"; // Import the new NewsWorker component
import QuoteDashboard from "./dashboard-panel/quote-components/QuoteDashboard"; // Import the QuoteDashboard component
import Watchlist from "./Watchlist.jsx";
import { Menu } from 'lucide-react';
import UserProfile from "../user-profile/UserProfile"; // Import UserProfile component

const Dashboard = () => {
    const [selectedContent, setSelectedContent] = useState('DashHome');

    useEffect(() => {
        console.log('Dashboard component rendered');
    }, []); // Empty dependency array ensures this runs only once on mount

    const handlePanelClick = (content) => {
        setSelectedContent(content);
    };

    return (
        <div className="bg-gray-800 min-h-screen flex flex-col">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center bg-cyan-400 p-4 shadow-md w-full">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <UserProfile /> {/* Add UserProfile component */}
                    <button className="bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition-colors duration-200">
                        <Menu className="w-5 h-5"/>
                    </button>
                </div>
            </div>

            {/* Content Layout */}
            <div className="flex flex-grow">
                {/* Left Sidebar */}
                <div className="flex flex-col gap-4 w-1/4 ">
                    <DashboardPanel onPanelClick={handlePanelClick} />
                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-4 w-3/4 p-4">
                    {selectedContent === 'DashHome' && <DashHome />}
                    {selectedContent === 'Portfolio' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <PerformanceToday />
                            <OverallReturn />
                            <PortfolioCost />
                            <PortfolioValue />
                            <Dividends />
                        </div>
                    )}
                    {selectedContent === 'Screener' && <ScreenerWorker />}
                    {selectedContent === 'Watchlist' && <Watchlist />}
                    {selectedContent === 'News' && <NewsWorker />} {/* Render NewsWorker when selected */}
                    {selectedContent === 'Quote' && <QuoteDashboard />} {/* Render QuoteDashboard when selected */}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Dashboard);
