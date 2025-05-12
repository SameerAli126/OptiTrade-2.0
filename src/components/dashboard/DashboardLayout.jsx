// src/components/dashboard/DashboardLayout.jsx
import React from 'react';
import { Navbar, Sidebar, Footer, ThemeSettings } from './new-dashboard/components';
import { useStateContext } from './new-dashboard/contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import "../../../src/assets/DashboardLayout.css" // Keep your custom layout CSS if needed

const DashboardLayout = ({ children }) => {
    // Removed currentMode from context destructuring as it's handled globally now
    const { activeMenu, currentColor, isClicked, handleClick, themeSettings } = useStateContext();

    return (
        // The 'dark' class on <html> controlled by ContextProvider handles the mode
        <div>
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Sidebar */}
                {activeMenu ? (
                    // Ensure sidebar container itself doesn't impose conflicting background
                    <div className="w-72 fixed sidebar z-50"> {/* Removed dark:bg-secondary-dark-bg bg-white */}
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0"> {/* Removed dark:bg-secondary-dark-bg */}
                        <Sidebar />
                    </div>
                )}

                {/* Main Content */}
                {/* Updated background classes */}
                <div className={`flex-1 bg-gray-100 dark:bg-gray-800 ${activeMenu ? 'md:ml-72' : 'w-full'} overflow-y-auto`}> {/* Added overflow-y-auto */}
                    {/* Navbar */}
                    {/* Updated background classes */}
                    <div className="fixed md:static bg-gray-100 dark:bg-gray-800 navbar w-full z-10">
                        <Navbar />
                    </div>

                    {/* Page Content */}
                    <div className="relative p-4 md:p-6"> {/* Added padding here for content */}
                        {children}
                        <Footer />
                    </div>
                </div>

                {/* Theme Settings Trigger */}
                <div className="fixed right-4 bottom-4 z-[1000]">
                    <button
                        type="button"
                        onClick={() => handleClick('themeSettings')} // Use handleClick from context
                        style={{ background: currentColor }}
                        className="text-3xl text-white p-3 rounded-full hover:drop-shadow-xl hover:brightness-90"
                    >
                        <FiSettings />
                    </button>
                </div>

                {/* Theme Settings Panel */}
                {/* Ensure ThemeSettings itself adapts to dark mode */}
                {isClicked.themeSettings && (
                    <div className="fixed right-4 bottom-20 z-[1001] bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                        <ThemeSettings />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardLayout;