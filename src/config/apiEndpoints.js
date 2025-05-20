// src/config/apiEndpoints.js

// Auth
export const LOGIN = '/login';
export const SIGNUP = '/signup';
export const VERIFY_OTP = '/verify-otp';
export const FORGOT_PASSWORD = '/forgot-password';
export const VERIFY_RESET_OTP = '/verify-reset-otp';

// Portfolio
export const PORTFOLIO_DATA = '/portfolio'; // Append ?user_id=:userId in component
export const USER_METRICS = (userId) => `/metrics/${userId}`;
export const PORTFOLIO_BUY = '/portfolio/buy';
export const PORTFOLIO_SELL = '/portfolio/sell';

// Stocks & Market Data
export const STOCK_HISTORICAL_DATA = (stockSymbol) => `/stocks/${stockSymbol}`;
export const NEWS_ARTICLES = '/news'; // Append ?page=:page&page_size=:pageSize in component
export const NASDAQ_SUMMARY = '/NASDAQ-summary';
export const NASDAQ_INTRADAY = '/NASDAQ-intraday';

// If WatchlistService is used, its endpoints would go here or be handled within that service
// Example:
// export const GET_WATCHLIST = (userId) => `/watchlist/${userId}`; // Or however your API is structured
// export const ADD_TO_WATCHLIST = '/watchlist/add';
// export const REMOVE_FROM_WATCHLIST = '/watchlist/remove';