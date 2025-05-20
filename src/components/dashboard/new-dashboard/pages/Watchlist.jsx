import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridComponent, ColumnDirective, ColumnsDirective, Inject, Filter } from '@syncfusion/ej2-react-grids';
import DashHeader from '../components/DashHeader';
import { WatchlistService } from '../services/WatchlistService';
import { useStateContext } from '../contexts/ContextProvider';
import { useStockData } from '../contexts/StockDataContext';
import { FaTrash } from 'react-icons/fa';
import { localStockData } from '../data/dummyTable';

const dummyWatchlistStocks = [
    {
        ...localStockData.find(stock => stock.symbol === 'AAPL'),
        logo_light: 'https://logo.clearbit.com/apple.com',
        sector: 'Technology',
        last_dividend_date: '2023-05-12',
        last_dividend_amount: 0.24,
        dividend_yield: 0.58,
        payment_frequency: 'Quarterly'
    },
    {
        ...localStockData.find(stock => stock.symbol === 'MSFT'),
        logo_light: 'https://logo.clearbit.com/microsoft.com',
        sector: 'Technology',
        last_dividend_date: '2023-03-09',
        last_dividend_amount: 0.68,
        dividend_yield: 0.80,
        payment_frequency: 'Quarterly'
    },
    {
        ...localStockData.find(stock => stock.symbol === 'TSLA'),
        logo_light: 'https://logo.clearbit.com/tesla.com',
        sector: 'Automotive',
        last_dividend_date: 'N/A',
        last_dividend_amount: 0,
        dividend_yield: 0,
        payment_frequency: 'N/A'
    },
];

const Watchlist = () => {
    const navigate = useNavigate();
    const [watchlistStocks, setWatchlistStocks] = useState(dummyWatchlistStocks);
    const [loading, setLoading] = useState(false);
    const { user } = useStateContext();
    const { stockData, isLoading: stocksLoading, error: stocksError } = useStockData();

    useEffect(() => {
        let isMounted = true;

        const timeoutId = setTimeout(() => {
            if (isMounted) {
                console.warn('Timeout reached. Loading dummy data.');
                setWatchlistStocks(dummyWatchlistStocks);
                setLoading(false);
            }
        }, 10000); // 10 sec timeout

        const fetchData = async () => {
            if (!user?.id) {
                setWatchlistStocks(dummyWatchlistStocks);
                return;
            }

            setLoading(true);
            try {
                const watchlistResponse = await WatchlistService.getWatchlist(user.id);
                if (watchlistResponse && stockData) {
                    const watchlistSymbols = watchlistResponse.map(item => item.stock_symbol);
                    const filteredStocks = stockData
                        .filter(stock => watchlistSymbols.includes(stock.symbol))
                        .map(stock => ({
                            ...stock,
                            logo_light: stock.logo_light || '',
                            sector: stock.sector || 'N/A',
                            last_dividend_date: stock.last_dividend_date || 'N/A',
                            last_dividend_amount: stock.last_dividend_amount || 0,
                            dividend_yield: stock.dividend_yield || 0,
                            payment_frequency: stock.payment_frequency || 'N/A'
                        }));
                    if (isMounted) {
                        clearTimeout(timeoutId);
                        setWatchlistStocks(filteredStocks);
                    }
                }
            } catch (error) {
                console.error('API error, loading dummy data:', error);
                if (isMounted) setWatchlistStocks(dummyWatchlistStocks);
            }
            if (isMounted) setLoading(false);
        };

        fetchData();

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [user, stockData]);

    const handleRemove = async (symbol) => {
        if (!user?.id) {
            setWatchlistStocks(prev => prev.filter(stock => stock.symbol !== symbol));
            return;
        }

        try {
            if (await WatchlistService.removeFromWatchlist(user.id, symbol)) {
                setWatchlistStocks(prev => prev.filter(stock => stock.symbol !== symbol));
            }
        } catch (error) {
            console.error('Error removing from watchlist:', error);
        }
    };

    const handleSymbolClick = (stock) => {
        const cleanStock = {
            symbol: stock.symbol,
            name: stock.name,
            open: stock.open,
            high: stock.high,
            low: stock.low,
            close: stock.close,
            volume: stock.volume,
            marketCap: stock.marketCap,
            logo_high_light: stock.logo_light,
            sector: stock.sector,
            last_dividend_date: stock.last_dividend_date,
            last_dividend_amount: stock.last_dividend_amount,
            dividend_yield: stock.dividend_yield,
            payment_frequency: stock.payment_frequency
        };
        navigate('/dashboard/buy-sell', { state: { stock: cleanStock } });
    };

    const formatMarketCap = (marketCap) => {
        if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(1)}T`;
        if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(1)}B`;
        if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(1)}M`;
        return marketCap ? `$${marketCap.toLocaleString()}` : 'N/A';
    };

    return (
        <div style={{ marginTop: '0%', marginLeft: '0%', maxWidth: '95%', overflowX: 'auto' }}>
            <DashHeader category="Favorites" title="Watchlist" />

            {(!user || stocksError) && (
                <p style={{ color: 'orange', marginBottom: '10px' }}>
                    Note: Using demo watchlist data {!user ? '(not logged in)' : '(server unavailable)'}
                </p>
            )}

            {loading ? (
                <p>Loading watchlist...</p>
            ) : watchlistStocks.length === 0 ? (
                <p>No stocks in your watchlist. Start adding some!</p>
            ) : (
                <GridComponent
                    dataSource={watchlistStocks}
                    allowFiltering={true}
                    filterSettings={{ type: 'Excel' }}
                    cssClass="custom-grid"
                    width="100%" // Added fluid width
                    style={{
                        maxWidth: '1200px', // Constrain maximum width
                        margin: '0 auto'
                    }}
                >
                    <ColumnsDirective>
                        <ColumnDirective
                            field='symbol'
                            headerText='Symbol'
                            width='140'

                            template={(props) => (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <img
                                        src={props.logo_light}
                                        alt={`${props.symbol} logo`}
                                        style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            backgroundColor: 'white',
                                            padding: '2px'
                                        }}

                                    />
                                    <span
                                        onClick={() => handleSymbolClick(props)}
                                        style={{
                                            color: '#086EBA',
                                            fontWeight: 500,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {props.symbol}
                                    </span>
                                    <button
                                        onClick={() => handleRemove(props.symbol)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#e31626',
                                            marginLeft: 'auto'
                                        }}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            )}
                        />
                        <ColumnDirective field='name' headerText='Company Name' width='150' textAlign='Left' />
                        <ColumnDirective field='sector' headerText='Sector' width='150' textAlign='Left' />
                        <ColumnDirective field='open' headerText='Open' width='100' format='N2' textAlign='Right' />
                        <ColumnDirective field='high' headerText='High' width='100' format='N2' textAlign='Right' />
                        <ColumnDirective field='low' headerText='Low' width='120' format='N2' textAlign='Right' />
                        <ColumnDirective field='close' headerText='Close' width='120' format='N2' textAlign='Right' />
                        <ColumnDirective field='volume' headerText='Volume' width='120' format='N0' textAlign='Right' />
                        <ColumnDirective
                            field='marketCap'
                            headerText='Market Cap'
                            width='140'
                            template={(props) => (
                                <span style={{ textAlign: 'right', display: 'block' }}>
                                    {formatMarketCap(props.marketCap)}
                                </span>
                            )}
                        />
                    </ColumnsDirective>
                    <Inject services={[Filter]} />
                </GridComponent>
            )}
        </div>
    );
};

export default Watchlist;
