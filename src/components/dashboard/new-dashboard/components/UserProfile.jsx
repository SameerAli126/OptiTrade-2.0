// Filepath: C:\Users\SAM\Downloads\Dashboard\opti-trade-pct\src\components\dashboard\new-dashboard\components\UserProfile.jsx

import React, { useState } from 'react';
import { Button } from '.';
import { userProfileData } from '../data/dummy.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import avatar from '../data/avatar.jpg';
import TransactionHistoryModal from './UserProfile/TransactionHistoryModal';

const UserProfile = () => {
    const { user, currentColor } = useAuth();
    const [showTransactions, setShowTransactions] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96" style={{ zIndex: 1000 }}>
            {/* User Profile Header */}
            <div className="flex gap-5 items-center mt-1 border-color border-b-1 pb-6">
                <img
                    className="rounded-full h-24 w-24"
                    src={avatar}
                    alt="user-profile"
                />
                <div>
                    <p className="font-semibold text-xl dark:text-gray-200">{user?.u_name || 'User'}</p>
                    <p className="text-gray-500 text-sm dark:text-gray-400">Administrator</p>
                    <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">{user?.email || 'info@shop.com'}</p>
                    <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">UID: {user?.id || 'N/A'}</p>
                </div>
            </div>

            {/* Profile Options */}
            <div>
                {userProfileData.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
                        onClick={item.title === 'Transaction History' ? () => setShowTransactions(true) : undefined}
                    >
                        <button
                            type="button"
                            style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                            className="text-xl rounded-lg p-3 hover:bg-light-gray"
                        >
                            {item.icon}
                        </button>
                        <div>
                            <p className="font-semibold dark:text-gray-200">{item.title}</p>
                            <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Transaction History Modal */}
            {showTransactions && (
                <TransactionHistoryModal
                    userId={user?.id}
                    currentColor={currentColor}
                    onClose={() => setShowTransactions(false)}
                />
            )}

            {/* Logout Button */}
            <div className="mt-5">
                <Button
                    color="white"
                    bgColor={currentColor}
                    text="Logout"
                    borderRadius="10px"
                    width="full"
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
};

export default UserProfile;