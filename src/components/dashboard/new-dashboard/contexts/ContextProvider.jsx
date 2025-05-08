// src/components/dashboard/new-dashboard/contexts/ContextProvider.jsx
import React, { createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // This is input_file_4.js

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
    themeSettings: false
};

const applyThemeMode = (mode) => {
    const root = document.documentElement;
    if (mode === 'Dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
};

export const ContextProvider = ({ children }) => {
    // Destructure isAuthenticated as well for a clearer dependency
    const { user, isAuthenticated } = useAuth() || {}; // Ensure useAuth() returns an object even if context is not ready
    const [screenSize, setScreenSize] = useState(undefined);
    const [sidebarColor, setSidebarColor] = useState(() => localStorage.getItem('sidebarColor') || '#7352FF');
    const [currentColor, setCurrentColor] = useState(() => localStorage.getItem('colorMode') || '#03C9D7');
    const [currentMode, setCurrentMode] = useState(() => localStorage.getItem('themeMode') || 'Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [category, setCategory] = useState('Dashboard');
    const [title, setTitle] = useState('Overview');
    const [cashBalance, setCashBalance] = useState(0);

    // Log the user and isAuthenticated status from AuthContext whenever ContextProvider re-renders
    console.log('ContextProvider render cycle - User:', user, 'IsAuthenticated:', isAuthenticated);

    const handleClick = (clicked) => {
        setIsClicked((prevState) => ({
            ...initialState,
            [clicked]: !prevState[clicked],
        }));
    };

    const refreshCashBalance = async () => {
        // The user object passed here will be the one from the closure of when this function was defined or called.
        // It's better to rely on the `user` state directly from the context for the most up-to-date value.
        const currentUser = user; // Capture current user from state at the time of execution
        console.log('Attempting to refresh cash balance for current user:', currentUser);

        if (currentUser && currentUser.id) {
            try {
                console.log(`Making API call for user ID: ${currentUser.id} to /api_v1/users/${currentUser.id}/balance`);
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in localStorage. Cannot fetch balance.');
                    return;
                }
                const response = await axios.get(
                    // Assuming you still need the Vite proxy for CORS during developme
                    // If CORS is fixed on the server:
                     `https://archlinux.tail9023a4.ts.net/users/${currentUser.id}/balance`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('API Response for balance:', response.data);
                if (typeof response.data.cash_balance !== 'undefined') {
                    setCashBalance(response.data.cash_balance);
                    console.log('Updated cashBalance state:', response.data.cash_balance);
                } else {
                    console.error('cash_balance not found in API response:', response.data);
                }
            } catch (error) {
                console.error('Error refreshing balance:', error);
                if (error.response) {
                    console.log('Error response data:', error.response.data);
                    console.log('Error response status:', error.response.status);
                } else if (error.request) {
                    console.log('Error request (no response received):', error.request);
                } else {
                    console.log('Error message:', error.message);
                }
            }
        } else {
            console.log('No valid user or user ID available for balance fetch. Current User:', currentUser);
        }
    };

    useEffect(() => {
        console.log('Balance refresh effect triggered. IsAuthenticated:', isAuthenticated, 'User ID:', user?.id);
        // We want to refresh the balance if the user is authenticated and the user object (with an ID) is available.
        if (isAuthenticated && user && user.id) {
            refreshCashBalance();
        } else {
            // Optional: Reset balance if user logs out or is not authenticated
            // setCashBalance(0);
            console.log('Conditions not met for balance refresh from effect.');
        }
        // Depend on isAuthenticated and the user object itself.
        // If user object changes (e.g., from null to populated), this effect will re-run.
    }, [user, isAuthenticated]);


    const setMode = (e) => {
        const mode = e.target.value;
        setCurrentMode(mode);
        localStorage.setItem('themeMode', mode);
        applyThemeMode(mode);
    };

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
    };

    const setSidebarColorPersistence = (color) => {
        setSidebarColor(color);
        localStorage.setItem('sidebarColor', color);
    };

    useEffect(() => {
        const storedMode = localStorage.getItem('themeMode') || 'Light';
        const storedColor = localStorage.getItem('colorMode') || '#03C9D7';
        const storedSidebarColor = localStorage.getItem('sidebarColor') || '#7352FF';

        setCurrentMode(storedMode);
        setCurrentColor(storedColor);
        setSidebarColor(storedSidebarColor);
        applyThemeMode(storedMode);
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
            user, // Pass the user from AuthContext through
            sidebarColor,
            setSidebarColor: setSidebarColorPersistence,
            cashBalance,
            refreshCashBalance
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);