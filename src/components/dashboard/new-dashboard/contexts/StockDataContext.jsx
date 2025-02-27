// Filepath: src/components/dashboard/new-dashboard/contexts/StockDataContext.jsx
import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

const StockDataContext = createContext();

const fetchStocks = async () => {
    const response = await fetch('https://archlinux.tail9023a4.ts.net/stocks');
    if (!response.ok) throw new Error('Failed to fetch stocks');
    return response.json();
};

export const StockDataProvider = ({ children }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['stocks'],
        queryFn: fetchStocks,
    });

    return (
        <StockDataContext.Provider value={{
            stockData: data,
            isLoading,
            error
        }}>
            {children}
        </StockDataContext.Provider>
    );
};

export const useStockData = () => {
    const context = useContext(StockDataContext);
    if (!context) {
        throw new Error('useStockData must be used within a StockDataProvider');
    }
    return context;
};