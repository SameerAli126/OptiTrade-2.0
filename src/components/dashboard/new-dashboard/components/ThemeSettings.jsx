import React from 'react';
import { BsCheck } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { themeColors } from '../data/dummy.jsx';
import { useStateContext } from '../contexts/ContextProvider.jsx';

const ThemeSettings = () => {
    const { setColor, setMode, currentMode, currentColor, sidebarColor, setSidebarColor } = useStateContext();

    return (
        <div
            className="bg-white dark:bg-[#42464D] p-4 rounded-lg shadow-xl"
            style={{
                width: '20rem',
                maxWidth: 'calc(100vw - 2rem)',
            }}
        >
            {/* Theme Options */}
            <div className="border-b-1 border-gray-200 dark:border-gray-600 pb-4 mb-4">
                <p className="font-semibold text-lg mb-4">Theme Options</p>
                <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="theme"
                            value="Light"
                            className="cursor-pointer"
                            onChange={setMode}
                            checked={currentMode === 'Light'}
                        />
                        <span className="text-gray-700 dark:text-gray-300">Light Mode</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="theme"
                            value="Dark"
                            onChange={setMode}
                            className="cursor-pointer"
                            checked={currentMode === 'Dark'}
                        />
                        <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                    </label>
                </div>
            </div>

            {/* Theme Colors */}
            <div className="border-b-1 border-gray-200 dark:border-gray-600 pb-4 mb-4">
                <p className="font-semibold text-lg mb-4">Theme Colors</p>
                <div className="flex flex-wrap gap-3">
                    {themeColors.map((item, index) => (
                        <TooltipComponent key={index} content={item.name} position="TopCenter">
                            <div className="relative cursor-pointer">
                                <button
                                    type="button"
                                    className="h-8 w-8 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: item.color }}
                                    onClick={() => setColor(item.color)}
                                >
                                    <BsCheck className={`text-white text-xl ${item.color === currentColor ? 'opacity-100' : 'opacity-0'}`} />
                                </button>
                            </div>
                        </TooltipComponent>
                    ))}
                </div>
            </div>

            {/* Sidebar Colors */}
            <div>
                <p className="font-semibold text-lg mb-4">Sidebar Colors</p>
                <div className="flex flex-wrap gap-3">
                    {themeColors.map((item, index) => (
                        <TooltipComponent key={index} content={item.name} position="TopCenter">
                            <div className="relative cursor-pointer">
                                <button
                                    type="button"
                                    className="h-8 w-8 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: item.color }}
                                    onClick={() => setSidebarColor(item.color)}
                                >
                                    <BsCheck className={`text-white text-xl ${item.color === sidebarColor ? 'opacity-100' : 'opacity-0'}`} />
                                </button>
                            </div>
                        </TooltipComponent>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeSettings;