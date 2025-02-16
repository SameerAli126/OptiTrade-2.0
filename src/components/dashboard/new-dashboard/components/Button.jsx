// Button.jsx (corrected version)
import React from 'react';
import { useStateContext } from '../contexts/ContextProvider.jsx';

const Button = ({
                    icon,
                    bgColor,
                    color,
                    bgHoverColor,
                    size,
                    text,
                    borderRadius,
                    width,
                    onClick // Add this prop
                }) => {
    const { currentColor } = useStateContext();

    return (
        <button
            type="button"
            onClick={onClick} // Use passed onClick instead of hardcoded
            style={{
                backgroundColor: bgColor || currentColor,
                color,
                borderRadius,
                width: width || 'auto' // Add width handling
            }}
            className={`text-${size} p-3 hover:drop-shadow-xl hover:brightness-90 transition-all`}
        >
            {icon} {text}
        </button>
    );
};

export default Button;