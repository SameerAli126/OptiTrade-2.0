// Filepath: src/components/dashboard/new-dashboard/services/WatchlistService.js

import {
    GET_WATCHLIST,
    ADD_TO_WATCHLIST,
    REMOVE_FROM_WATCHLIST
} from '../../../../config/apiEndpoints';

export const WatchlistService = {
    getWatchlist: async (userId) => {
        try {
            const response = await fetch(`/api${GET_WATCHLIST(userId)}`);
            if (!response.ok) throw new Error('Failed to fetch watchlist');
            return await response.json();
        } catch (error) {
            console.error('Error fetching watchlist:', error);
            return [];
        }
    },

    addToWatchlist: async (userId, symbol) => {
        if (!userId) {
            console.error('User ID is missing');
            return false;
        }

        try {
            const response = await fetch(`/api${ADD_TO_WATCHLIST(userId, symbol)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                return false;
            }
            return true;
        } catch (error) {
            console.error('Network Error:', error);
            return false;
        }
    },

    removeFromWatchlist: async (userId, symbol) => {
        try {
            const response = await fetch(`/api${REMOVE_FROM_WATCHLIST(userId, symbol)}`, {
                method: 'DELETE',
            });
            return response.ok;
        } catch (error) {
            console.error('Error removing from watchlist:', error);
            return false;
        }
    }
};