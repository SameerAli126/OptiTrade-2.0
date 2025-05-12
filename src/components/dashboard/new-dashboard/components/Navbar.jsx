// Filepath: src/components/dashboard/new-dashboard/components/Navbar.jsx

import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown, MdSearch, MdArrowBack } from 'react-icons/md'; // Added MdSearch and MdArrowBack
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Notification, UserProfile } from '.'; // Assuming Cart is not used based on original provided code
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import BalanceDisplay from './BalanceDisplay';
import StockSearch from './StockSearch';
// Removed axios import as it wasn't used in the Navbar logic

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
        <button
            type="button"
            onClick={customFunc}
            style={{ color }}
            className="relative text-xl rounded-full p-3 hover:bg-light-gray"
        >
            {dotColor && ( // Conditionally render dotColor span
                <span
                    style={{ background: dotColor }}
                    className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
                />
            )}
            {icon}
        </button>
    </TooltipComponent>
);

const Navbar = () => {
    const {
        currentColor,
        activeMenu,
        setActiveMenu,
        handleClick,
        isClicked,
        screenSize, // Assuming screenSize is managed by ContextProvider
        setScreenSize, // Assuming setScreenSize is managed by ContextProvider
        cashBalance
    } = useStateContext();
    const { user } = useAuth();

    const notificationRef = useRef(null);
    const userProfileRef = useRef(null);
    // Removed cartRef as Cart component wasn't in the provided UserProfile import list

    const [mobileSearchActive, setMobileSearchActive] = useState(false);

    const handleActiveMenu = () => setActiveMenu(!activeMenu);

    // Effect to update screenSize (if ContextProvider doesn't do it reliably on init/resize)
    useEffect(() => {
        const handleResize = () => {
            if (setScreenSize) {
                setScreenSize(window.innerWidth);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial size
        return () => window.removeEventListener('resize', handleResize);
    }, [setScreenSize]);

    // Deactivate mobile search if screen becomes larger
    useEffect(() => {
        if (screenSize > 768) { // Tailwind's 'md' breakpoint
            setMobileSearchActive(false);
        }
    }, [screenSize]);

    // Click outside handler for popups
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target) && isClicked.notification) {
                handleClick('notification'); // Close if clicked outside
            }
            if (userProfileRef.current && !userProfileRef.current.contains(event.target) && isClicked.userProfile) {
                handleClick('userProfile'); // Close if clicked outside
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isClicked, handleClick]);


    const isMobile = screenSize <= 768;

    return (
        <div className="flex items-center justify-between p-2 md:ml-6 md:mr-6 relative border-b" style={{ borderColor: currentColor, height: '64px' }}>
            {/* Section 1: Menu Icon or Back for Mobile Search */}
            <div className="flex-shrink-0">
                {isMobile && mobileSearchActive ? (
                    <NavButton title="Back" customFunc={() => setMobileSearchActive(false)} color={currentColor} icon={<MdArrowBack />} />
                ) : (
                    <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
                )}
            </div>

            {/* Section 2: Stock Search (Full width on active mobile search, or centered on desktop) */}
            {isMobile && mobileSearchActive ? (
                <div className="flex-grow px-1 sm:px-2">
                    <StockSearch />
                </div>
            ) : (
                <div className="hidden md:flex flex-grow justify-center items-center px-4">
                    <div className="w-full max-w-sm lg:max-w-md"> {/* Wrapper to constrain StockSearch on desktop */}
                        <StockSearch />
                    </div>
                </div>
            )}

            {/* Section 3: Right-side icons & User Profile */}
            <div className="flex-shrink-0 flex items-center gap-0.5 sm:gap-1 md:gap-2"> {/* Adjusted gaps */}
                {/* Search Icon (only on mobile when search is not active) */}
                {isMobile && !mobileSearchActive && (
                    <NavButton title="Search" customFunc={() => setMobileSearchActive(true)} color={currentColor} icon={<MdSearch />} />
                )}

                {/* Other icons - only show if not in mobile search mode OR on desktop */}
                {(!isMobile || !mobileSearchActive) && (
                    <>
                        <div className="hidden sm:flex items-center"> {/* Balance Display for sm and up */}
                            <BalanceDisplay balance={cashBalance} /> {/* Pass balance if needed, or context handles it */}
                        </div>
                        <NavButton
                            title="Notification"
                            dotColor="rgb(254, 201, 15)"
                            customFunc={() => handleClick('notification')}
                            color={currentColor}
                            icon={<RiNotification3Line />}
                        />
                    </>
                )}

                {/* User Profile Avatar & Dropdown */}
                <TooltipComponent content="Profile" position="BottomCenter">
                    <div
                        className="flex items-center gap-1 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                        onClick={() => handleClick('userProfile')}
                    >
                        <img className="rounded-full w-8 h-8 object-cover" src={avatar} alt="user-profile" />
                        {/* User name part: hidden on mobile (xs) OR when mobile search is active on mobile */}
                        {(!isMobile || !mobileSearchActive) && ( // Hide if mobile search is active
                            <p className="hidden sm:flex items-center ml-1"> {/* Also hidden on xs by default, shown sm and up */}
                                <span className="text-gray-400 text-sm">Hi,</span>
                                <span className="text-gray-400 font-bold ml-1 text-sm">
                                    {user?.u_name || 'User'}
                                </span>
                            </p>
                        )}
                        <MdKeyboardArrowDown className="text-gray-400 text-sm" />
                    </div>
                </TooltipComponent>
            </div>

            {/* Popups */}
            {isClicked.notification && <div ref={notificationRef}><Notification /></div>}
            {isClicked.userProfile && <div ref={userProfileRef}><UserProfile /></div>}
        </div>
    );
};

export default Navbar;