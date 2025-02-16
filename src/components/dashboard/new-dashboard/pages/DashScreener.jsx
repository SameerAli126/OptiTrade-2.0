import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    GridComponent,
    ColumnDirective,
    ColumnsDirective,
    Page,
    Inject,
    Filter
} from '@syncfusion/ej2-react-grids';
import '../../../../assets/DashScreener.css'; // Import custom CSS
import DashHeader from '../components/DashHeader';

// Local stock data to use when the API is offline
const localStockData = [
    { symbol: 'AAPL', name: 'Apple Inc.', open: 150, high: 155, low: 149, close: 154, volume: 1000000, marketCap: 2500000000000 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', open: 2800, high: 2850, low: 2780, close: 2840, volume: 1200000, marketCap: 1900000000000 },
    // Add more local stock data as needed
];

const DashScreener = ({ setSelectedStock }) => {
    const [stocks, setStocks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await fetch('https://archlinux.tail9023a4.ts.net/stocks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStocks(data);
            } catch (error) {
                console.error('Error fetching stocks from API:', error);
                setStocks(localStockData); // Use local data if API fetch fails
            }
        };

        fetchStocks();
    }, []);

    const handleSymbolClick = (stock) => {
        console.log('Stock data being passed:', stock); // Debug: Check the stock data
        setSelectedStock(stock); // Pass the selected stock to the parent component
        navigate('/dashboard/buy-sell'); // Navigate to the BuySell_o route inside the Dashboard
    };

    // Function to format market cap
    const formatMarketCap = (marketCap) => {
        if (marketCap >= 1e12) {
            return `$${(marketCap / 1e12).toFixed(2)}T`; // Trillions
        } else if (marketCap >= 1e9) {
            return `$${(marketCap / 1e9).toFixed(2)}B`; // Billions
        } else if (marketCap >= 1e6) {
            return `$${(marketCap / 1e6).toFixed(2)}M`; // Millions
        } else {
            return `$${marketCap.toLocaleString()}`; // Less than a million
        }
    };

    return (
        <div style={{ margin: '10%', marginTop: '0%', marginLeft: '0%', marginRight: '2%', maxWidth: '95%', overflowX: 'auto' }}>
            <DashHeader category="Analysis" title="Stock Screener" /> {/* DashHeader title */}

            <GridComponent
                dataSource={stocks}
                allowPaging={true}
                pageSettings={{ pageSize: 10 }}
                allowFiltering={true}
                allowGrouping={false} // Disable grouping
                filterSettings={{ type: 'Excel' }} // Enable Excel-style filtering
                cssClass="custom-grid" // Apply custom CSS class
            >
                <ColumnsDirective>
                    <ColumnDirective
                        field='symbol'
                        headerText='Symbol'
                        width='150'
                        template={(props) => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={props.logo_light} // Use the 64-size logo
                                    alt={`${props.symbol} Logo`}
                                    style={{ width: '24px', height: '24px', marginRight: '8px', borderRadius: '50%' }} // Rounded logo
                                />
                                <span
                                    onClick={() => handleSymbolClick(props)}
                                    style={{ cursor: 'pointer', color: '#086EBA' }} // Use #086EBA color
                                >
                                    {props.symbol}
                                </span>
                            </div>
                        )}
                    />
                    <ColumnDirective field='name' headerText='Name' width='200' />
                    <ColumnDirective field='open' headerText='Open' textAlign='Right' width='120' />
                    <ColumnDirective field='high' headerText='High' textAlign='Right' width='120' />
                    <ColumnDirective field='low' headerText='Low' textAlign='Right' width='120' />
                    <ColumnDirective field='close' headerText='Close' textAlign='Right' width='120' />
                    <ColumnDirective field='volume' headerText='Volume' textAlign='Right' width='150' /> {/* Increased width */}
                    <ColumnDirective
                        field='marketCap'
                        headerText='Market Cap'
                        textAlign='Right'
                        width='150'
                        template={(props) => (
                            <span>{formatMarketCap(props.marketCap)}</span> // Format market cap
                        )}
                    />
                </ColumnsDirective>
                <Inject services={[Page, Filter]} /> {/* Removed Group service */}
            </GridComponent>
        </div>
    );
};

export default DashScreener;