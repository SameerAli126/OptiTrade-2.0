import React, { useEffect, useState } from 'react';
import {
    StockChartComponent,
    StockChartSeriesCollectionDirective,
    StockChartSeriesDirective,
    Inject,
    DateTime,
    SplineSeries, // Import SplineSeries
    Tooltip,
    Crosshair,
    Legend,
} from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import '@syncfusion/ej2/styles/customized/material.css';
import OHLCVMarketCap from './buy-sell/OHLCVMarketCap.jsx';

const StockInfo = ({ stock }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!stock) return;

        // Fetch historical data from the backend API
        const fetchHistoricalData = async () => {
            try {
                const response = await fetch(`https://archlinux.tail9023a4.ts.net/stocks/${stock.symbol}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();

                // Format data for the chart
                const formattedData = result.map((entry) => ({
                    x: new Date(entry.date), // Use 'x' for the date axis
                    high: entry.price, // Use 'high' for the price (or any other field you want to plot)
                }));

                setChartData(formattedData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching historical data:', err);
                setError('Failed to fetch historical data. Please try again later.');
                setLoading(false);
            }
        };

        fetchHistoricalData();
    }, [stock]);

    if (!stock) {
        return <div className="bg-gray-800 text-white rounded-lg shadow-md p-4">Buy & Sell</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {/* Stock Information */}
            <div className="flex items-center mb-6">
                <img
                    src={stock.logo_high_light}
                    alt={`${stock.symbol} Logo`}
                    className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {stock.symbol} - ${stock.close.toFixed(2)}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">{stock.name}</p>
                </div>
            </div>

            {/* OHLCV and Market Cap Data */}
            <OHLCVMarketCap stock={stock} />

            {/* Syncfusion Spline Chart */}
            <div className="mb-6">
                {loading ? (
                    <p className="text-center text-white dark:text-blue-900">Loading chart data...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <StockChartComponent
                        id="stockchartspline"
                        primaryXAxis={{
                            valueType: 'DateTime',
                            majorGridLines: { width: 0 },
                            crosshairTooltip: { enable: true },
                        }}
                        primaryYAxis={{
                            lineStyle: { color: 'transparent' },
                            majorTickLines: { color: 'transparent', height: 0 },
                        }}
                        tooltip={{ enable: true }}
                        crosshair={{ enable: true }}
                        legendSettings={{ visible: true }}
                        title={`${stock.symbol} Stock Price`}
                    >
                        <Inject services={[DateTime, SplineSeries, Tooltip, Crosshair, Legend]} /> {/* Inject SplineSeries and other required modules */}
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective
                                dataSource={chartData}
                                xName="x"
                                yName="high"
                                type="Spline" // Use Spline series
                                name="Price"
                            />
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                )}
            </div>

            {/* Buy/Sell Buttons */}
            <div className="flex justify-between">
                <ButtonComponent
                    cssClass="e-success"
                    content="Buy"
                    style={{ padding: '10px 20px', borderRadius: '8px' }}
                />
                <ButtonComponent
                    cssClass="e-danger"
                    content="Sell"
                    style={{ padding: '10px 20px', borderRadius: '8px' }}
                />
            </div>
        </div>
    );
};

export default StockInfo;