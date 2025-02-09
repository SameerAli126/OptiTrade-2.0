import React, { useEffect, useState } from 'react';
import {
    StockChartComponent,
    StockChartSeriesCollectionDirective,
    StockChartSeriesDirective,
    Inject,
    DateTime,
    Tooltip,
    Crosshair,
    Legend,
    CandleSeries,
    LineSeries,
    EmaIndicator,
    RsiIndicator,
    BollingerBands,
    TmaIndicator,
    MomentumIndicator,
    SmaIndicator,
    AtrIndicator,
    AccumulationDistributionIndicator,
    MacdIndicator,
    StochasticIndicator,
    Export
} from '@syncfusion/ej2-react-charts';

const StockChart = ({ stock }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!stock) return;

        const fetchHistoricalData = async () => {
            try {
                const response = await fetch(`https://archlinux.tail9023a4.ts.net/stocks/${stock.symbol}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();

                const formattedData = Object.entries(result).map(([date, values]) => ({
                    x: new Date(date),
                    open: values.Open,
                    high: values.High,
                    low: values.Low,
                    close: values.Close,
                    volume: values.Volume,
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

    return (
        <div className="mb-6">
            {loading ? (
                <p className="text-center text-white dark:text-blue-900">Loading chart data...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <StockChartComponent
                    id="stockchart"
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
                    crosshair={{ enable: true, lineType: 'Both' }}
                    legendSettings={{ visible: true }}
                    title={`${stock.symbol} Stock Price`}
                    enablePeriodSelector={true}
                    periods={[
                        { text: '1M', interval: 1, intervalType: 'Months', selected: true },
                        { text: '3M', interval: 3, intervalType: 'Months' },
                        { text: '6M', interval: 6, intervalType: 'Months' },
                        { text: '1Y', interval: 1, intervalType: 'Years' },
                        { text: 'YTD', interval: 1, intervalType: 'Years', start: new Date(new Date().getFullYear(), 0, 1) },
                        { text: 'All', interval: 1, intervalType: 'Years', start: new Date(2000, 0, 1) }
                    ]}
                >
                    <Inject services={[
                        DateTime, Tooltip, Crosshair, CandleSeries, LineSeries,
                        EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator,
                        MomentumIndicator, SmaIndicator, AtrIndicator, Export,
                        AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator
                    ]} />
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective
                            dataSource={chartData}
                            xName="x"
                            open="open"
                            high="high"
                            low="low"
                            close="close"
                            volume="volume"
                            type="Candle"
                            name="Price"
                        />
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
            )}
        </div>
    );
};

export default StockChart;
