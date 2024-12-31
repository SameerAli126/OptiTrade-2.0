// Filepath: E:\WEB JS\fyp\opti-trade\src\components\dashboard\dashboard-panel\quote-components\Card.jsx

import React from 'react';

const Card = ({ icon, number, label }) => {
    return (
        <div className="card bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <div className="card-icon mb-2">{icon}</div>
            <h2 className="font-bold text-2xl mb-1">{number}</h2>
            <p className="text-gray-600">{label}</p>
        </div>
    );
};

export default Card;
