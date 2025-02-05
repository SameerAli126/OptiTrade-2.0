// Filepath: src/components/dashboard/dashboard-panel/StockTradingPanel.jsx

import React, { useState } from 'react';
import DashScreener from './DashScreener';
import BuySell from './BuySell_o.txt';

const StockTradingPanel = () => {
    const [selectedStock, setSelectedStock] = useState(null);

    return (
        <div>
            <DashScreener onSelectStock={setSelectedStock} />
            {selectedStock && <BuySell stock={selectedStock} />}
        </div>
    );
};

export default StockTradingPanel;
