import React from 'react';
import { Navbar, Sidebar, Footer, ThemeSettings } from './new-dashboard/components';
import { useStateContext } from './new-dashboard/contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import "../../../src/assets/DashboardLayout.css"

const DashboardLayout = ({ children }) => {
    const { currentMode, activeMenu, currentColor, isClicked, handleClick } = useStateContext();

    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <div className="flex flex-col md:flex-row min-h-screen overflow-x-hidden">
                {/* Sidebar */}
                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white z-50">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <Sidebar />
                    </div>
                )}

                {/* Main Content */}
                <div className={`flex-1 bg-main-bg dark:bg-main-dark-bg ${activeMenu ? 'md:ml-72' : 'w-full'}`}>
                    {/* Navbar */}
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full z-10">
                        <Navbar />
                    </div>

                    {/* Page Content */}
                    <div className="relative">
                        {children}
                        <Footer />
                    </div>
                </div>

                {/* Theme Settings Trigger */}
                <div className="fixed right-4 bottom-4 z-[1000]">
                    <button
                        type="button"
                        onClick={() => handleClick('themeSettings')}
                        style={{ background: currentColor }}
                        className="text-3xl text-white p-3 rounded-full hover:drop-shadow-xl hover:brightness-90"
                    >
                        <FiSettings />
                    </button>
                </div>

                {/* Theme Settings Panel */}
                {isClicked.themeSettings && (
                    <div className="fixed right-4 bottom-20 z-[1001]">
                        <ThemeSettings />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardLayout;
