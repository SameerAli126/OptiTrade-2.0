import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
    themeSettings: false
};

export const ContextProvider = ({ children }) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [category, setCategory] = useState('Dashboard');
    const [title, setTitle] = useState('Overview');
    const [user, setUser] = useState(null);
    const [sidebarColor, setSidebarColor] = useState('#7352FF'); // Add sidebarColor state

    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
    };

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
    };

    const handleClick = (clicked) => {
        setIsClicked((prevState) => ({
            ...initialState,
            [clicked]: !prevState[clicked],
        }));
    };

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
            setUser,
            sidebarColor, // Provide sidebarColor
            setSidebarColor, // Provide setSidebarColor
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
