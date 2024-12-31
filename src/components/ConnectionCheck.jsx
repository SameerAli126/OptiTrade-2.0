import React, { useState } from 'react';

const ConnectionCheck = () => {
    const [message, setMessage] = useState('');

    const checkConnection = async () => {
        try {
            const response = await fetch('http://localhost:3000/check-connection');
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage('Failed to check connection: ' + data.error);
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div>
            <button onClick={checkConnection}>Check Connection</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ConnectionCheck;
