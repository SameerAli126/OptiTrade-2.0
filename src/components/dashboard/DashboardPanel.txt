// Filepath: E:\WEB JS\fyp\opti-trade\src\components\dashboard\DashboardPanel.jsx

import React from 'react';
import { FaHome, FaChartPie, FaList, FaNewspaper, FaSearch, FaQuoteLeft, FaExchangeAlt } from 'react-icons/fa'; // Import icons
import Portfolio from './dashboard-panel/Portfolio';
import Watchlist from './dashboard-panel/Watchlist';
import News from './dashboard-panel/News';
import Screener from './dashboard-panel/Screener';
import Quote from './dashboard-panel/Quote';
import BuySell from './dashboard-panel/BuySell_o';

const DashboardPanel = React.memo(({ onPanelClick }) => {
    return (
        <nav className="bg-gray-800 text-white w-full p-4 gap-1 mt-4 rounded-lg shadow-md">
            <ul className="space-y-2">
                <li className="hover:bg-cyan-600 cursor-pointer p-2 rounded flex items-center" onClick={() => onPanelClick('DashHome')}>
                    <FaHome className="mr-2" /> DashHome
                </li>
                <li className="hover:bg-cyan-600 p-2 rounded cursor-pointer flex items-center" onClick={() => onPanelClick('Portfolio')}>
                    <FaChartPie className="mr-2" /> <Portfolio />
                </li>
                <li className="hover:bg-cyan-600 p-2 rounded cursor-pointer flex items-center" onClick={() => onPanelClick('Watchlist')}>
                    <FaList className="mr-2" /> <Watchlist />
                </li>
                <li className="hover:bg-cyan-600 p-2 rounded cursor-pointer flex items-center" onClick={() => onPanelClick('News')}>
                    <FaNewspaper className="mr-2" /> <News />
                </li>
                <li className="hover:bg-cyan-600 p-2 rounded cursor-pointer flex items-center" onClick={() => onPanelClick('Screener')}>
                    <FaSearch className="mr-2" /> <Screener />
                </li>
                <li className="hover:bg-cyan-600 p-2 rounded cursor-pointer flex items-center" onClick={() => onPanelClick('Quote')}>
                    <FaQuoteLeft className="mr-2" /> <Quote />
                </li>
                <li className="hover:bg-cyan-600 p-2 rounded cursor-pointer flex items-center" onClick={() => onPanelClick('BuySell')}>
                    <FaExchangeAlt className="mr-2" /> <BuySell />
                </li>
            </ul>
        </nav>
    );
});

export default DashboardPanel;
