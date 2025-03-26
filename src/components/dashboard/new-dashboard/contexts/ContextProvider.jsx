// ContextProvider.jsx
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

export const ContextProvider = ({ children }) => {
    const { user } = useAuth() || {};
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [category, setCategory] = useState('Dashboard');
    const [title, setTitle] = useState('Overview');
    const [sidebarColor, setSidebarColor] = useState('#7352FF');
    const [cashBalance, setCashBalance] = useState(0);

    // Add the missing handleClick function
    const handleClick = (clicked) => {
        setIsClicked((prevState) => ({
            ...initialState,
            [clicked]: !prevState[clicked],
        }));
    };

    const refreshCashBalance = async () => {
        if (user?.id) {
            try {
                const response = await axios.get(
                    `https://archlinux.tail9023a4.ts.net/user-balance/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setCashBalance(response.data.cash_balance);
            } catch (error) {
                console.error('Error refreshing balance:', error);
            }
        }
    };

    useEffect(() => {
        refreshCashBalance();
    }, [user?.id]);
    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
    };

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
    };

    return (
        <StateContext.Provider value={{
            currentColor,
            currentMode,
            activeMenu,
            screenSize,
            setScreenSize,
            handleClick, // Now properly defined
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
            sidebarColor,
            setSidebarColor,
            cashBalance,
            refreshCashBalance
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);