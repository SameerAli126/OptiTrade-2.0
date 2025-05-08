import React from 'react';
import { formatNumber } from '../utils/formatNumber.js';
import { useStateContext } from '../contexts/ContextProvider.jsx';

const BalanceDisplay = () => {
    const { cashBalance, currentColor } = useStateContext();
    console.log('BalanceDisplay render - cashBalance:', cashBalance, 'currentColor:', currentColor);

    const formattedBalance = formatNumber(cashBalance);
    console.log('Formatted balance:', formattedBalance);

    return (
        <div className="flex items-center justify-center md:rounded-[1.2rem] h-10 px-3 ml-4"
             style={{ backgroundColor: currentColor }}>
            <span className="text-white text-normal font-normal">
                Balance: ${formattedBalance}
            </span>
        </div>
    );
};
export default BalanceDisplay;