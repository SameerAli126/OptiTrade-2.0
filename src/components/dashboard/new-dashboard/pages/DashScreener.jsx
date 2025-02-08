import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    GridComponent,
    ColumnDirective,
    ColumnsDirective,
    Page,
    Inject,
    Filter,
    Group
} from '@syncfusion/ej2-react-grids';
import '../../../../assets/DashScreener.css'; // Import custom CSS
import DashHeader from '../components/DashHeader';
const DashScreener = ({ setSelectedStock }) => {
    const [stocks, setStocks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await fetch('https://archlinux.tail9023a4.ts.net/stocks');
                const data = await response.json();
                setStocks(data);
            } catch (error) {
                console.error('Error fetching stocks:', error);
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
        <div style={{ margin: '10%', marginTop: '1%', marginLeft: '0%', maxWidth: '95%', overflowX: 'auto'  }}>
            <DashHeader category="Analysis" title="Stock Screener" /> {/* Add DashHeader here */}
            <GridComponent
                dataSource={stocks}
                allowPaging={true}
                pageSettings={{ pageSize: 10 }}
                allowFiltering={true}
                allowGrouping={true}
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
                                    style={{ width: '24px', height: '24px', marginRight: '8px' }}
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
                <Inject services={[Page, Filter, Group]} />
            </GridComponent>
        </div>
    );
};

export default DashScreener;