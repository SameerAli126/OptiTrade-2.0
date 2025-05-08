// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
// Removed FiSettings and TooltipComponent if only used for Theme Settings trigger in Layout
import { useStateContext } from './new-dashboard/contexts/ContextProvider';
import DashboardRoutes from './DashboardRoutes';
import DashboardLayout from './DashboardLayout'; // Using the layout component
import { ThemeSettings } from "./new-dashboard/components/index.jsx"; // Keep if needed within content
import { useStockData } from './new-dashboard/contexts/StockDataContext';

const Dashboard = () => {
    // Removed setCurrentColor, setCurrentMode, currentMode as they are primarily managed in ContextProvider now
    // Kept themeSettings state if ThemeSettings component is rendered *inside* the main content area
    const { themeSettings } = useStateContext();
    const [selectedStock, setSelectedStock] = useState(null);
    const { stockData } = useStockData();

    // Initial theme setup is now handled within ContextProvider's useEffect

    return (
        // Remove the outer div applying the 'dark' class locally
        // <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <DashboardLayout>
            {/* Content passed as children to DashboardLayout */}
            {/* Optionally render ThemeSettings here if needed, though trigger is in Layout */}
            {/* {themeSettings && <ThemeSettings />} */}
            <DashboardRoutes
                selectedStock={selectedStock}
                setSelectedStock={setSelectedStock}
                stockData={stockData}
            />
        </DashboardLayout>
        // </div>
    );
};

export default React.memo(Dashboard);