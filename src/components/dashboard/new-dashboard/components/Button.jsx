import React from 'react';
import { useStateContext } from '../contexts/ContextProvider.jsx';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  const { currentColor, setIsClicked, initialState } = useStateContext();

  return (
      <button
          type="button"
          onClick={() => setIsClicked(initialState)}
          style={{ backgroundColor: bgColor || currentColor, color, borderRadius }}
          className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor || currentColor}`}
      >
        {icon} {text}
      </button>
  );
};

export default Button;
