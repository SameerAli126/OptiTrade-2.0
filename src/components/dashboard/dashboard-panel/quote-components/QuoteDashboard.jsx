// Filepath: E:\WEB JS\fyp\opti-trade\src\components\dashboard\dashboard-panel\quote-components\QuoteDashboard.jsx

import React from 'react';
import DashboardHeader from './DashboardHeader';
import Card from './Card';

const QuoteDashboard = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <Card icon={<svg>...</svg>} number="932" label="Projects" />
                <Card icon={<svg>...</svg>} number="1,032" label="Inquiries" />
                <Card icon={<svg>...</svg>} number="102k" label="Investment" />
                <Card icon={<svg>...</svg>} number="32k" label="Assets" />
            </div>
        </div>
    );
};

export default QuoteDashboard;
