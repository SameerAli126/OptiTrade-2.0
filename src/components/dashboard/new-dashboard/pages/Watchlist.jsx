import React, { useState, useEffect } from 'react';
import {
    GridComponent,
    ColumnDirective,
    ColumnsDirective,
    Page,
    Inject,
    Filter,
    Group
} from '@syncfusion/ej2-react-grids';
import DashHeader from '../components/DashHeader';

const Watchlist = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await fetch('https://archlinux.tail9023a4.ts.net/stocks');
                const data = await response.json();
                // Take the first 10 stocks
                const topStocks = data.slice(0, 10);
                setStocks(topStocks);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        fetchStocks();
    }, []);

    return (
        <div style={{ margin: '10%', marginTop: '1%', marginLeft: '0%', maxWidth: '95%', overflowX: 'auto' }}>
            <DashHeader category="Favorites" title="Watchlist" /> {/* Add DashHeader here */}
            <GridComponent
                dataSource={stocks}
                allowPaging={false} // Disable paging since we only show top 10
                allowFiltering={true}
                allowGrouping={true}
                filterSettings={{ type: 'Excel' }} // Enable Excel-style filtering
            >
                <ColumnsDirective>
                    <ColumnDirective field='symbol' headerText='Symbol' width='100' />
                    <ColumnDirective field='name' headerText='Name' width='150' />
                    <ColumnDirective field='open' headerText='Open' textAlign='Right' width='100' />
                    <ColumnDirective field='high' headerText='High' textAlign='Right' width='100' />
                    <ColumnDirective field='low' headerText='Low' textAlign='Right' width='100' />
                    <ColumnDirective field='close' headerText='Close' textAlign='Right' width='100' />
                    <ColumnDirective field='volume' headerText='Volume' textAlign='Right' width='100' />
                    <ColumnDirective field='netchange' headerText='Net Change' textAlign='Right' width='100' />
                    <ColumnDirective field='pctchange' headerText='Pct Change' textAlign='Right' width='100' />
                    <ColumnDirective field='marketCap' headerText='Market Cap' textAlign='Right' width='150' />
                    <ColumnDirective field='industry' headerText='Industry' width='150' />
                    <ColumnDirective field='sector' headerText='Sector' width='150' />
                </ColumnsDirective>
                <Inject services={[Filter, Group]} />
            </GridComponent>
        </div>
    );
}

export default Watchlist;
