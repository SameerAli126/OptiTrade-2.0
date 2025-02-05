import React, { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from './new-dashboard/contexts/ContextProvider';
import DashboardRoutes from './DashboardRoutes'; // Import the DashboardRoutes component
import DashboardLayout from './DashboardLayout';
import {ThemeSettings} from "./new-dashboard/components/index.jsx"; // Import the DashboardLayout

const Dashboard = () => {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
    const [selectedStock, setSelectedStock] = useState(null); // Manage selected stock state

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
                <DashboardRoutes selectedStock={selectedStock} setSelectedStock={setSelectedStock} /> {/* Render routes here */}
            </div>
        </DashboardLayout>
    );
};

export default React.memo(Dashboard);