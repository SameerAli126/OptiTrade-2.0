import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridComponent, ColumnDirective, ColumnsDirective, Page, Inject, Filter } from '@syncfusion/ej2-react-grids';
import '../../../../assets/DashScreener.css';
import DashHeader from '../components/DashHeader';
import { useStockData } from '../contexts/StockDataContext';

const localStockData = [
    { symbol: 'AAPL', name: 'Apple Inc.', open: 182.63, high: 183.42, low: 181.85, close: 183.04, volume: 48745800, marketCap: 2814000000000 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', open: 403.78, high: 405.64, low: 402.11, close: 404.87, volume: 21456700, marketCap: 3008000000000 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', open: 151.32, high: 152.47, low: 150.89, close: 152.21, volume: 25678900, marketCap: 1900000000000 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', open: 177.25, high: 178.96, low: 176.32, close: 178.75, volume: 34567800, marketCap: 1859000000000 },
    { symbol: 'TSLA', name: 'Tesla Inc.', open: 172.50, high: 174.25, low: 171.33, close: 173.80, volume: 98765400, marketCap: 552000000000 },
    { symbol: 'META', name: 'Meta Platforms Inc.', open: 486.34, high: 489.67, low: 485.12, close: 488.76, volume: 12345600, marketCap: 1240000000000 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', open: 903.63, high: 907.45, low: 900.12, close: 906.16, volume: 34567800, marketCap: 2225000000000 },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', open: 198.45, high: 199.32, low: 197.89, close: 199.05, volume: 8765430, marketCap: 570000000000 },
    { symbol: 'V', name: 'Visa Inc.', open: 275.34, high: 276.45, low: 274.67, close: 276.12, volume: 5678900, marketCap: 560000000000 },
    { symbol: 'WMT', name: 'Walmart Inc.', open: 59.78, high: 60.12, low: 59.45, close: 59.98, volume: 9876540, marketCap: 482000000000 },
    { symbol: 'PG', name: 'Procter & Gamble Co.', open: 165.34, high: 166.12, low: 165.01, close: 165.89, volume: 4567890, marketCap: 390000000000 },
    { symbol: 'MA', name: 'Mastercard Incorporated', open: 459.12, high: 460.45, low: 458.23, close: 460.12, volume: 3456780, marketCap: 420000000000 },
];

const DashScreener = ({ setSelectedStock }) => {
    const navigate = useNavigate();
    const { stockData, isLoading, error } = useStockData();
    const [displayData, setDisplayData] = useState(localStockData); // Initialize with dummy data

    useEffect(() => {
        // Only update with API data if it exists and there's no error
        if (stockData && !error) {
            setDisplayData(stockData);
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
        <div style={{ margin: '10%', marginTop: '0%', marginLeft: '0%', marginRight: '2%', maxWidth: '100%', overflowX: 'auto' }}>
            <DashHeader category="Analysis" title="Stock Screener" />

            {/* Always show the grid with dummy data, but indicate if we're using local data */}
            {error && <p style={{ color: 'orange' }}>Note: Using local data as server is unavailable</p>}

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
        </div>
    );
};

export default DashScreener;