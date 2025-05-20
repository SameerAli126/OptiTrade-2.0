import React, { useState, useEffect } from 'react';
import PerformanceToday from '../../../dashboard/portfolio-components/PerformanceToday';
import OverallReturn from '../../../dashboard/portfolio-components/OverallReturn.jsx';
import PortfolioCost from '../../../dashboard/portfolio-components/PortfolioCost.jsx';
import PortfolioValue from '../../../dashboard/portfolio-components/PortfolioValue.jsx';
import Dividends from '../../../dashboard/portfolio-components/Dividends.jsx';
import NewComponent from "../../portfolio-components/NewComponent.jsx";
import { useStateContext } from '../contexts/ContextProvider.jsx';
import DashHeader from '../components/DashHeader';
import PortfolioCard from "../../../dashboard/portfolio-components/PortfolioCard.jsx";
import TotalReturn from "../../../dashboard/portfolio-components/TotalReturn.jsx";
import AnnualizedReturn from "../../../dashboard/portfolio-components/AnnualizedReturn.jsx";
import CAGR from "../../../dashboard/portfolio-components//CAGR.jsx";
import DividendYield from "../../../dashboard/portfolio-components/DividendYield.jsx";
import axios from 'axios';
import { PORTFOLIO_DATA, USER_METRICS } from '../../../../config/apiEndpoints';

const Portfolio = () => {
    const { user } = useStateContext();
    const [portfolioData, setPortfolioData] = useState([]);
    const [metrics, setMetrics] = useState(null);

    // Calculate portfolio values
    const totalInvested = portfolioData.reduce((acc, item) => acc + item.total_invested, 0);
    const currentValue = portfolioData.reduce((acc, item) => acc + item.current_value, 0);
    const overallReturn = currentValue - totalInvested;

    // Fetch portfolio data
    useEffect(() => {
        const fetchPortfolio = async () => {
            if (!user?.id) return;

            try {
                const response = await fetch(`/api${PORTFOLIO_DATA}?user_id=${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });


                if (!response.ok) throw new Error('Failed to fetch portfolio');
                const data = await response.json();
                setPortfolioData(data.portfolio || []);
            } catch (error) {
                console.error('Error fetching portfolio data:', error);
                setPortfolioData([]);
            }
        };
        fetchPortfolio();
    }, [user?.id]);

    // Fetch metrics data
    useEffect(() => {
        const fetchMetrics = async () => {
            if (!user?.id) return;
            try {
                const response = await axios.get(
                    `https://archlinux.tail9023a4.ts.net/metrics/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setMetrics(response.data);
            } catch (error) {
                console.error('Error fetching metrics:', error);
            }
        };
        fetchMetrics();
    }, [user?.id]);

    return (
        <div className=" rounded-3xl p-6">
            <DashHeader category="Numbers" title="Portfolio" />

            <PortfolioCard>
                {/* All cards in a single 5-column grid */}
                <PerformanceToday />
                <OverallReturn
                    totalInvested={totalInvested}
                    currentValue={currentValue}
                />
                <PortfolioCost value={totalInvested || 0} />
                <PortfolioValue value={currentValue || 0} />
                <Dividends />
                <NewComponent />

                {/* Metric Cards */}
                {metrics && (
                    <>
                        <TotalReturn
                            value={metrics.total_return?.toFixed(2)}
                            percentage={metrics.total_return_percentage}
                        />
                        <AnnualizedReturn value={metrics.annualized_return?.toFixed(2)} />
                        <CAGR value={metrics.cagr?.toFixed(2)} />
                        <DividendYield value={metrics.dividend_yield?.toFixed(2)} />
                    </>
                )}
            </PortfolioCard>

            {/* Portfolio Holdings Table */}
            <div className="overflow-x-auto rounded-lg shadow-sm mt-6">
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${item.average_price?.toFixed(2) || '0.00'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${item.current_value?.toFixed(2) || '0.00'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${item.total_invested?.toFixed(2) || '0.00'}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Portfolio;