// Filepath: E:\WEB JS\fyp\opti-trade\src\components\dashboard\TodaysMarkets.jsx

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

function TodaysMarkets() {
    return (
        <div className="bg-cyan-700 text-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Today's Markets</h2>
            <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold">-1.50%</span>
                <span className="text-sm">5/24</span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">SPX 115.24</span>
                <span className="text-xl font-semibold">NDX 604.48</span>
            </div>
            <div className="flex justify-between">
                <div className="text-center">
                    <span className="block text-sm">S&P 500</span>
                    <span className="block text-lg font-bold">73%</span>
                </div>
                <div className="text-center">
                    <span className="block text-sm">Nasdaq100</span>
                    <span className="block text-lg font-bold">50%</span>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TodaysMarkets;
