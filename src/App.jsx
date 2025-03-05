// Filepath: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query'; // Add this
import { queryClient } from './lib/queryClient'; // Add this
// import Header from './components/Header';
// import Main from './components/Main';
// import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Trading from './components/Trading';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/dashboard/new-dashboard/contexts/AuthContext';
import { Analytics } from '@vercel/analytics/react';
import { StockDataProvider } from './components/dashboard/new-dashboard/contexts/StockDataContext';
import LandingPage from './Landing/LandingPage.jsx';
import Navbar from "./Landing/Navbar.jsx"
import { SpeedInsights } from "@vercel/speed-insights/next"
const App = () => {
    const location = useLocation();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <StockDataProvider>
                    <div className="app-container">
                        {!location.pathname.startsWith('/dashboard') && <Navbar/>}
                        <div className="content">
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/trading" element={<ProtectedRoute element={Trading} />} />
                                <Route path="/dashboard/*" element={<ProtectedRoute element={Dashboard} />} />
                            </Routes>
                        </div>
                        <Analytics />
                        <SpeedInsights />
                    </div>
                </StockDataProvider>
            </AuthProvider>
        </QueryClientProvider>
);
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;