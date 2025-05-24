// ChartConfigurator.jsx
import React from 'react';
import Highcharts from 'highcharts/highstock';             // includes candlestick
import HighchartsReact from 'highcharts-react-official';
import Accessibility from 'highcharts/modules/accessibility';
import Indicators    from 'highcharts/indicators/indicators';
import moment        from 'moment';
import IndicatorsCore from 'highcharts/indicators/indicators'; // Core indicators module
import MovingAverage from 'highcharts/indicators/ema'; // EMA also brings in SMA by dependency
import Rsi from 'highcharts/indicators/rsi';

Accessibility(Highcharts);
IndicatorsCore(Highcharts); // Initialize core indicators
MovingAverage(Highcharts);  // Initialize EMA (and SMA)
Rsi(Highcharts);            // Initialize RSI

Accessibility(Highcharts);
Indicators(Highcharts);

const ChartConfigurator = ({ seriesData, stockSymbol, chartType }) => {
    const fmt = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2
    });

    // ensure numeric
    const valid = (seriesData || []).map(d => ({
        x:      d.x,
        open:   d.open,
        high:   d.high,
        low:    d.low,
        close:  d.close,
        volume: d.volume
    }));

    // prepare two sets of price data
    const priceData = chartType === 'candlestick'
        ? valid.map(d => ({
            x:      d.x,
            open:   d.open,
            high:   d.high,
            low:    d.low,
            close:  d.close,
            volume: d.volume
        }))
        : valid.map(d => ({
            x:      d.x,
            y:      d.close,
            open:   d.open,
            high:   d.high,
            low:    d.low,
            close:  d.close,
            volume: d.volume
        }));

    const volumeData = valid.map(d => [d.x, d.volume]);

    const options = {
        chart: {
            backgroundColor: '#19212C',
            style:           { fontFamily: 'inherit' }
        },
        title: {
            text:  `${stockSymbol} — ${chartType==='candlestick'?'Candlestick':'Line'}`,
            style: { color: '#FFF' }
        },
        rangeSelector: {
            selected:   1,
            inputStyle: { color: '#CCC' },
            labelStyle: { color: '#CCC' }
        },
        xAxis: {
            type:       'datetime',
            labels:     { style: { color: '#CCC' } },
            lineColor:  '#2A2F38'
        },
        yAxis: [
            {
                title: { text: 'Price', style: { color: '#CCC' } },
                labels: {
                    formatter() { return fmt.format(this.value); },
                    style:     { color: '#CCC' }
                },
                gridLineColor: '#2A2F38',
                height:        '70%'
            },
            {
                title: { text: 'Volume', style: { color: '#CCC' } },
                labels: {
                    formatter() {
                        if (this.value >= 1e9) return (this.value/1e9).toFixed(1)+'B';
                        if (this.value >= 1e6) return (this.value/1e6).toFixed(1)+'M';
                        if (this.value >= 1e3) return (this.value/1e3).toFixed(1)+'K';
                        return this.value;
                    },
                    style: { color: '#CCC' }
                },
                top:            '75%',
                height:         '25%',
                offset:         0,
                opposite:       true,
                gridLineColor:  '#2A2F38'
            }
        ],
        yAxis: [
            { // Price Y-Axis (Main - for Candlestick/Line, SMA, EMA)
                title: { text: 'Price', style: { color: '#CCC' } },
                labels: {
                    formatter() { return fmt.format(this.value); },
                    style:     { color: '#CCC' }
                },
                gridLineColor: '#2A2F38',
                height:        '60%', // Reduced height to make space for RSI
                lineWidth: 1,     // Added for visibility
                lineColor: '#404040' // Added for visibility
            },
            { // RSI Y-Axis
                title: { text: 'RSI', style: { color: '#CCC' } },
                labels: {
                    style: { color: '#CCC' },
                    align: 'right',
                    x: -3
                },
                gridLineColor: '#2A2F38',
                top: '62%',       // Position below price chart
                height: '18%',    // Allocate space for RSI
                offset: 0,
                lineWidth: 1,
                lineColor: '#404040'
            },
            { // Volume Y-Axis
                title: { text: 'Volume', style: { color: '#CCC' } },
                labels: {
                    formatter() {
                        if (this.value >= 1e9) return (this.value/1e9).toFixed(1)+'B';
                        if (this.value >= 1e6) return (this.value/1e6).toFixed(1)+'M';
                        if (this.value >= 1e3) return (this.value/1e3).toFixed(1)+'K';
                        return this.value.toLocaleString(); // Changed from this.value
                    },
                    style: { color: '#CCC' }
                },
                top:            '82%', // Position below RSI
                height:         '18%', // Allocate space for Volume
                offset:         0,
                opposite:       true,
                gridLineColor:  '#2A2F38',
                lineWidth: 1,
                lineColor: '#404040'
            }
        ],
        tooltip: {
            shared:           true,
            backgroundColor:  '#2A2F38',
            borderColor:      '#3B404A',
            style:            { color: '#FFF' },
            formatter() {
                const dateStr = moment(this.x).format('MMM D, YYYY');
                let s = `<b>${dateStr}</b><br/>`;
                // price or candlestick
                const pricePt = this.points.find(p => p.series.type!=='column');
                if (pricePt) {
                    const p = pricePt.point;
                    s += `O: ${fmt.format(p.open)} H: ${fmt.format(p.high)}<br/>`;
                    s += `L: ${fmt.format(p.low)} C: ${fmt.format(p.close)}<br/>`;
                }
                // volume
                const volPt = this.points.find(p => p.series.type==='column');
                if (volPt) {
                    s += `Vol: ${volPt.point.y.toLocaleString()}`;
                }
                return s;
            }
        },
        // ChartConfigurator.jsx (inside the options.series array)

        series: [
            { // Main Price Series (Candlestick or Line)
                type: chartType,
                id: `${stockSymbol}-price`, // IMPORTANT: Give the main series an ID
                name: `${stockSymbol} Price`,
                data: priceData, // This is your existing priceData
                upColor: chartType === 'candlestick' ? '#26a69a' : undefined,
                color: chartType === 'candlestick' ? '#ef5350' : '#26a69a', // Line color or down candle
                lineColor: chartType === 'candlestick' ? '#ef5350' : undefined, // For candlestick wick/border
                upLineColor: chartType === 'candlestick' ? '#26a69a' : undefined,
                marker: chartType === 'line' ? { enabled: false } : undefined,
                dataGrouping: {
                    units: [['week',[1]], ['month',[1,2,3,4,6]]]
                },
                yAxis: 0 // Links to the first yAxis (Price)
            },
            { // Volume Series
                type: 'column',
                id: `${stockSymbol}-volume`, // Give volume an ID too
                name: 'Volume',
                data: volumeData, // This is your existing volumeData
                yAxis: 2,         // Links to the third yAxis (Volume)
                color: '#7cb5ec',
                dataGrouping: {
                    units: [['week',[1]], ['month',[1,2,3,4,6]]]
                }
            },
            // --- TECHNICAL INDICATORS ---
            {
                type: 'sma',
                linkedTo: `${stockSymbol}-price`, // Link to the main price series ID
                zIndex: 1,
                marker: { enabled: false },
                params: {
                    period: 14 // Example: 14-period SMA
                },
                color: '#FFD700', // Gold color for SMA
                lineWidth: 1,
                tooltip: { valueSuffix: ' (SMA 14)'},
                dataGrouping: {
                    units: [['week',[1]], ['month',[1,2,3,4,6]]]
                }
            },
            {
                type: 'ema',
                linkedTo: `${stockSymbol}-price`, // Link to the main price series ID
                zIndex: 1,
                marker: { enabled: false },
                params: {
                    period: 26 // Example: 26-period EMA
                },
                color: '#ADFF2F', // GreenYellow for EMA
                lineWidth: 1,
                tooltip: { valueSuffix: ' (EMA 26)'},
                dataGrouping: {
                    units: [['week',[1]], ['month',[1,2,3,4,6]]]
                }
            },
            {
                type: 'rsi',
                linkedTo: `${stockSymbol}-price`, // Link to the main price series ID
                yAxis: 1, // Link RSI to the second yAxis
                color: '#FF69B4', // HotPink for RSI line
                lineWidth: 1,
                marker: { enabled: false },
                params: {
                    period: 14, // Example: 14-period RSI
                    // overbought: 70, // Default
                    // oversold: 30    // Default
                },
                tooltip: { valueDecimals: 2, valueSuffix: ' (RSI 14)' },
                dataGrouping: {
                    units: [['week',[1]], ['month',[1,2,3,4,6]]]
                },
                // Optional: Style the overbought/oversold zones for RSI
                zones: [{
                    value: 30, // Oversold
                    color: 'rgba(255, 105, 180, 0.3)' // Transparent pink
                }, {
                    value: 70, // Overbought
                    color: 'rgba(255, 105, 180, 0.3)'
                }, {
                    // Middle zone
                }]
            }
            // To add Bollinger Bands:
            // {
            //     type: 'bb', // bollinger bands
            //     linkedTo: `${stockSymbol}-price`,
            //     zIndex: 0,
            //     lineWidth: 1,
            //     color: '#FFA500', // Orange for BB
            //     fillOpacity: 0.1,
            //     params: {
            //         period: 20,
            //         standardDeviation: 2
            //     },
            //     tooltip: { valueSuffix: ' (BB 20,2)'}
            // }
            // To add MACD:
            // {
            //     type: 'macd',
            //     linkedTo: `${stockSymbol}-price`,
            //     yAxis: 1, // Or a new dedicated yAxis for MACD
            //     params: {
            //         shortPeriod: 12,
            //         longPeriod: 26,
            //         signalPeriod: 9,
            //         // period: 26 // (this is for the macd line itself if not using short/long)
            //     },
            //     // MACD has multiple lines (macd, signal, histogram)
            //     // You might need to style them individually if defaults aren't what you want
            //     // macdLine: { styles: { lineColor: 'blue' } },
            //     // signalLine: { styles: { lineColor: 'red' } },
            //     // series Držák: { styles: { color: 'green', type: 'column' } } // For histogram
            // }
        ],
// ...
        navigator: {
            adaptToUpdatedData: true,
            series:             { type: 'line', data: valid.map(d=>[d.x,d.close]) }
        },
        credits: { enabled: false },
        plotOptions: {
            series:      { animation: { duration: 400 } },
            candlestick:{ lineColor: '#ef5350' },
            column:     { borderRadius: 2, pointPadding: 0.1, groupPadding: 0.1 }
        },
        scrollbar: {
            barBackgroundColor:    '#2A2F38',
            buttonBackgroundColor: '#2A2F38',
            trackBackgroundColor:  '#19212C',
            rifleColor:            '#CCC'
        }
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType="stockChart"
            options={options}
            containerProps={{ style: { height: '600px', width: '100%' } }}
        />
    );
};

export default ChartConfigurator;
