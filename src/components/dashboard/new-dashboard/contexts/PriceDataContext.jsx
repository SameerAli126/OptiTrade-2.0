// src/components/dashboard/new-dashboard/contexts/PriceDataContext.jsx
import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ALL_STOCK_PRICES} from "../../../../config/apiEndpoints.js";

const PriceDataContext = createContext();

const fetchStockPrices = async () => {
    const response = await fetch(`/api${ALL_STOCK_PRICES}`);
    if (!response.ok) {
        throw new Error('Failed to fetch stock prices');
    }
    return response.json();
};

export const PriceDataProvider = ({ children }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['stockPrices'], // Unique query key
        queryFn: fetchStockPrices,
        refetchInterval: 5000, // Refetch every 5 seconds
    });

    return (
        <PriceDataContext.Provider value={{
            pricesData: data,
            isLoadingPrices: isLoading,
            pricesError: error,
        }}>
            {children}
        </PriceDataContext.Provider>
    );
};

export const usePriceData = () => {
    const context = useContext(PriceDataContext);
    if (!context) {
        throw new Error('usePriceData must be used within a PriceDataProvider');
    }
    return context;
};