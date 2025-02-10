import React from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider.jsx';

const NewComponent = () => {
    const { currentColor } = useStateContext();

    return (
        <div className="text-white rounded-lg shadow-md p-4 m-2 flex-1" style={{ backgroundColor: currentColor }}>
            <h2 className="text-lg font-semibold mb-4">New Component</h2>
            <p>This is a new component for the portfolio.</p>
        </div>
    );
};

export default NewComponent;
