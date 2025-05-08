// Filepath: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
// import CssBaseline from '@mui/material/CssBaseline'; // Already handled by AppWithTheme in main.jsx
// import Header from './components/Header';
// import Main from './components/Main';
// import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Trading from './components/Trading';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/dashboard/new-dashboard/contexts/AuthContext'; // Note: AuthProvider is also in main.jsx
import { Analytics } from '@vercel/analytics/react';
import { StockDataProvider } from './components/dashboard/new-dashboard/contexts/StockDataContext';
import { PriceDataProvider } from './components/dashboard/new-dashboard/contexts/PriceDataContext'; // Import the new PriceDataProvider
import LandingPage from './landing/LandingPage.jsx';
import Navbar from "./landing/Navbar.jsx"
import { SpeedInsights } from "@vercel/speed-insights/react"

const App = () => {
    const location = useLocation();

    // Ensure queryClient is defined. If not already, create src/lib/queryClient.js:
    // import { QueryClient } from '@tanstack/react-query';
    // export const queryClient = new QueryClient();

    return (
        // QueryClientProvider is essential for @tanstack/react-query hooks to work
        <QueryClientProvider client={queryClient}>
            {/* AuthProvider here might be redundant if already in main.jsx, but keeping as per original structure */}
            <AuthProvider>
                <StockDataProvider>
                    <PriceDataProvider> {/* Wrap with PriceDataProvider */}
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
                    </PriceDataProvider>
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