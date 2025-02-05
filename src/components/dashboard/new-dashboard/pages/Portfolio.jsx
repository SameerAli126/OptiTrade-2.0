// Filepath: src/components/dashboard/new-dashboard/pages/Portfolio.jsx

import React from 'react';
import PerformanceToday from '../../../dashboard/portfolio-components/PerformanceToday';
import OverallReturn from '../../../dashboard/portfolio-components/OverallReturn.jsx';
import PortfolioCost from '../../../dashboard/portfolio-components/PortfolioCost.jsx';
import PortfolioValue from '../../../dashboard/portfolio-components/PortfolioValue.jsx';
import Dividends from '../../../dashboard/portfolio-components/Dividends.jsx';
import { useStateContext } from '../contexts/ContextProvider.jsx'; // Import the context

// New component for the sixth box
const NewComponent = () => (
    <div className="bg-cyan-700 text-white rounded-lg shadow-md p-4 m-2 flex-1">
        <h2 className="text-lg font-semibold mb-4">New Component</h2>
        <p>This is a new component for the portfolio.</p>
    </div>
);

const Portfolio = () => {
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PerformanceToday />
                <OverallReturn />
                <PortfolioCost />
                <PortfolioValue />
                <Dividends />
                <NewComponent />
            </div>
        </div>
    );
};

export default Portfolio;
