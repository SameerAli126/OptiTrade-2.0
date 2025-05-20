import api from './api';
import endpoints from './endpoints';

export const getPortfolio = (userId) => api.get(endpoints.portfolio(userId));
export const getMetrics   = (userId) => api.get(endpoints.metrics(userId));