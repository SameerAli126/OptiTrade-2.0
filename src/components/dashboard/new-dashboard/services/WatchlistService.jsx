// Filepath: src/components/dashboard/new-dashboard/services/WatchlistService.js
const API_BASE = 'https://archlinux.tail9023a4.ts.net';

export const WatchlistService = {
    getWatchlist: async (userId) => {
        try {
            const response = await fetch(`${API_BASE}/watchlist/${userId}/`);
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
            const response = await fetch(`${API_BASE}/watchlist/${userId}/${symbol}/`, {
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
            const response = await fetch(`${API_BASE}/watchlist/${userId}/${symbol}/`, {
                method: 'DELETE',
            });
            return response.ok;
        } catch (error) {
            console.error('Error removing from watchlist:', error);
            return false;
        }
    }
};