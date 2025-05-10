// src/components/DashHome/AIRelevantNewsCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaBrain } from 'react-icons/fa';

const AIRelevantNewsCard = ({ newsItems, currentColor, currentMode }) => {
    if (!newsItems || newsItems.length === 0) {
        return (
            <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md w-full lg:w-1/2"> {/* Adjust width */}
                <div className="flex items-center mb-4">
                    <FaNewspaper className="text-2xl mr-3" style={{ color: currentColor }} />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">AI-Curated News</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">No specific AI-curated news at the moment. Check the news page for general updates.</p>
                <Link
                    to="/dashboard/news"
                    className="mt-6 block text-sm font-medium text-white py-2 px-4 rounded-lg text-center transition duration-150"
                    style={{ backgroundColor: currentColor }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                    View All News
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md w-full lg:w-1/2"> {/* Adjust width */}
            <div className="flex items-center mb-4">
                <FaNewspaper className="text-2xl mr-3" style={{ color: currentColor }} />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">AI-Curated News</h3>
            </div>

            <div className="space-y-4">
                {newsItems.slice(0, 3).map((item, index) => ( // Show up to 3 news items
                    <div key={item.id || index} className="pb-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <Link to={`/dashboard/news/article/${item.id}`} className="hover:underline">
                            <h4 className="font-semibold text-md text-gray-800 dark:text-gray-100 mb-1">
                                {item.headline}
                            </h4>
                        </Link>
                        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                            <span>{item.source} - {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            <span className="flex items-center" title={`AI Impact Score: ${item.aiImpactScore}`}>
                <FaBrain className="mr-1" style={{color: currentColor}}/> {item.aiImpactScore}
              </span>
                        </div>
                    </div>
                ))}
            </div>

            <Link
                to="/dashboard/news"
                className="mt-6 block text-sm font-medium text-white py-2 px-4 rounded-lg text-center transition duration-150"
                style={{ backgroundColor: currentColor }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
                View All News
            </Link>
        </div>
    );
};

export default AIRelevantNewsCard;