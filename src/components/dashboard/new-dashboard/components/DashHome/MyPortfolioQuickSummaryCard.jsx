// src/components/DashHome/MyPortfolioQuickSummaryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaRobot } from 'react-icons/fa';

const MyPortfolioQuickSummaryCard = ({ summary, currentColor }) => {
    if (!summary) return null;

    return (
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md w-full "> {/* Adjust width as needed */}
            <div className="flex items-center mb-4">
                <FaBriefcase className="text-2xl mr-3" style={{ color: currentColor }} />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">My Portfolio Summary</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">${summary.totalValue}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Today's P&L</p>
                    <p className={`text-lg font-semibold ${summary.todaysPnL_absolute?.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        ${summary.todaysPnL_absolute} ({summary.todaysPnL_percent})
                    </p>
                </div>
                <div className="col-span-2"> {/* Overall Return can span two columns or be placed appropriately */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">Overall Return</p>
                    <p className={`text-lg font-semibold ${summary.overallReturn_absolute?.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        ${summary.overallReturn_absolute} ({summary.overallReturn_percent})
                    </p>
                </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <FaRobot className="mr-2 mt-1 flex-shrink-0" style={{ color: currentColor }} />
                    <span className="font-semibold">AI Portfolio Tip:</span>
                </p>
                <p className="text-md text-gray-600 dark:text-gray-400 mt-1 ml-5">
                    {summary.aiPortfolioTip}
                </p>
            </div>

            <Link
                to="/dashboard/portfolio"
                className="mt-6 block text-sm font-medium text-white py-2 px-4 rounded-lg text-center transition duration-150"
                style={{ backgroundColor: currentColor }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
                View Full Portfolio
            </Link>
        </div>
    );
};

export default MyPortfolioQuickSummaryCard;