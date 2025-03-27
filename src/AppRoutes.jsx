import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashHome from './components/dashboard/new-dashboard/pages/DashHome';
import Portfolio from './components/dashboard/new-dashboard/pages/Portfolio';
// Import other components as needed

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/" element={<DashHome />} /> {/* Default dashboard page */}
            <Route path="/home" element={<DashHome />} />
            <Route path="/portfolio" element={<Portfolio />} />
            {/* Add other nested routes here */}
        </Routes>
    );
};

export default DashboardRoutes;