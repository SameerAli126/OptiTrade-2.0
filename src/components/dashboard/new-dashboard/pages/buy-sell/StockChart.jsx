// StockChart.jsx
import React, { useState, useEffect } from 'react';
import ChartConfigurator from './ChartConfigurator';
import { STOCK_HISTORICAL_DATA } from '../../../../../config/apiEndpoints';

const StockChart = ({ stock }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartType, setChartType] = useState(
        () => localStorage.getItem('preferredChart') || 'line'
    );

    // Persist the user’s last choice
    useEffect(() => {
        localStorage.setItem('preferredChart', chartType);
    }, [chartType]);

    // Fetch and process data
    useEffect(() => {
        if (!stock) return;
        setLoading(true);
        setError(null);

        (async () => {
            try {
                const resp = await fetch(`/api${STOCK_HISTORICAL_DATA(stock.symbol)}`);

                if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
                const json = await resp.json();
                if (Object.keys(json).length === 0) throw new Error('No data for this symbol.');

                const processed = Object.entries(json)
                    .map(([date, vals]) => ({
                        x: new Date(date).getTime(),
                        open: +vals.Open,
                        high: +vals.High,
                        low: +vals.Low,
                        close: +vals.Close,
                        volume: +vals.Volume
                    }))
                    .sort((a, b) => a.x - b.x);

                setChartData(processed);
            } catch (e) {
                console.error(e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [stock]);

    if (loading)  return <div className="p-4 text-center">Loading chart…</div>;
    if (error)    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
    if (!chartData.length)
        return <div className="p-4 text-center">No data for {stock.symbol}</div>;

    return (
        <div className="my-6">
            <div className="flex justify-center space-x-2 mb-4">
                {['line', 'candlestick'].map(type => (
                    <button
                        key={type}
                        onClick={() => setChartType(type)}
                        className={`px-4 py-2 rounded ${
                            chartType === type
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {type === 'line' ? 'Line Chart' : 'Candlestick'}
                    </button>
                ))}
            </div>

            {/* key forces a full re-render when chartType changes */}
            <ChartConfigurator
                key={chartType}
                seriesData={chartData}
                stockSymbol={stock.symbol}
                chartType={chartType}
            />
        </div>
    );
};

export default StockChart;
