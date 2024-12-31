// Filepath: E:\WEB JS\fyp\opti-trade\src\components\user-profile\UserProfile.jsx

import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const UserProfile = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleIconClick = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    return (
        <div className="relative flex items-center">
            <FaUserCircle className="w-6 h-6 text-white cursor-pointer" onClick={handleIconClick} />
            {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-1">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Change Password</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
