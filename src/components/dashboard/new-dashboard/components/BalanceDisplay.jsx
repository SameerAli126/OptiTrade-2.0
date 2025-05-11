// src/components/dashboard/new-dashboard/components/BalanceDisplay.jsx
import React from 'react';
import { useStateContext } from '../contexts/ContextProvider.jsx';
import BalanceDropdown from './balanceDisplay/BalanceDropdown.jsx'; // Import the new component

const BalanceDisplay = () => {
    // Use balanceDetails from context
    const { balanceDetails, currentColor } = useStateContext();

    console.log('BalanceDisplay render - balanceDetails:', balanceDetails, 'currentColor:', currentColor);

    // Fallback if balanceDetails is not yet populated or is null/undefined
    const cashBalance = balanceDetails?.cash_balance ?? 0;
    const portfolioValue = balanceDetails?.portfolio_value ?? 0;
    const netWorth = balanceDetails?.net_worth ?? 0;

    return (
        // The div containing BalanceDropdown might need slight adjustments for positioning
        // The original ml-4 was on the main div. BalanceDropdown itself is position:relative.
        <div className="ml-4">
            <BalanceDropdown
                cashBalance={cashBalance}
                portfolioValue={portfolioValue}
                netWorth={netWorth}
                currentColor={currentColor}
            />
        </div>
    );
};
export default BalanceDisplay;