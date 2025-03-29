import React, { useState, useEffect } from 'react';
import { useStateContext } from '../new-dashboard/contexts/ContextProvider';
import axios from 'axios';

const PortfolioMetricCard = ({ title, value, percentage, isCurrency }) => {
    const { currentColor } = useStateContext();

    return (
        <div className="h-full w-full rounded-lg p-3 transition-all duration-300 hover:scale-[1.02]"
             style={{
                 backgroundColor: `${currentColor}10`,
                 border: `1px solid ${currentColor}20`,
                 minHeight: '150px' // Ensure consistent minimum height
             }}>
            <p className="text-xs font-medium text-slate-400">{title}</p>
            <p className="text-lg font-semibold my-1" style={{ color: currentColor }}>
                {isCurrency ? '$' : ''}{value}
            </p>
            {percentage !== undefined && (
                <span className="text-xs font-medium"
                      style={{ color: percentage >= 0 ? currentColor : '#991b1b' }}>
                    {percentage > 0 ? '+' : ''}{percentage}%
                </span>
            )}
        </div>
    );
};

const PortfolioCard = ({ children }) => {
    const { currentColor, user } = useStateContext();
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            if (!user?.id) return;
            try {
                const response = await axios.get(
                    `https://archlinux.tail9023a4.ts.net/metrics/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setMetrics(response.data);
            } catch (error) {
                console.error('Error fetching metrics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, [user?.id]);

    // Combine all cards into single array


    return (
        <div className="group relative flex w-full flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/20">
            {/* Background elements */}
            <div className="absolute inset-0 rounded-xl blur-sm transition-opacity duration-300 group-hover:opacity-30"
                 style={{ background: `linear-gradient(to right, ${currentColor}, purple, pink)`, opacity: 0.2 }} />
            <div className="absolute inset-px rounded-[11px] bg-slate-950" />

            <div className="relative">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg"
                             style={{ background: `linear-gradient(to bottom right, ${currentColor}, purple)` }}>
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-white">Portfolio Analytics</h3>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Live
                    </span>
                </div>

                {/* Unified 5-column grid for all cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    {children}
                </div>

                {/* Chart Section */}
                <div className="mb-4 h-24 w-full overflow-hidden rounded-lg bg-slate-900/50 p-3">
                    <div className="flex h-full w-full items-end justify-between gap-1">
                        {[40, 60, 75, 45, 85, 65, 95].map((height, index) => (
                            <div key={index} className="w-3 rounded-sm relative"
                                 style={{
                                     height: `${height}%`,
                                     backgroundColor: `${currentColor}30`
                                 }}>
                                <div className="w-full rounded-sm absolute bottom-0 transition-all duration-300"
                                     style={{
                                         height: `${100 - height}%`,
                                         backgroundColor: currentColor
                                     }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-400">Last 7 days</span>
                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <button className="flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium text-white transition-all duration-300"
                            style={{ background: `linear-gradient(to right, ${currentColor}, purple)` }}>
                        View Details
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioCard;