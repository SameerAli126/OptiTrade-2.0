// Filepath: E:\WEB JS\fyp\opti-trade\src\components\dashboard\dashboard-panel\quote-components\DashboardHeader.jsx

import React from 'react';

const DashboardHeader = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="flex items-center">
                <input type="text" className="form-control" value="12-27-2024" readOnly />
                <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Change Period</button>
            </div>
        </div>
    );
};

export default DashboardHeader;
