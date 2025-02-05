import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StockDetail = ({ stock }) => {
    const data = [
        // Example data for the graph
        { name: 'Jan', price: 100 },
        { name: 'Feb', price: 110 },
        { name: 'Mar', price: 105 },
        // Add more data points as needed
    ];

    const handleBuy = () => {
        console.log(`Buying ${stock.symbol}`);
        // Implement buy logic here
    };

    const handleSell = () => {
        console.log(`Selling ${stock.symbol}`);
        // Implement sell logic here
    };

    return (
        <div className="stock-detail-container p-4 bg-white rounded-md shadow-md mt-4">
            <h3 className="text-xl mb-2">{stock.name} ({stock.symbol})</h3>
            <p>Price: {stock.lastsale}</p>
            <p>Market Cap: {stock.marketCap}</p>
            <p>Sector: {stock.sector}</p>

            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>

            <div className="flex justify-around mt-4">
                <button onClick={handleBuy} className="px-4 py-2 bg-green-500 text-white rounded">Buy</button>
                <button onClick={handleSell} className="px-4 py-2 bg-red-500 text-white rounded">Sell</button>
            </div>
        </div>
    );
};

export default StockDetail;
