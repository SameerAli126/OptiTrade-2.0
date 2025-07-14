// src/components/dashboard/new-dashboard/components/Notification.jsx
import React from 'react';
import Button from './Button'; // Your custom Button component
import { notificationData } from '../data/dummy'; // Import the new notificationData
import { useStateContext } from '../contexts/ContextProvider';
import { MdOutlineCancel } from 'react-icons/md'; // For a close button

const Notification = () => {
    const { currentColor, handleClick } = useStateContext(); // Assuming handleClick closes modals/popups

    const unreadNotifications = notificationData.filter(item => item.unread).length;

    return (
        <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-6 rounded-lg w-96 shadow-xl z-50 border dark:border-gray-700">
            <div className="flex justify-between items-center pb-4 border-b-1 dark:border-gray-600">
                <div className="flex gap-3 items-center">
                    <p className="font-semibold text-xl dark:text-gray-200">Notifications</p>
                    {unreadNotifications > 0 && (
                        <button
                            type="button"
                            className="text-white text-xs rounded-full p-1 px-2.5" // Made it rounder
                            style={{ backgroundColor: currentColor }} // Use theme color
                        >
                            {unreadNotifications} New
                        </button>
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => handleClick('notification')} // Assuming 'notification' is the key to close this
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl rounded-full p-1"
                    aria-label="Close notifications"
                >
                    <MdOutlineCancel />
                </button>
            </div>
            <div className="mt-5 max-h-96 overflow-y-auto custom-scrollbar"> {/* Added max-height and scroll */}
                {notificationData.length > 0 ? (
                    notificationData.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-start gap-4 p-3 border-b-1 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-700 ${item.unread ? 'bg-sky-50 dark:bg-sky-900/30' : ''}`}
                        >
                            {/* Icon with background */}
                            <div
                                style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                                className="flex items-center justify-center h-10 w-10 rounded-lg flex-shrink-0" // Changed to rounded-lg
                            >
                                <span className="text-xl">{item.icon}</span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{item.title}</p>
                                <p className="text-gray-600 text-xs dark:text-gray-400 mt-1">{item.desc}</p>
                                <p className="text-gray-400 text-xs dark:text-gray-500 mt-1">{item.time}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No new notifications.</p>
                )}

                {notificationData.length > 0 && (
                    <div className="mt-5 pt-4 border-t dark:border-gray-600">
                        <Button
                            color="white"
                            bgColor={currentColor}
                            text="See all notifications"
                            borderRadius="10px"
                            width="full"
                            // onClick={() => { /* Navigate to a full notifications page */ }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notification;