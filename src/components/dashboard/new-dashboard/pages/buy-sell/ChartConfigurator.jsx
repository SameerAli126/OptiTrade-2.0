// ChartConfigurator.jsx
import React from 'react';
import Highcharts from 'highcharts/highstock';             // includes candlestick
import HighchartsReact from 'highcharts-react-official';
import Accessibility from 'highcharts/modules/accessibility';
import Indicators    from 'highcharts/indicators/indicators';
import moment        from 'moment';

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
        series: [
            chartType==='candlestick'
                ? {
                    type:         'candlestick',
                    name:         `${stockSymbol} Price`,
                    data:         priceData,
                    upColor:      '#26a69a',
                    color:        '#ef5350',
                    dataGrouping: {
                        units: [['week',[1]], ['month',[1,2,3,4,6]]]
                    }
                }
                : {
                    type:         'line',
                    name:         `${stockSymbol} Price`,
                    data:         priceData,
                    color:        '#26a69a',
                    marker:       { enabled: false },
                    dataGrouping: {
                        units: [['week',[1]], ['month',[1,2,3,4,6]]]
                    }
                },
            {
                type:         'column',
                name:         'Volume',
                data:         volumeData,
                yAxis:        1,
                color:        '#7cb5ec',
                dataGrouping: {
                    units: [['week',[1]], ['month',[1,2,3,4,6]]]
                }
            }
        ],
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
