// src/MasterIndex.jsx

// React Query
export { QueryClientProvider } from '@tanstack/react-query';
export { queryClient } from './lib/queryClient';

// Components
export { default as Login } from './components/Login';
export { default as Signup } from './components/Signup';
export { default as Trading } from './components/Trading';
export { default as Dashboard } from './components/dashboard/Dashboard';
export { default as ProtectedRoute } from './components/ProtectedRoute';
export { default as AuthProvider } from './components/dashboard/new-dashboard/contexts/AuthContext';
export { default as StockDataProvider } from './components/dashboard/new-dashboard/contexts/StockDataContext';
export { default as LandingPage } from './landing/LandingPage.jsx';
export { default as Navbar } from "./landing/Navbar.jsx";

// Analytics
export { Analytics } from '@vercel/analytics/react';
export { SpeedInsights } from "@vercel/speed-insights/react";

// Dashboard Components
export { default as DashboardRoutes } from './components/dashboard/DashboardRoutes';
export { default as DashHome } from './components/dashboard/new-dashboard/pages/DashHome';
export { default as Portfolio } from './components/dashboard/new-dashboard/pages/Portfolio';

// New Dashboard Components
export { default as BalanceDisplay } from './components/dashboard/new-dashboard/components/BalanceDisplay';
export { default as Button } from './components/dashboard/new-dashboard/components/Button';
export { default as Chat } from './components/dashboard/new-dashboard/components/Chat';
export { default as Footer } from './components/dashboard/new-dashboard/components/Footer';
export { default as Notification } from './components/dashboard/new-dashboard/components/Notification';
export { default as Sidebar } from './components/dashboard/new-dashboard/components/Sidebar';
export { default as ThemeSettings } from './components/dashboard/new-dashboard/components/ThemeSettings';
export { default as UserProfile } from './components/dashboard/new-dashboard/components/UserProfile';

// Other Components
export { default as App } from './App';
export { default as AppRoutes } from './AppRoutes';
