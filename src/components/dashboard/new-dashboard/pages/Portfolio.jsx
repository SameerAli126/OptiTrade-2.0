// Filepath: src/components/dashboard/new-dashboard/pages/Portfolio.jsx

import React from 'react';
import PerformanceToday from '../../../dashboard/portfolio-components/PerformanceToday';
import OverallReturn from '../../../dashboard/portfolio-components/OverallReturn.jsx';
import PortfolioCost from '../../../dashboard/portfolio-components/PortfolioCost.jsx';
import PortfolioValue from '../../../dashboard/portfolio-components/PortfolioValue.jsx';
import Dividends from '../../../dashboard/portfolio-components/Dividends.jsx';
import NewComponent from "../../portfolio-components/NewComponent.jsx";
import { useStateContext } from '../contexts/ContextProvider.jsx'; // Import the context
import DashHeader from '../components/DashHeader'; // Import DashHeader

// New component for the sixth box


const Portfolio = () => {
    return (
        <div className=" bg-white rounded-3xl">
            <DashHeader category="Numbers" title="Portfolio" /> {/* Add DashHeader here */}
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
