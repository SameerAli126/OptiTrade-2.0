// Filepath: C:\Users\SAM\Downloads\Dashboard\opti-trade-pct\src\components\dashboard\new-dashboard\components\UserProfile.jsx

import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { Button } from '.'; // Assuming Button is a custom component
import { userProfileData } from '../data/dummy.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import defaultAvatar from '../data/avatar.jpg'; // Default avatar
import TransactionHistoryModal from './UserProfile/TransactionHistoryModal';
import { FiEdit2 } from 'react-icons/fi'; // Pencil Icon

const UserProfile = () => {
    const { user, login, currentColor } = useAuth(); // Assuming login function can update user context
    const [showTransactions, setShowTransactions] = useState(false);
    // State for avatar: localStorage for persistence, or default if none
    const [avatarSrc, setAvatarSrc] = useState(
        () => localStorage.getItem(`user_${user?.id}_avatar`) || defaultAvatar
    );
    const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
    const fileInputRef = useRef(null); // Ref for the hidden file input

    // Effect to update avatar if user changes (e.g., on login/logout)
    useEffect(() => {
        if (user?.id) {
            setAvatarSrc(localStorage.getItem(`user_${user?.id}_avatar`) || defaultAvatar);
        } else {
            setAvatarSrc(defaultAvatar); // Reset to default if no user
        }
    }, [user?.id]);


    const handleLogout = () => {
        // Call logout from AuthContext if it handles clearing user state globally
        // auth.logout(); // Assuming auth is an instance of useAuth()
        localStorage.removeItem('token');
        // Clear persisted avatar for this user on logout if desired
        // if (user?.id) {
        //     localStorage.removeItem(`user_${user?.id}_avatar`);
        // }
        window.location.href = '/login'; // Redirect to login
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click(); // Programmatically click the hidden file input
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (file) {
            // 1. Create a preview URL
            const previewUrl = URL.createObjectURL(file);
            setAvatarSrc(previewUrl);

            // 2. Persist locally (optional, for immediate UI update across sessions without backend)
            // This is a simple way, but for robust solution, you'd upload and get a URL from backend
            if (user?.id) {
                // For simplicity, storing blob URL; real app would store uploaded URL
                // To store the actual image data in localStorage (not recommended for large images):
                // const reader = new FileReader();
                // reader.onloadend = () => {
                //     localStorage.setItem(`user_${user?.id}_avatar`, reader.result as string);
                // };
                // reader.readAsDataURL(file);
                // For now, let's assume we just update UI and a separate upload happens
                // If you want to persist the blob URL (it's temporary):
                // localStorage.setItem(`user_${user?.id}_avatar`, previewUrl); // Blob URLs are temporary
            }


            // 3. Placeholder for actual upload logic
            // In a real app, you'd upload the 'file' object to your server here
            // and then update the user's profile (and potentially AuthContext)
            // with the new avatar URL returned by the server.
            console.log("Selected file:", file.name);
            // Example: await uploadAvatarToServer(user.id, file);
            // After successful upload, server returns new URL:
            // const newAvatarUrlFromServer = "https://server.com/path/to/new_avatar.jpg";
            // localStorage.setItem(`user_${user?.id}_avatar`, newAvatarUrlFromServer);
            // setAvatarSrc(newAvatarUrlFromServer);
            // Potentially update user in AuthContext if avatar URL is part of user object:
            // login(localStorage.getItem('token'), { ...user, avatarUrl: newAvatarUrlFromServer });
            alert("Avatar preview updated. Implement backend upload to save permanently.");
        }
    };


    return (
        <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 shadow-lg" style={{ zIndex: 1000 }}>
            {/* User Profile Header */}
            <div className="flex gap-5 items-center mt-1 border-color border-b-1 pb-6">
                <div
                    className="relative rounded-full h-24 w-24 cursor-pointer"
                    onMouseEnter={() => setIsHoveringAvatar(true)}
                    onMouseLeave={() => setIsHoveringAvatar(false)}
                    onClick={handleAvatarClick}
                    title="Change avatar"
                >
                    <img
                        className="rounded-full h-full w-full object-cover"
                        src={avatarSrc}
                        alt="user-profile"
                        onError={() => setAvatarSrc(defaultAvatar)} // Fallback to default if src is broken
                    />
                    {isHoveringAvatar && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                            <FiEdit2 className="text-white text-2xl" />
                        </div>
                    )}
                </div>
                {/* Hidden file input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept="image/png, image/jpeg, image/gif"
                />

                <div>
                    <p className="font-semibold text-xl dark:text-gray-200">{user?.u_name || 'User'}</p>
                    <p className="text-gray-500 text-sm dark:text-gray-400">
                        {/* Role - could be dynamic if available in user object */}
                        Trader
                    </p>
                    <p className="text-gray-500 text-sm font-semibold dark:text-gray-400 truncate w-48" title={user?.email}>
                        {user?.email || 'your@email.com'}
                    </p>
                    <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">UID: {user?.id || 'N/A'}</p>
                </div>
            </div>

            {/* Profile Options */}
            <div>
                {userProfileData.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
                        onClick={item.title === 'Transaction History' ? () => setShowTransactions(true) : (item.onClick || undefined)}
                    >
                        <button
                            type="button"
                            style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                            className="text-xl rounded-lg p-3 hover:bg-light-gray" // Ensure hover effect works well
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
                    // currentColor prop might not be available directly from useAuth() unless you added it.
                    // Pass it from a higher context or use a default.
                    // For now, assuming it's somehow available or you'll manage it.
                    currentColor={currentColor || '#03C9D7'}
                    onClose={() => setShowTransactions(false)}
                />
            )}

            {/* Logout Button */}
            <div className="mt-5">
                <Button
                    color="white"
                    bgColor={currentColor || '#03C9D7'} // Fallback for currentColor
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