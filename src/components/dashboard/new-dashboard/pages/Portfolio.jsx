// Filepath: src/components/dashboard/new-dashboard/pages/Portfolio.jsx

import React, { useState, useEffect } from 'react';
import PerformanceToday from '../../../dashboard/portfolio-components/PerformanceToday';
import OverallReturn from '../../../dashboard/portfolio-components/OverallReturn.jsx';
import PortfolioCost from '../../../dashboard/portfolio-components/PortfolioCost.jsx';
import PortfolioValue from '../../../dashboard/portfolio-components/PortfolioValue.jsx';
import Dividends from '../../../dashboard/portfolio-components/Dividends.jsx';
import NewComponent from "../../portfolio-components/NewComponent.jsx";
import { useStateContext } from '../contexts/ContextProvider.jsx';
import DashHeader from '../components/DashHeader';

const Portfolio = () => {

    const [portfolioData, setPortfolioData] = useState([]);

    // Calculate values here
    const totalInvested = portfolioData.reduce((acc, item) => acc + item.total_invested, 0);
    const currentValue = portfolioData.reduce((acc, item) => acc + item.current_value, 0);
    const overallReturn = currentValue - totalInvested;

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await fetch('https://archlinux.tail9023a4.ts.net/portfolio?user_id=4');
                const data = await response.json();
                setPortfolioData(data.portfolio);
            } catch (error) {
                console.error('Error fetching portfolio data:', error);
            }
        };

        fetchPortfolio();
    }, []);

    return (
        <div className="bg-white rounded-3xl p-6">
            <DashHeader category="Numbers" title="Portfolio" />

            {/* Grid with 3 columns on medium screens */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <PerformanceToday />
                <OverallReturn
                    totalInvested={totalInvested}
                    currentValue={currentValue}
                />
                <PortfolioCost value={totalInvested || 0} />
                <PortfolioValue value={currentValue || 0} />
                <Dividends />
                <NewComponent />
            </div>

            {/* Portfolio Holdings Table */}
            <div className="overflow-x-auto rounded-lg shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Invested</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {portfolioData.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.symbol}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.average_price.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.current_value.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.total_invested.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Portfolio;