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

const App = () => {
    const location = useLocation();

    return (
        <div className="app-container">
            {/* Conditionally render Header if not in the dashboard */}
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
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;