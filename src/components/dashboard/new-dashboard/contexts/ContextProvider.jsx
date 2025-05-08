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
    const { user } = useAuth() || {};
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
    const [cashBalance, setCashBalance] = useState(0);

    const handleClick = (clicked) => {
        setIsClicked((prevState) => ({
            ...initialState,
            [clicked]: !prevState[clicked],
        }));
    };

    const refreshCashBalance = async () => {
        console.log('Attempting to refresh cash balance...');
        if (user?.id) {
            try {
                console.log('Making API call for user ID:', user.id);
                const response = await axios.get(
                    `https://archlinux.tail9023a4.ts.net/users/${user.id}/balance`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                console.log('API Response:', response.data);
                setCashBalance(response.data.cash_balance);
                console.log('Updated cashBalance state:', response.data.cash_balance);
            } catch (error) {
                console.error('Error refreshing balance:', error);
                console.log('Error details:', error.response?.data);
            }
        } else {
            console.log('No user ID available - skipping balance fetch');
        }
    };

    useEffect(() => {
        console.log('Balance refresh effect triggered, user ID:', user?.id);
        refreshCashBalance();
    }, [user?.id]);


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
            cashBalance,
            refreshCashBalance
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);