// Filepath: src/components/dashboard/new-dashboard/contexts/StockDataContext.jsx
import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DASH_SCREENER_DATA} from "../../../../config/apiEndpoints.js"

const StockDataContext = createContext();

const fetchStocks = async () => {
    const response = await fetch(`/api${DASH_SCREENER_DATA}`);
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