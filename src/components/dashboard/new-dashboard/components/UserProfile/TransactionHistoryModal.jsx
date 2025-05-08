import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Button.jsx';
import { formatNumber } from '../../utils/formatNumber.js';

const TransactionHistoryModal = ({ userId, currentColor, onClose }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTransactions = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                'https://archlinux.tail9023a4.ts.net/transactions',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const userTransactions = response.data.filter(t => t.user_id === userId);
            setTransactions(userTransactions);
        } catch (err) {
            setError('Failed to fetch transaction history');
            console.error('Transaction error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchTransactions();
        }
    }, [userId]);

    const getTypeStyles = (transactionType) => {
        const baseStyle = 'px-2 py-1 rounded-full text-xs font-semibold';
        return transactionType === 'buy'
            ? `${baseStyle} bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100`
            : `${baseStyle} bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100`;
    };

    const getOrderTypeBadge = (orderType) => {
        const baseStyle = 'inline-block px-2 py-1 rounded text-xs font-medium';
        return orderType === 'limit'
            ? `${baseStyle} bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100`
            : `${baseStyle} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
            <div className="bg-white dark:bg-[#42464D] rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold dark:text-gray-200">
                        Transaction History
                    </h3>
                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Close"
                        borderRadius="8px"
                        onClick={onClose}
                        className="!px-4 !py-2"
                    />
                </div>

                {loading ? (
                    <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                        Loading transactions...
                    </div>
                ) : error ? (
                    <div className="text-red-500 p-4">{error}</div>
                ) : (
                    <div className="flex-1 overflow-y-auto pr-2">
                        <div className="grid grid-cols-5 gap-4 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 border-b dark:border-gray-600">
                            <span>Type</span>
                            <span>Symbol</span>
                            <span>Details</span>
                            <span className="text-right">Qty</span>
                            <span className="text-right">Date</span>
                        </div>

                        {transactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="p-4 border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="grid grid-cols-5 gap-4 items-center">
                                    <div className="flex items-center gap-2">
                                        <span className={getTypeStyles(transaction.transaction_type)}>
                                            {transaction.transaction_type.toUpperCase()}
                                        </span>
                                        <span className={getOrderTypeBadge(transaction.order_type)}>
                                            {transaction.order_type}
                                        </span>
                                    </div>

                                    <span className="font-medium text-gray-900 dark:text-gray-200">
                                        {transaction.symbol}
                                    </span>

                                    <div className="space-y-1">
                                        {transaction.limit_price && (
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                @ ${formatNumber(transaction.limit_price)}
                                            </div>
                                        )}
                                        <div className="text-xs text-gray-400">
                                            ID: {transaction.id}
                                        </div>
                                    </div>

                                    <div className="text-right font-medium text-gray-900 dark:text-gray-200">
                                        {formatNumber(transaction.quantity)}
                                    </div>

                                    <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(transaction.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {transactions.length === 0 && !loading && !error && (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                        No transactions found
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionHistoryModal;