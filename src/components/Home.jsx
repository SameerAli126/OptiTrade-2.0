import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to OptiTrade</h1>
            <p>Explore the stock market, manage your portfolio, and simulate trades in real-time!</p>
            <ul>
                <li><Link to="/trading">Go to Trading</Link></li>
                <li><Link to="/market">Market Overview</Link></li>
                {/* Add other links as needed */}
            </ul>
        </div>
    );
};

export default Home;
