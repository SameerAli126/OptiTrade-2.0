import React from 'react';
import { formatNumber } from '../utils/formatNumber.js'; // Import the utility function

const BalanceDisplay = ({ balance }) => {
    const formattedBalance = formatNumber(balance); // Format the balance dynamically

    return (
        <div className="flex items-center justify-center bg-[#02a1ac] md:rounded-[1.5rem] px-3 ml-4">
            <span className="text-white text-sm font-normal">Balance: ${formattedBalance}</span>
        </div>
    );
};

export default BalanceDisplay;