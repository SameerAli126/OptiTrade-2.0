import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Accessibility from 'highcharts/modules/accessibility';
import Indicators from 'highcharts/indicators/indicators';
import moment from 'moment';

// Initialize modules
Indicators(Highcharts);
Accessibility(Highcharts);

const ChartConfigurator = ({ seriesData, stockSymbol }) => {
    const numberFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    const validatedSeriesData = seriesData?.map(d => ({
        x: d.x,
        open: Number(d.open) || 0,
        high: Number(d.high) || 0,
        low: Number(d.low) || 0,
        close: Number(d.close) || 0,
        volume: Number(d.volume) || 0
    })) || [];

    const options = {
        chart: {
            backgroundColor: '#19212C',
            style: { fontFamily: 'inherit' }
        },
        title: {
            text: `${stockSymbol} Stock Price`,
            style: { color: '#FFFFFF' }
        },
        rangeSelector: {
            buttons: [
                { type: 'month', count: 1, text: '1M' },
                { type: 'month', count: 3, text: '3M' },
                { type: 'ytd', text: 'YTD' },
                { type: 'all', text: 'All' }
            ],
            selected: 3,
            buttonTheme: {
                fill: '#2A2F38',
                stroke: '#3B404A',
                style: { color: '#CCCCCC' },
                states: {
                    select: {
                        fill: '#3B404A',
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            inputStyle: { color: '#CCCCCC' }
        },
        yAxis: [
            {
                labels: {
                    formatter: function() { return numberFormat.format(this.value); },
                    x: -10,
                    style: { color: '#CCCCCC' }
                },
                gridLineColor: '#2A2F38',
                height: '70%'
            },
            {
                labels: {
                    formatter: function() { return this.value.toLocaleString(); },
                    x: -10,
                    style: { color: '#CCCCCC' }
                },
                gridLineColor: '#2A2F38',
                top: '75%',
                height: '25%'
            }
        ],
        xAxis: {
            lineColor: '#2A2F38',
            labels: { style: { color: '#CCCCCC' } }
        },
        series: [
            {
                type: 'line',
                name: 'Price',
                data: validatedSeriesData.map(d => ({
                    x: d.x,
                    y: d.close,
                    close: d.close, // Add this property
                    open: d.open,
                    high: d.high,
                    low: d.low,
                    volume: d.volume
                })),
                color: '#26a69a',
                tooltip: { valueDecimals: 2 }
            },
            {
                type: 'column',
                name: 'Volume',
                data: validatedSeriesData.map(d => ({
                    x: d.x,
                    y: d.volume,
                    close: d.close,
                    open: d.open,
                    high: d.high,
                    low: d.low
                })),
                yAxis: 1,
                color: '#7cb5ec'
            }
        ],
        navigator: {
            series: {
                type: 'line',
                data: validatedSeriesData.map(d => [d.x, d.close]),
                color: '#666666'
            },
            outlineColor: '#3B404A',
            maskFill: 'rgba(42, 47, 56, 0.3)'
        },
        tooltip: {
            backgroundColor: '#2A2F38',
            style: { color: '#FFFFFF' },
            formatter: function() {
                const point = this.point;
                return `<b>${moment(this.x).format('MMM D, YYYY')}</b><br/>
        Price: ${numberFormat.format(point.close || point.y)}<br/>
        Open: ${numberFormat.format(point.open)}<br/>
        High: ${numberFormat.format(point.high)}<br/>
        Low: ${numberFormat.format(point.low)}<br/>
        Volume: ${point.volume?.toLocaleString() || 'N/A'}`;
            }
        },
        credits: { enabled: false },
        plotOptions: {
            line: { marker: { enabled: false } },
            column: { borderRadius: 2 }
        }
    };
    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
            containerProps={{ style: { height: '600px', width: '100%' } }}
        />
    );
};

export default ChartConfigurator;