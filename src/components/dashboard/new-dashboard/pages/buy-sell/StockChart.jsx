import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Accessibility from 'highcharts/modules/accessibility';
import Indicators from 'highcharts/indicators/indicators';
import moment from 'moment';

// Initialize modules
Indicators(Highcharts);
Accessibility(Highcharts);

const StockChart = ({ stock }) => {
    const [chartOptions, setChartOptions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!stock) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://archlinux.tail9023a4.ts.net/stocks/${stock.symbol}`);
                if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
                const result = await response.json();

                const seriesData = Object.entries(result)
                    .map(([date, values]) => ({
                        x: new Date(date).getTime(),
                        close: Number(values.Close),
                        volume: Number(values.Volume)
                    }))
                    .sort((a, b) => a.x - b.x);

                const numberFormat = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2
                });

                const options = {
                    chart: {
                        backgroundColor: '#19212C',
                        style: {
                            fontFamily: 'inherit'
                        }
                    },
                    title: {
                        text: `${stock.symbol} Stock Price`,
                        style: {
                            color: '#FFFFFF'
                        }
                    },
                    rangeSelector: {
                        buttons: [{
                            type: 'month',
                            count: 1,
                            text: '1M'
                        }, {
                            type: 'month',
                            count: 3,
                            text: '3M'
                        }, {
                            type: 'ytd',
                            text: 'YTD'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],
                        selected: 3,
                        buttonTheme: {
                            fill: '#2A2F38',
                            stroke: '#3B404A',
                            style: {
                                color: '#CCCCCC'
                            },
                            states: {
                                select: {
                                    fill: '#3B404A',
                                    style: {
                                        color: '#FFFFFF'
                                    }
                                }
                            }
                        },
                        inputStyle: {
                            color: '#CCCCCC'
                        }
                    },
                    yAxis: [{
                        labels: {
                            formatter: function() {
                                return numberFormat.format(this.value);
                            },
                            x: -10,
                            style: {
                                color: '#CCCCCC'
                            }
                        },
                        gridLineColor: '#2A2F38',
                        height: '70%'
                    }, {
                        labels: {
                            formatter: function() {
                                return this.value.toLocaleString();
                            },
                            x: -10,
                            style: {
                                color: '#CCCCCC'
                            }
                        },
                        gridLineColor: '#2A2F38',
                        top: '75%',
                        height: '25%'
                    }],
                    xAxis: {
                        lineColor: '#2A2F38',
                        labels: {
                            style: {
                                color: '#CCCCCC'
                            }
                        }
                    },
                    series: [{
                        type: 'line',
                        name: 'Price',
                        data: seriesData.map(d => [d.x, d.close]),
                        color: '#26a69a',
                        tooltip: {
                            valueDecimals: 2
                        }
                    }, {
                        type: 'column',
                        name: 'Volume',
                        data: seriesData.map(d => [d.x, d.volume]),
                        yAxis: 1,
                        color: '#7cb5ec'
                    }],
                    navigator: {
                        series: {
                            type: 'line',
                            data: seriesData.map(d => [d.x, d.close]),
                            color: '#666666'
                        },
                        outlineColor: '#3B404A',
                        maskFill: 'rgba(42, 47, 56, 0.3)'
                    },
                    tooltip: {
                        backgroundColor: '#2A2F38',
                        style: {
                            color: '#FFFFFF'
                        },
                        formatter: function() {
                            return `<b>${moment(this.x).format('MMM D, YYYY')}</b><br/>
                                Price: ${numberFormat.format(this.y)}<br/>
                                Volume: ${this.point.volume?.toLocaleString()}`;
                        }
                    },
                    credits: { enabled: false },
                    plotOptions: {
                        line: {
                            marker: {
                                enabled: false
                            }
                        },
                        column: {
                            borderRadius: 2
                        }
                    }
                };

                setChartOptions(options);
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
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
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={chartOptions}
                containerProps={{ style: { height: '600px', width: '100%' } }}
            />
        </div>
    );
};

export default StockChart;