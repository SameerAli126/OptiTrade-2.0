// Filepath: src/components/dashboard/new-dashboard/pages/Watchlist.jsx
import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnDirective, ColumnsDirective, Inject, Filter } from '@syncfusion/ej2-react-grids';
import DashHeader from '../components/DashHeader';
import { WatchlistService } from '../services/WatchlistService';
import { Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useStateContext();

    const fetchWatchlist = async () => {
        setLoading(true);
        try {
            const data = await WatchlistService.getWatchlist(user.id);
            setWatchlist(data);
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (user?.id) fetchWatchlist();
    }, [user]);

    const handleRemove = async (symbol) => {
        if (await WatchlistService.removeFromWatchlist(user.id, symbol)) {
            setWatchlist(prev => prev.filter(item => item.stock_symbol !== symbol));
        }
    };

    return (
        <div style={{ margin: '10%', marginTop: '1%', marginLeft: '0%', maxWidth: '95%', overflowX: 'auto' }}>
            <DashHeader category="Favorites" title="Watchlist" />

            {loading ? (
                <p>Loading watchlist...</p>
            ) : watchlist.length === 0 ? (
                <p>No stocks in your watchlist. Start adding some!</p>
            ) : (
                <GridComponent
                    dataSource={watchlist}
                    allowFiltering={true}
                    filterSettings={{ type: 'Excel' }}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='stock_symbol' headerText='Symbol' width='100' />
                        <ColumnDirective
                            headerText='Actions'
                            width='120'
                            template={(props) => (
                                <Button
                                    text="Remove"
                                    color="white"
                                    bgColor="#e31626"
                                    borderRadius="5px"
                                    onClick={() => handleRemove(props.stock_symbol)}
                                />
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