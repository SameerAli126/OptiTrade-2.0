import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Using Recharts for the chart

const StockFlipCard = ({ symbol, pctChange, netChange, sector, industry }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Generate random time series data for the chart
    const generateRandomData = () => {
        const data = [];
        let currentPrice = 100; // Starting price
        for (let i = 0; i < 7; i++) {
            data.push({
                date: `Day ${i + 1}`,
                price: currentPrice + (Math.random() - 0.5) * 10, // Random price fluctuations
            });
        }
        return data;
    };

    const chartData = generateRandomData();

    return (
        <div
            style={{
                width: '300px',
                height: '300px',
                margin: '10px',
            }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                {/* Front Side: Time Series Chart */}
                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h3>{symbol}</h3>
                    <p>Weekly Time Series</p>
                    <LineChart
                        width={250}
                        height={200}
                        data={chartData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" />
                    </LineChart>
                </div>

                {/* Back Side: Stock Details */}
                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h3>{symbol}</h3>
                    <p>Stock Details</p>
                    <div style={{ textAlign: 'left' }}>
                        <p><strong>Percentage Change:</strong> {pctChange}%</p>
                        <p><strong>Net Change:</strong> {netChange}</p>
                        <p><strong>Sector:</strong> {sector}</p>
                        <p><strong>Industry:</strong> {industry}</p>
                    </div>
                </div>
            </ReactCardFlip>
        </div>
    );
};

export default StockFlipCard;