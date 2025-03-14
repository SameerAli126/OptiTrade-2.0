import { useState, useEffect } from 'react';
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
    CircularProgress,
    Typography,
    Divider
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
//commit
const BuyButton = ({ stock, user }) => {
    // ... existing state declarations remain the same ...

    const handleSubmit = async (e) => {
        // ... existing submit logic remains unchanged ...
    };

    // ... existing helper methods remain the same ...

    return (
        <div>
            <Button
                variant="contained"
                color="success"
                onClick={() => setShowDialog(true)}
                sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: 'none',
                    '&:hover': { boxShadow: 'none' }
                }}
            >
                Buy {stock?.symbol}
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
                    Buy {stock?.symbol}
                    <Typography variant="body2" color="text.secondary">
                        {stock?.name}
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
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
                                color="success"
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

export default BuyButton;