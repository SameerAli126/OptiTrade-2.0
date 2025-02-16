import React from 'react';
import { Navbar, Sidebar, Footer, ThemeSettings } from './new-dashboard/components';
import { useStateContext } from './new-dashboard/contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';

const DashboardLayout = ({ children }) => {
    const { currentMode, activeMenu, currentColor, isClicked, handleClick } = useStateContext();

    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <div className="flex relative dark:bg-main-dark-bg min-h-screen overflow-x-hidden">
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
                <div
                    className={
                        activeMenu
                            ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
                            : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen'
                    }
                >
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