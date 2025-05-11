// src/components/dashboard/new-dashboard/contexts/ContextProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
    themeSettings: false
};

// Helper function to apply theme classes for Tailwind and Syncfusion
const applyThemeMode = (mode) => {
    // --- Tailwind ---
    const root = document.documentElement;
    if (mode === 'Dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

};


export const ContextProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth() || {};
    const [screenSize, setScreenSize] = useState(undefined);
    // Use sidebarColor for sidebar background/accent from ThemeSettings
    const [sidebarColor, setSidebarColor] = useState(() => localStorage.getItem('sidebarColor') || '#7352FF');
    // Use currentColor for general theme accents
    const [currentColor, setCurrentColor] = useState(() => localStorage.getItem('colorMode') || '#03C9D7');
    const [currentMode, setCurrentMode] = useState(() => localStorage.getItem('themeMode') || 'Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [category, setCategory] = useState('Dashboard');
    const [title, setTitle] = useState('Overview');
    // const [cashBalance, setCashBalance] = useState(0);

    const [balanceDetails, setBalanceDetails] = useState({
        cash_balance: 0,
        portfolio_value: 0,
        net_worth: 0,
    });

    const handleClick = (clicked) => {
        setIsClicked((prevState) => ({
            ...initialState,
            [clicked]: !prevState[clicked],
        }));
    };

    const refreshCashBalance = async () => {
        const currentUser = user; // Capture current user
        console.log('Attempting to refresh balance details for user:', currentUser);
        if (currentUser?.id) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token for balance fetch.');
                    // Reset balance details if no token
                    setBalanceDetails({ cash_balance: 0, portfolio_value: 0, net_worth: 0 });
                    return;
                }
                console.log(`API call to /users/${currentUser.id}/balance`);
                const response = await axios.get(
                    `https://archlinux.tail9023a4.ts.net/users/${currentUser.id}/balance`,
                    // If using Vite proxy: `/api_v1/users/${currentUser.id}/balance`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log('Balance API Response:', response.data);
                if (response.data && typeof response.data.cash_balance !== 'undefined') {
                    setBalanceDetails({
                        cash_balance: response.data.cash_balance || 0,
                        portfolio_value: response.data.portfolio_value || 0,
                        net_worth: response.data.net_worth || 0,
                    });
                    console.log('Updated balanceDetails state:', response.data);
                } else {
                    console.error('Invalid balance data received:', response.data);
                    setBalanceDetails({ cash_balance: 0, portfolio_value: 0, net_worth: 0 });
                }
            } catch (error) {
                console.error('Error refreshing balance details:', error);
                if (error.response) {
                    console.log('Error response data:', error.response.data);
                }
                // Reset balance on error
                setBalanceDetails({ cash_balance: 0, portfolio_value: 0, net_worth: 0 });
            }
        } else {
            console.log('No user ID available - skipping balance fetch, resetting details.');
            setBalanceDetails({ cash_balance: 0, portfolio_value: 0, net_worth: 0 });
        }
    };
    useEffect(() => {
        console.log('Balance refresh effect triggered. IsAuthenticated:', isAuthenticated, 'User ID:', user?.id);
        if (isAuthenticated && user && user.id) {
            refreshCashBalance();
        } else {
            // Reset balance details if not authenticated or no user
            setBalanceDetails({ cash_balance: 0, portfolio_value: 0, net_worth: 0 });
            console.log('Conditions not met for balance refresh. Balance details reset.');
        }
    }, [user, isAuthenticated]);


    const setMode = (e) => {
        const mode = e.target.value;
        setCurrentMode(mode);
        localStorage.setItem('themeMode', mode);
        applyThemeMode(mode); // Apply classes to HTML and Body
    };

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
    };

    // Add setSidebarColor function and save to localStorage
    const setSidebarColorPersistence = (color) => {
        setSidebarColor(color);
        localStorage.setItem('sidebarColor', color);
    };


    // Effect to set initial theme from localStorage on mount
    useEffect(() => {
        const storedMode = localStorage.getItem('themeMode') || 'Light';
        const storedColor = localStorage.getItem('colorMode') || '#03C9D7';
        const storedSidebarColor = localStorage.getItem('sidebarColor') || '#7352FF';

        setCurrentMode(storedMode);
        setCurrentColor(storedColor);
        setSidebarColor(storedSidebarColor);
        applyThemeMode(storedMode); // Apply initial theme classes
    }, []);


    return (
        <StateContext.Provider value={{
            currentColor,
            currentMode,
            activeMenu,
            screenSize,
            setScreenSize,
            handleClick,
            isClicked,
            initialState,
            setIsClicked,
            setActiveMenu,
            setCurrentColor,
            setCurrentMode,
            setMode,
            setColor,
            themeSettings,
            setThemeSettings,
            category,
            setCategory,
            title,
            setTitle,
            user,
            sidebarColor, // Pass sidebarColor
            setSidebarColor: setSidebarColorPersistence, // Pass the persistence function
            balanceDetails,
            refreshCashBalance
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);