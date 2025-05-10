// src/components/DashHome/NasdaqSnapshotCard.jsx
import React from 'react';
import { FaArrowUp, FaArrowDown, FaMinus, FaBrain } from 'react-icons/fa'; // Example icons

const NasdaqSnapshotCard = ({ data, currentColor }) => {
    if (!data) return null;

    const getSentimentIcon = (sentiment) => {
        if (sentiment === 'Bullish') return <FaArrowUp className="text-green-500" />;
        if (sentiment === 'Bearish') return <FaArrowDown className="text-red-500" />;
        return <FaMinus className="text-gray-500" />;
    };

    return (
        <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">{data.indexName}</h3>

            {/* Placeholder for a small line chart - you'd integrate a charting library here */}
            <div className="h-20 bg-gray-100 dark:bg-gray-700 my-4 rounded flex items-center justify-center text-sm text-gray-500">
                [Mini Chart Area]
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 dark:text-gray-400">Level:</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{data.currentLevel}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 dark:text-gray-400">Change:</p>
                    <p className={`font-semibold ${data.changeAbsolute?.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {data.changeAbsolute} ({data.changePercentage})
                    </p>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <p className="text-gray-600 dark:text-gray-400 flex items-center">
                        <FaBrain className="mr-2" style={{ color: currentColor }} /> AI Sentiment:
                    </p>
                    <div className="flex items-center">
                        {getSentimentIcon(data.aiSentiment)}
                        <p className="font-semibold text-gray-800 dark:text-gray-100 ml-1">{data.aiSentiment}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NasdaqSnapshotCard;