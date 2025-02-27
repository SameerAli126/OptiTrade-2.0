// Filepath: src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from './new-dashboard/contexts/ContextProvider';
import DashboardRoutes from './DashboardRoutes';
import DashboardLayout from './DashboardLayout';
import { ThemeSettings } from "./new-dashboard/components/index.jsx";
import { useStockData } from './new-dashboard/contexts/StockDataContext';

const Dashboard = () => {
    const { setCurrentColor, setCurrentMode, currentMode, themeSettings, setThemeSettings } = useStateContext();
    const [selectedStock, setSelectedStock] = useState(null);
    const { stockData } = useStockData();

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    return (
        <DashboardLayout>
            <div className="p-4">
                {themeSettings && <ThemeSettings />}
                <DashboardRoutes
                    selectedStock={selectedStock}
                    setSelectedStock={setSelectedStock}
                    stockData={stockData}  // Pass stockData to child routes
                />
            </div>
        </DashboardLayout>
    );
};

export default React.memo(Dashboard);