import { useState, useEffect } from 'react';
import axios from 'axios';

const BuyButton = ({ stock, user }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [orderType, setOrderType] = useState('market');
    const [quantity, setQuantity] = useState('');
    const [limitPrice, setLimitPrice] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            // Convert numeric values to numbers
            const payload = {
                user_id: user?.id,
                symbol: stock?.symbol,
                quantity: Number(quantity),
                order_type: orderType
            };

            if (orderType === 'limit') {
                payload.limit_price = Number(limitPrice);
            }

            // Validate inputs first
            if (!payload.quantity || payload.quantity <= 0) {
                setError('Invalid quantity');
                return;
            }

            if (orderType === 'limit' && (!payload.limit_price || payload.limit_price <= 0)) {
                setError('Invalid limit price');
                return;
            }

            console.log('Sending payload:', payload);

            const response = await axios.post(
                'http://archlinux.tail9023a4.ts.net/buy-stock/',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    setShowDialog(false);
                    resetForm();
                }, 2000);
            }
        } catch (error) {
            console.error('Full error details:', error.response);
            setError(error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                'Failed to place order');
        }
    };
    const validateInputs = () => {
        const qty = Number(quantity);
        if (!quantity || qty <= 0) {
            setError('Invalid quantity');
            return false;
        }
        if (orderType === 'limit' && (!limitPrice || Number(limitPrice) <= 0)) {
            setError('Invalid limit price');
            return false;
        }
        return true;
    };

    const resetForm = () => {
        setQuantity('');
        setLimitPrice('');
        setError('');
        setSuccessMessage('');
    };

    return (
        <div>
            <button
                onClick={() => setShowDialog(true)}
                className="buy-button"
            >
                Buy
            </button>

            {showDialog && (
                <div className="dialog-backdrop">
                    <div className="dialog-content">
                        <h2>Buy {stock?.symbol}</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Order Type:</label>
                                <select
                                    value={orderType}
                                    onChange={(e) => setOrderType(e.target.value)}
                                >
                                    <option value="market">Market</option>
                                    <option value="limit">Limit</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Quantity:</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    min="1"
                                    required
                                />
                            </div>

                            {orderType === 'limit' && (
                                <div className="form-group">
                                    <label>Limit Price:</label>
                                    <input
                                        type="number"
                                        value={limitPrice}
                                        onChange={(e) => setLimitPrice(e.target.value)}
                                        step="0.01"
                                        min="0.01"
                                        required
                                    />
                                </div>
                            )}

                            {error && <div className="error">{error}</div>}
                            {successMessage && <div className="success">{successMessage}</div>}

                            <div className="dialog-actions">
                                <button
                                    type="button"
                                    onClick={() => setShowDialog(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit">
                                    Confirm Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx="true">{`
                .buy-button {
                    padding: 10px 20px;
                    background: #28a745;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                }

                .dialog-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .dialog-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    width: 400px;
                }

                .form-group {
                    margin-bottom: 1rem;
                }

                label {
                    display: block;
                    margin-bottom: 0.5rem;
                }

                select, input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }

                .error { color: red; margin: 1rem 0; }
                .success { color: green; margin: 1rem 0; }

                .dialog-actions {
                    margin-top: 1rem;
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-end;
                }
            `}</style>
        </div>
    );
};

export default BuyButton;