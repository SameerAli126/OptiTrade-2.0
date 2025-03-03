import React from 'react';
import { formatNumber } from '../utils/formatNumber.js'; // Import the utility function
import { useStateContext } from '../contexts/ContextProvider.jsx'; // Import the context
//commit
const BalanceDisplay = ({ balance }) => {
    const formattedBalance = formatNumber(balance); // Format the balance dynamically
    const { currentColor } = useStateContext(); // Destructure the current theme color

    return (
        <div className="flex items-center justify-center md:rounded-[1.5rem] px-3 ml-4" style={{ backgroundColor: currentColor }}>
            <span className="text-white text-normal font-normal">Balance: ${formattedBalance}</span>
        </div>
    );
};

export default BalanceDisplay;