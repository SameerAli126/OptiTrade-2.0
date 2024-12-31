import React from 'react';
import Portfolio from './dashboard-panel/Portfolio';
import Watchlist from './dashboard-panel/Watchlist';
import News from './dashboard-panel/News';
import Screener from './dashboard-panel/Screener';
import Quote from './dashboard-panel/Quote';

const DashboardPanel = React.memo(({ onPanelClick }) => {
    return (
        <nav className="bg-gray-800 text-white w-full p-4 gap-1 mt-4 rounded-lg shadow-md">
            <ul className="space-y-2">
                <li className="hover:bg-cyan-600 cursor-pointer p-2 rounded" onClick={() => onPanelClick('DashHome')}>
                    DashHome
                </li>
                <li className="hover:bg-cyan-600 p-2 rounded cursor-pointer" onClick={() => onPanelClick('Portfolio')}>
                    <Portfolio />
                </li>
                <li className="hover:bg-cyan-600 p-2 rounded cursor-pointer" onClick={() => onPanelClick('Watchlist')}>
                    <Watchlist />
                </li>
                <li className="hover:bg-cyan-600 p-2 rounded cursor-pointer" onClick={() => onPanelClick('News')}>
                    <News />
                </li>
                <li className="hover:bg-cyan-600 p-2 rounded cursor-pointer" onClick={() => onPanelClick('Screener')}>
                    <Screener />
                </li>
                <li className="hover:bg-cyan-600 p-2 rounded cursor-pointer" onClick={() => onPanelClick('Quote')}>
                    <Quote />
                </li>
            </ul>
        </nav>
    );
});

export default DashboardPanel;
