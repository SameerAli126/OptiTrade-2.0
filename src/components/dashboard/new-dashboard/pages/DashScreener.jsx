import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridComponent, ColumnDirective, ColumnsDirective, Page, Inject, Filter } from '@syncfusion/ej2-react-grids';
import '../../../../assets/DashScreener.css';
import DashHeader from '../components/DashHeader';
import { useStockData } from '../contexts/StockDataContext';

const localStockData = [
    { symbol: 'AAPL', name: 'Apple Inc.', open: 150, high: 155, low: 149, close: 154, volume: 1000000, marketCap: 2500000000000 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', open: 2800, high: 2850, low: 2780, close: 2840, volume: 1200000, marketCap: 1900000000000 },
];

const DashScreener = ({ setSelectedStock }) => {
    const navigate = useNavigate();
    const { stockData, isLoading, error } = useStockData();
    const [displayData, setDisplayData] = useState(localStockData);

    useEffect(() => {
        if (stockData) {
            setDisplayData(stockData);
        } else if (error) {
            console.error('Using local stock data:', error);
            setDisplayData(localStockData);
        }
    }, [stockData, error]);

    const handleSymbolClick = (stock) => {
        setSelectedStock(stock);
        navigate('/dashboard/buy-sell');
    };

    const formatMarketCap = (marketCap) => {
        if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
        if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
        if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
        return marketCap ? `$${marketCap.toLocaleString()}` : 'N/A';
    };

    return (
        <div style={{ margin: '10%', marginTop: '0%', marginLeft: '0%', marginRight: '2%', maxWidth: '95%', overflowX: 'auto' }}>
            <DashHeader category="Analysis" title="Stock Screener" />

            {isLoading ? (
                <p>Loading market data...</p>
            ) : error ? (
                <p>Using local data: {error.message}</p>
            ) : (
                <GridComponent
                    dataSource={displayData}
                    allowPaging={true}
                    pageSettings={{ pageSize: 10 }}
                    allowFiltering={true}
                    allowGrouping={false}
                    filterSettings={{ type: 'Excel' }}
                    cssClass="custom-grid"
                >
                    <ColumnsDirective>
                        <ColumnDirective
                            field='symbol'
                            headerText='Symbol'
                            width='150'
                            template={(props) => (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={props.logo_light}
                                        alt={`${props.symbol} Logo`}
                                        style={{ width: '24px', height: '24px', marginRight: '8px', borderRadius: '50%' }}
                                    />
                                    <span
                                        onClick={() => handleSymbolClick(props)}
                                        style={{ cursor: 'pointer', color: '#086EBA' }}
                                    >
                                        {props.symbol}
                                    </span>
                                </div>
                            )}
                        />
                        <ColumnDirective
                            field='name'
                            headerText='Name'
                            width='200'
                            textAlign='Left'
                        />
                        <ColumnDirective
                            field='open'
                            headerText='Open'
                            width='120'
                            format='N2'
                            textAlign='Right'
                        />
                        <ColumnDirective
                            field='high'
                            headerText='High'
                            width='120'
                            format='N2'
                            textAlign='Right'
                        />
                        <ColumnDirective
                            field='low'
                            headerText='Low'
                            width='120'
                            format='N2'
                            textAlign='Right'
                        />
                        <ColumnDirective
                            field='close'
                            headerText='Close'
                            width='120'
                            format='N2'
                            textAlign='Right'
                        />
                        <ColumnDirective
                            field='volume'
                            headerText='Volume'
                            width='150'
                            format='N0'
                            textAlign='Right'
                        />
                        <ColumnDirective
                            field='marketCap'
                            headerText='Market Cap'
                            width='150'
                            textAlign='Right'
                            template={(props) => (
                                <span>{formatMarketCap(props.marketCap)}</span>
                            )}
                        />
                    </ColumnsDirective>
                    <Inject services={[Page, Filter]} />
                </GridComponent>
            )}
        </div>
    );
};

export default DashScreener;