// src/components/DashHome/AIOpportunitiesRadarCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearchDollar, FaBrain } from 'react-icons/fa';

const AIOpportunitiesRadarCard = ({ opportunities, currentColor }) => {
    if (!opportunities || opportunities.length === 0) {
        return (
            <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md w-full lg:w-1/2"> {/* Adjust width */}
                <div className="flex items-center mb-4">
                    <FaSearchDollar className="text-2xl mr-3" style={{ color: currentColor }} />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">AI Opportunities Radar</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">No specific AI opportunities highlighted at the moment. Explore the screener for more.</p>
                <Link
                    to="/dashboard/screener"
                    className="mt-6 block text-sm font-medium text-white py-2 px-4 rounded-lg text-center transition duration-150"
                    style={{ backgroundColor: currentColor }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                    Go to Stock Screener
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md w-full lg:w-1/2"> {/* Adjust width */}
            <div className="flex items-center mb-4">
                <FaSearchDollar className="text-2xl mr-3" style={{ color: currentColor }} />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">AI Opportunities Radar</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Discover potential based on AI-driven screens:</p>

            <div className="space-y-4">
                {opportunities.slice(0, 3).map((opp, index) => ( // Show up to 3 opportunities
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <Link to={`/dashboard/buy-sell?symbol=${opp.symbol}`} className="hover:underline">
                                    <h4 className="font-semibold text-md text-gray-800 dark:text-gray-100">
                                        {opp.name} ({opp.symbol})
                                    </h4>
                                </Link>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Price: ${opp.currentPrice}</p>
                            </div>
                            {opp.logoUrl && <img src={opp.logoUrl} alt={`${opp.name} logo`} className="w-8 h-8 rounded-full ml-2" />}
                        </div>
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-300 flex items-center">
                            <FaBrain className="mr-1 flex-shrink-0" style={{ color: currentColor }} />
                            <span>Screen: <span className="italic">{opp.aiScreenCategory}</span></span>
                        </div>
                    </div>
                ))}
            </div>

            <Link
                to="/dashboard/screener" // Link to the full screener page
                className="mt-6 block text-sm font-medium text-white py-2 px-4 rounded-lg text-center transition duration-150"
                style={{ backgroundColor: currentColor }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
                Explore Full Screener
            </Link>
        </div>
    );
};

export default AIOpportunitiesRadarCard;