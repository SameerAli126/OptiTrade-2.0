import React, { useState, useEffect } from 'react';
import ChartConfigurator from './ChartConfigurator';

const StockChart = ({ stock }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!stock) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://archlinux.tail9023a4.ts.net/stocks/${stock.symbol}`);
                if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
                const result = await response.json();

                const processedData = Object.entries(result).map(([date, values]) => ({
                    x: new Date(date).getTime(),
                    open: Number(values.Open),
                    high: Number(values.High),
                    low: Number(values.Low),
                    close: Number(values.Close),
                    volume: Number(values.Volume)
                })).sort((a, b) => a.x - b.x);

                setChartData(processedData);
                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [stock]);

    if (loading) return <div className="text-center p-4">Loading chart...</div>;
    if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="stock-chart-container">
            <ChartConfigurator seriesData={chartData} stockSymbol={stock.symbol} />
        </div>
    );
};

export default StockChart;