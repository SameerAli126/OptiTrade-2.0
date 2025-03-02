// Filepath: C:\Users\SAM\Downloads\Dashboard\opti-trade-pct\src\components\dashboard\new-dashboard\components\TransactionHistoryModal.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Button.jsx';

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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
            <div className="bg-white dark:bg-[#42464D] rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <h3 className="text-xl font-semibold mb-4 dark:text-gray-200">
                    Transaction History
                </h3>

                {loading ? (
                    <div className="text-center py-4">Loading transactions...</div>
                ) : error ? (
                    <div className="text-red-500 p-4">{error}</div>
                ) : (
                    <div className="flex-1 overflow-y-auto pr-2">
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="p-4 border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className={`font-medium ${
                                            transaction.transaction_type === 'buy'
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                        }`}>
                                            {transaction.symbol} - {transaction.transaction_type.toUpperCase()}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(transaction.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">Quantity: {transaction.quantity}</p>
                                        {transaction.order_type === 'limit' && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                @ ${transaction.limit_price}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-4 flex justify-end">
                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Close"
                        borderRadius="8px"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default TransactionHistoryModal;