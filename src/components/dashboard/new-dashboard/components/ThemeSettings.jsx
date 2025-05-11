// src/components/settings/ThemeSettings.jsx
import React from 'react';
import { BsCheck } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { themeColors } from '../data/dummy.jsx';
import { useStateContext } from '../contexts/ContextProvider.jsx';
import Switch from '../components/themeSettings/Switch.jsx';  // <-- our new controlled toggle

const ThemeSettings = () => {
    const {
        setColor,
        setMode,
        currentMode,
        currentColor,
        sidebarColor,
        setSidebarColor
    } = useStateContext();

    // Toggle handler for our Switch:
    const handleThemeToggle = e => {
        // e.target.checked === true → Dark mode
        const newMode = e.target.checked ? 'Dark' : 'Light';
        // ContextProvider.setMode expects an event-like object
        setMode({ target: { value: newMode } });
    };

    const formatColorName = name =>
        name.replace('-theme', '').charAt(0).toUpperCase() +
        name.replace('-theme', '').slice(1);

    return (
        <div
            className="bg-white dark:bg-[#42464D] p-4 rounded-lg shadow-xl"
            style={{ width: '24rem', maxWidth: 'calc(100vw - 2rem)' }}
        >
            {/* THEME SWITCH */}
            <div className="border-b-1 border-gray-200 dark:border-gray-600 pb-4 mb-4 flex items-center justify-between">
                <p className="font-semibold text-lg">Theme Mode</p>
                <Switch
                    checked={currentMode === 'Dark'}
                    onChange={handleThemeToggle}
                    size="15px"
                />
            </div>

            {/* THEME COLORS */}
            <div className="border-b-1 border-gray-200 dark:border-gray-600 pb-4 mb-4">
                <p className="font-semibold text-lg mb-4">Theme Colors</p>
                <div className="flex flex-wrap gap-3">
                    {themeColors.map((item, idx) => (
                        <TooltipComponent
                            key={idx}
                            content={formatColorName(item.name)}
                            position="TopCenter"
                        >
                            <button
                                type="button"
                                className="relative h-9 w-9 rounded-full flex items-center justify-center ring-1 ring-gray-200 dark:ring-gray-600 hover:ring-2 hover:ring-primary transition-all"
                                style={{ backgroundColor: item.color }}
                                onClick={() => setColor(item.color)}
                            >
                                <BsCheck
                                    className={`text-white text-xl transition-opacity ${
                                        item.color === currentColor ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            </button>
                        </TooltipComponent>
                    ))}
                </div>
            </div>

            {/* SIDEBAR COLORS */}
            <div>
                <p className="font-semibold text-lg mb-4">Sidebar Colors</p>
                <div className="flex flex-wrap gap-3">
                    {themeColors.map((item, idx) => (
                        <TooltipComponent
                            key={idx}
                            content={formatColorName(item.name)}
                            position="TopCenter"
                        >
                            <button
                                type="button"
                                className="relative h-9 w-9 rounded-full flex items-center justify-center ring-1 ring-gray-200 dark:ring-gray-600 hover:ring-2 hover:ring-primary transition-all"
                                style={{ backgroundColor: item.color }}
                                onClick={() => setSidebarColor(item.color)}
                            >
                                <BsCheck
                                    className={`text-white text-xl transition-opacity ${
                                        item.color === sidebarColor ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            </button>
                        </TooltipComponent>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeSettings;
