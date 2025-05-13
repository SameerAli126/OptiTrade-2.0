import { useState } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Alert,
    Typography,
    Divider
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import { useStateContext } from '../contexts/ContextProvider';

const SellButton = ({ stock, user }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [orderType, setOrderType] = useState('market');
    const [quantity, setQuantity] = useState('');
    const [limitPrice, setLimitPrice] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { balanceDetails, refreshCashBalance } = useStateContext();
    const currentCashBalance = balanceDetails?.cash_balance ?? 0;
    const currentPrice = stock?.close || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!validateInputs()) return;

        try {
            const payload = {
                user_id: user?.id,
                symbol: stock?.symbol,
                quantity: Number(quantity),
                order_type: orderType
            };

            if (orderType === 'limit') {
                payload.limit_price = Number(limitPrice);
            }

            // Validation logic
            if (!payload.quantity || payload.quantity <= 0) {
                setError('Invalid quantity');
                return;
            }

            if (orderType === 'limit' && (!payload.limit_price || payload.limit_price <= 0)) {
                setError('Invalid limit price');
                return;
            }

            const response = await axios.post(
                'https://archlinux.tail9023a4.ts.net/portfolio/sell',
                payload,
                { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            if (response.status === 200) {
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    setShowDialog(false);
                    resetForm();
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.error || 'Failed to place order');
        }
    };

    const resetForm = () => {
        setQuantity('');
        setLimitPrice('');
        setError('');
        setSuccessMessage('');
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

    return (
        <div>
            <Button
                variant="contained"
                color="error"
                onClick={() => setShowDialog(true)}
                sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: 'none',
                    '&:hover': { boxShadow: 'none' }
                }}
            >
                Sell {stock?.symbol}
            </Button>

            <Dialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        p: 2
                    }
                }}
            >
                <DialogTitle variant="h6" sx={{ pb: 1 }}>
                    Sell {stock?.symbol}
                    <Typography variant="body2" color="text.secondary">
                        {stock?.name}
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                            <InputLabel>Order Type</InputLabel>
                            <Select
                                value={orderType}
                                label="Order Type"
                                onChange={(e) => setOrderType(e.target.value)}
                                variant="outlined"
                                size="small"
                            >
                                <MenuItem value="market">Market Order</MenuItem>
                                <MenuItem value="limit">Limit Order</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Quantity"
                            variant="outlined"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            inputProps={{ min: 1 }}
                            size="small"
                            sx={{ mb: 2 }}
                        />

                        {orderType === 'limit' && (
                            <TextField
                                fullWidth
                                label="Limit Price"
                                variant="outlined"
                                type="number"
                                value={limitPrice}
                                onChange={(e) => setLimitPrice(e.target.value)}
                                inputProps={{ step: "0.01", min: "0.01" }}
                                size="small"
                                sx={{ mb: 2 }}
                            />
                        )}

                        {error && (
                            <Alert severity="error" icon={<Error />} sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {successMessage && (
                            <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 2 }}>
                                {successMessage}
                            </Alert>
                        )}

                        <Divider sx={{ my: 2 }} />

                        <div className="calculation-section">
                            {orderType === 'market' && (
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Current Price: ${currentPrice.toFixed(2)}
                                </Typography>
                            )}
                            {orderType === 'limit' && limitPrice && (
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Limit Price: ${Number(limitPrice).toFixed(2)}
                                </Typography>
                            )}

                            {quantity > 0 && (
                                <>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        Total Proceeds: ${(
                                        quantity *
                                        (orderType === 'market' ? currentPrice : limitPrice || currentPrice)
                                    ).toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 2 }}>
                                        New Balance: ${(
                                        currentCashBalance +
                                        quantity *
                                        (orderType === 'market' ? currentPrice : limitPrice || currentPrice)
                                    ).toFixed(2)}
                                    </Typography>
                                </>
                            )}
                        </div>

                        <Divider sx={{ my: 2 }} />

                        <DialogActions sx={{ px: 0 }}>
                            <Button
                                onClick={() => setShowDialog(false)}
                                color="inherit"
                                sx={{ borderRadius: 2 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="error"
                                sx={{ borderRadius: 2 }}
                            >
                                Confirm Order
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SellButton;