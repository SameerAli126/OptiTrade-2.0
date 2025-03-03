// Filepath: C:\Users\SAM\Downloads\Dashboard\opti-trade-pct\src\components\dashboard\new-dashboard\components\Navbar.jsx

import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { Cart, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { useAuth } from '../contexts/AuthContext.jsx'; // Import useAuth
import BalanceDisplay from './BalanceDisplay';
import StockSearch from './StockSearch';
import axios from "axios"; // Add this import

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
        <button
            type="button"
            onClick={customFunc}
            style={{ color }}
            className="relative text-xl rounded-full p-3 hover:bg-light-gray"
        >
            <span
                style={{ background: dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
            />
            {icon}
        </button>
    </TooltipComponent>
);

const Navbar = () => {
    const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
    const { user } = useAuth(); // Destructure user from useAuth
    const cartRef = useRef(null);
    const notificationRef = useRef(null);
    const userProfileRef = useRef(null);
    const [cashBalance, setCashBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
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
                    console.error('Error fetching balance:', error);
                }
            }
        };
        fetchBalance();
    }, [user?.id]);
    const handleActiveMenu = () => setActiveMenu(!activeMenu);

    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            handleClick('cart');
        }
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            handleClick('notification');
        }
        if (userProfileRef.current && !userProfileRef.current.contains(event.target)) {
            handleClick('userProfile');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative border-b" style={{ borderColor: currentColor }}>
            <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
            <div className="flex">
                <BalanceDisplay balance={cashBalance} />
                <StockSearch />
                <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart />} />
                <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
                <TooltipComponent content="Profile" position="BottomCenter">
                    <div
                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                        onClick={() => handleClick('userProfile')}
                    >
                        <img className="rounded-full w-8 h-8" src={avatar} alt="user-profile" />
                        <p>
                            <span className="text-gray-400 text-14">Hi,</span>{' '}
                            <span className="text-gray-400 font-bold ml-1 text-14">{user?.u_name || 'User'}</span>
                        </p>
                        <MdKeyboardArrowDown className="text-gray-400 text-14" />
                    </div>
                </TooltipComponent>

                {isClicked.cart && (<div ref={cartRef}><Cart /></div>)}
                {isClicked.notification && (<div ref={notificationRef}><Notification /></div>)}
                {isClicked.userProfile && (<div ref={userProfileRef}><UserProfile /></div>)}
            </div>
        </div>
    );
};

export default Navbar;
