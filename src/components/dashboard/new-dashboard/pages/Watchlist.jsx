import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridComponent, ColumnDirective, ColumnsDirective, Inject, Filter } from '@syncfusion/ej2-react-grids';
import DashHeader from '../components/DashHeader';
import { WatchlistService } from '../services/WatchlistService';
import { useStateContext } from '../contexts/ContextProvider';
import { useStockData } from '../contexts/StockDataContext';
import { FaTrash } from 'react-icons/fa';

const Watchlist = () => {
    const navigate = useNavigate();
    const [watchlistStocks, setWatchlistStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useStateContext();
    const { stockData, isLoading: stocksLoading, error: stocksError } = useStockData();

    const fetchWatchlist = async () => {
        if (!user?.id || !stockData) return;

        setLoading(true);
        try {
            const watchlistResponse = await WatchlistService.getWatchlist(user.id);
            const watchlistSymbols = watchlistResponse.map(item => item.stock_symbol);
            const filteredStocks = stockData
                .filter(stock => watchlistSymbols.includes(stock.symbol))
                .map(stock => ({
                    ...stock,
                    logo_light: stock.logo_light || '',
                    sector: stock.sector || 'N/A'
                }));
            setWatchlistStocks(filteredStocks);
        } catch (error) {
            console.error('Error fetching watchlist:', error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchWatchlist();
    }, [user, stockData]);

    const handleRemove = async (symbol) => {
        if (await WatchlistService.removeFromWatchlist(user.id, symbol)) {
            setWatchlistStocks(prev => prev.filter(stock => stock.symbol !== symbol));
        }
    };

    const handleSymbolClick = (stock) => {
        // Create clean serializable stock object
        const cleanStock = {
            symbol: stock.symbol,
            name: stock.name,
            open: stock.open,
            high: stock.high,
            low: stock.low,
            close: stock.close,
            volume: stock.volume,
            marketCap: stock.marketCap,
            logo_high_light: stock.logo_light, // Match property name used in StockInfo
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

    if (stocksLoading) return <p>Loading stock data...</p>;
    if (stocksError) return <p>Error loading stock data: {stocksError.message}</p>;

    return (
        <div style={{ marginTop: '0%', marginLeft: '0%', maxWidth: '95%', overflowX: 'auto' }}>
            <DashHeader category="Favorites" title="Watchlist" />

            {loading ? (
                <p>Loading watchlist...</p>
            ) : watchlistStocks.length === 0 ? (
                <p>No stocks in your watchlist. Start adding some!</p>
            ) : (
                <GridComponent
                    dataSource={watchlistStocks}
                    allowFiltering={true}
                    filterSettings={{ type: 'Excel' }}
                >
                    <ColumnsDirective>
                        <ColumnDirective
                            field='symbol'
                            headerText='Symbol'
                            width='180'
                            template={(props) => (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                        {/* Other columns remain the same */}
                        <ColumnDirective
                            field='name'
                            headerText='Company Name'
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
                            width='120'
                            format='N0'
                            textAlign='Right'
                        />
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