// src/components/DashHome/NasdaqSnapshotCard.jsx
import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { FaArrowUp, FaArrowDown, FaMinus, FaBrain } from 'react-icons/fa';
import moment from 'moment'; // Import moment for date formatting

// Optional: If you have a specific theme for Highcharts you want to apply
// import HighchartsTheme from 'highcharts/themes/dark-unica'; // Example theme
// if (typeof Highcharts === 'object') {
//     HighchartsTheme(Highcharts);
// }

const NasdaqSnapshotCard = ({ currentColor }) => {
    const [summaryData, setSummaryData] = useState(null);
    const [chartSeriesData, setChartSeriesData] = useState([]); // For candlestick [x, o, h, l, c]
    const [volumeSeriesData, setVolumeSeriesData] = useState([]); // For volume [x, y]
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [summaryResponse, intradayResponse] = await Promise.all([
                    fetch('https://archlinux.tail9023a4.ts.net/NASDAQ-summary'),
                    fetch('https://archlinux.tail9023a4.ts.net/NASDAQ-intraday')
                ]);

                if (!summaryResponse.ok) throw new Error(`Summary fetch failed: ${summaryResponse.status}`);
                if (!intradayResponse.ok) throw new Error(`Intraday fetch failed: ${intradayResponse.status}`);

                const summary = await summaryResponse.json();
                const intradayResult = await intradayResponse.json();

                setSummaryData(summary);

                if (intradayResult && intradayResult.intraday && intradayResult.intraday.length > 0) {
                    const processedCandlestick = intradayResult.intraday.map(d => ([
                        new Date(d.time).getTime(),
                        Number(d.open),
                        Number(d.high),
                        Number(d.low),
                        Number(d.close)
                    ])).sort((a, b) => a[0] - b[0]); // Sort by time (x-value)

                    const processedVolume = intradayResult.intraday.map(d => ([
                        new Date(d.time).getTime(),
                        Number(d.volume)
                    ])).sort((a, b) => a[0] - b[0]);

                    setChartSeriesData(processedCandlestick);
                    setVolumeSeriesData(processedVolume);
                } else {
                    setChartSeriesData([]);
                    setVolumeSeriesData([]);
                }

            } catch (err) {
                console.error("Error fetching Nasdaq data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // const intervalId = setInterval(fetchData, 60000);
        // return () => clearInterval(intervalId);
    }, []);

    const getSentimentIcon = (sentiment) => {
        // Placeholder for actual AI sentiment logic
        if (summaryData && summaryData.daily_change > 0) return <FaArrowUp className="text-green-500" />;
        if (summaryData && summaryData.daily_change < 0) return <FaArrowDown className="text-red-500" />;
        return <FaMinus className="text-gray-500" />;
    };

    const aiSentiment = summaryData ? (summaryData.daily_change > 0 ? "Bullish" : summaryData.daily_change < 0 ? "Bearish" : "Neutral") : "Loading...";

    // --- Chart Options ---
    const chartOptions = {
        chart: {
            backgroundColor: '#272931', // Dark background like reference
            height: 400, // Increased height for the chart
            // width: '100%', // Default, will take parent width
        },
        title: { text: null }, // Remove default title space
        credits: { enabled: false },
        rangeSelector: { enabled: false }, // Disable if not needed for this snapshot view
        scrollbar: { enabled: false }, // Disable if not needed
        navigator: { enabled: false }, // Disable if not needed

        xAxis: {
            type: 'datetime',
            labels: {
                style: { color: '#A0A0A0' }, // Lighter gray for labels
                format: '{value:%H:%M}' // Show time like 10AM, 11AM
            },
            lineColor: '#404040', // Axis line color
            tickColor: '#404040', // Tick mark color
            gridLineWidth: 0.5, // Faint grid lines
            gridLineColor: '#35373E',
        },
        yAxis: [
            { // Price Y-Axis (main)
                labels: {
                    align: 'right',
                    x: -3,
                    style: { color: '#A0A0A0' },
                    formatter: function () {
                        return this.value.toFixed(0); // Format like 18050, 18000
                    }
                },
                title: { text: null },
                height: '75%', // Main chart area
                lineWidth: 1,
                lineColor: '#404040',
                gridLineWidth: 0.5,
                gridLineColor: '#35373E',
                opposite: false, // Price on left by default
                // Add plotLines like the red dashed line in reference
                plotLines: summaryData?.previous_close ? [{
                    value: summaryData.previous_close,
                    color: 'red',
                    dashStyle: 'dash',
                    width: 1,
                    label: {
                        text: `Prev Close: ${summaryData.previous_close.toFixed(2)}`,
                        align: 'right',
                        style: { color: 'red', fontSize: '10px' },
                        y: -5,
                        x: -5
                    },
                    zIndex: 4
                }] : []
            },
            { // Volume Y-Axis
                labels: {
                    align: 'left',
                    x: 3,
                    style: { color: '#A0A0A0', fontSize: '10px' },
                    formatter: function () { // Simple volume formatting
                        if (this.value >= 1e9) return (this.value / 1e9).toFixed(1) + 'B';
                        if (this.value >= 1e6) return (this.value / 1e6).toFixed(1) + 'M';
                        if (this.value >= 1e3) return (this.value / 1e3).toFixed(1) + 'K';
                        return this.value;
                    }
                },
                title: {
                    text: 'RELATIVE VOLUME', // As per reference
                    align: 'middle',
                    style: { color: '#A0A0A0', fontSize: '10px' },
                },
                top: '78%', // Position below price chart
                height: '22%', // Area for volume bars
                offset: 0,
                lineWidth: 1,
                lineColor: '#404040',
                gridLineWidth: 0, // No grid lines for volume Y-axis
                opposite: false, // Volume labels on left
            }
        ],
        legend: { enabled: false },
        tooltip: {
            backgroundColor: 'rgba(30, 32, 40, 0.85)',
            borderColor: '#404040',
            style: { color: '#E0E0E0' },
            formatter: function () {
                const point = this.points ? this.points[0].point : this.point; // Use this.point for non-shared
                if (this.series.type === 'candlestick') {
                    return `<b>${moment(this.x).format('MMM D, HH:mm')}</b><br/>
                            O: ${point.open.toFixed(2)} H: ${point.high.toFixed(2)}<br/>
                            L: ${point.low.toFixed(2)} C: ${point.close.toFixed(2)}<br/>
                            Vol: ${this.points && this.points[1] ? this.points[1].y.toLocaleString() : (point.volume ? point.volume.toLocaleString() : 'N/A')}`;
                }
                if (this.series.type === 'column') { // Volume series
                    return `<b>${moment(this.x).format('MMM D, HH:mm')}</b><br/>
                            Volume: ${this.y.toLocaleString()}`;
                }
                return false; // Hide tooltip for other series if any
            },
            split: true, // Allows separate tooltips for each series if needed, or for one shared one.
                         // If false, formatter needs to iterate this.points
        },
        plotOptions: {
            candlestick: {
                color: '#FF5252', // Red for down candles
                upColor: '#26A69A', // Green for up candles
                lineColor: '#FF5252', // Wick color for down candles
                upLineColor: '#26A69A', // Wick color for up candles
            },
            series: {
                animation: false, // Disable animation for snapshot feel
                dataGrouping: { enabled: false } // Disable data grouping for intraday high frequency
            }
        },
        series: [
            {
                type: 'candlestick',
                name: 'NASDAQ Price',
                data: chartSeriesData,
                yAxis: 0,
            },
            {
                type: 'column',
                name: 'Volume',
                data: volumeSeriesData,
                yAxis: 1, // Link to the second yAxis
                color: '#4682B4', // A blueish color for volume
                pointWidth: 5, // Adjust for thinner volume bars if needed
            }
        ]
    };


    if (loading) return (
        <div className="bg-[#272931] text-white p-4 rounded-lg shadow-xl flex items-center justify-center min-h-[400px]"> {/* Increased min-height */}
            <p>Loading Nasdaq Data...</p>
        </div>
    );
    if (error) return (
        <div className="bg-[#272931] text-white p-4 rounded-lg shadow-xl flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-red-400">Error: {error}</p>
            <p className="text-xs text-gray-500 mt-1">Could not load Nasdaq data.</p>
        </div>
    );

    return (
        // The card itself will take the full width of its grid cell.
        // We control the chart size mainly via chart.height in options.
        <div className="bg-[#272931] text-white p-4 rounded-lg shadow-xl "> {/* Example: allow card to span more columns */}
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h3 className="text-xl font-semibold">NASDAQ</h3>
                    <p className="text-xs text-gray-400">
                        {summaryData ? moment(new Date(chartSeriesData[chartSeriesData.length -1]?.[0] || Date.now())).format('MMM D') : 'Fetching date...'}
                    </p> {/* Shows date of last data point */}
                </div>
                <div className="text-right">
                    <p className={`text-lg font-semibold ${summaryData?.daily_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {summaryData?.daily_change >= 0 ? '+' : ''}
                        {summaryData?.daily_change?.toFixed(2) || '0.00'}
                        ({summaryData?.percent_change >= 0 ? '+' : ''}
                        {summaryData?.percent_change?.toFixed(2) || '0.00'}%)
                    </p>
                    <p className="text-xs text-gray-400">
                        Current: {summaryData?.current?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) || 'N/A'}
                    </p>
                </div>
            </div>

            {chartSeriesData.length > 0 ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                    constructorType={'stockChart'}
                />
            ) : (
                <div className="h-[250px] bg-gray-800 my-4 rounded flex items-center justify-center text-sm text-gray-500">
                    No intraday chart data available
                </div>
            )}

            {/* AI Sentiment can be below the chart or integrated differently */}
            <div className="flex justify-start items-center pt-3 mt-2 border-t border-gray-700">
                <p className="text-gray-400 text-sm flex items-center">
                    <FaBrain className="mr-2" style={{ color: currentColor || '#03C9D7' }} /> AI Sentiment:
                </p>
                <div className="flex items-center ml-2">
                    {getSentimentIcon(aiSentiment)}
                    <p className="font-semibold text-sm ml-1">{aiSentiment}</p>
                </div>
            </div>
        </div>
    );
};

export default NasdaqSnapshotCard;