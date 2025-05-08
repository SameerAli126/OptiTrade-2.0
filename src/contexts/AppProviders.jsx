// src/contexts/AppProviders.jsx (or a suitable location)
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient'; // Adjust path as needed
import { AuthProvider } from '../components/dashboard/new-dashboard/contexts/AuthContext'; // Adjust path
import { ContextProvider } from '../components/dashboard/new-dashboard/contexts/ContextProvider'; // Adjust path
import { StockDataProvider } from '../components/dashboard/new-dashboard/contexts/StockDataContext'; // Adjust path
import { PriceDataProvider } from '../components/dashboard/new-dashboard/contexts/PriceDataContext'; // Adjust path
// Import other global providers here if you have more

export const AppProviders = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ContextProvider> {/* Assuming ContextProvider depends on Auth or is general UI */}
                    <StockDataProvider>
                        <PriceDataProvider>
                            {children}
                        </PriceDataProvider>
                    </StockDataProvider>
                </ContextProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};