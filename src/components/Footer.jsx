import React from 'react';
import { useStateContext } from './dashboard/new-dashboard/contexts/ContextProvider.jsx'

const Footer = () => {
    const { currentColor, currentMode } = useStateContext();

    return (
        <footer
            className={`relative bottom-5 w-full text-center opacity-70 text-sm ${
                currentMode === 'Dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
            style={{ backgroundColor: currentColor }}
        >
            Stocks & funds offered through OptiTrade Financial. Other fees may apply.
        </footer>
    );
};

export default Footer;
