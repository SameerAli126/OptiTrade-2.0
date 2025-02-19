// Filepath: src\App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Trading from './components/Trading';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/dashboard/new-dashboard/contexts/AuthContext'; // Import AuthProvider
import { Analytics } from '@vercel/analytics/react';

const App = () => {
    const location = useLocation();

    return (
        <AuthProvider> {/* Wrap your app with AuthProvider */}
            <div className="app-container">
                {!location.pathname.startsWith('/dashboard') && <Header />}
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/trading" element={<ProtectedRoute element={Trading} />} />
                        <Route path="/dashboard/*" element={<ProtectedRoute element={Dashboard} />} />
                    </Routes>
                </div>
                <Analytics />
            </div>
        </AuthProvider>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
