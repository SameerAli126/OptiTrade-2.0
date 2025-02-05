import express from 'express';
import yahooFinance from 'yahoo-finance2';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Enable CORS with specific origin
app.use(cors({
    origin: 'http://localhost:5173', // Your React app's origin
    methods: ['GET'],
    allowedHeaders: ['Content-Type']
}));

// API endpoint to fetch historical data
app.get('/api/historical/:symbol', async (req, res) => {
    const { symbol } = req.params;
    console.log(`Fetching historical data for symbol: ${symbol}`); // Log the symbol being fetched
    try {
        const queryOptions = { period: '1d', interval: '1d' }; // Customize date range and interval
        const result = await yahooFinance.historical(symbol, queryOptions);

        // Format data for the frontend
        const formattedData = result.map((entry) => ({
            date: entry.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            price: entry.close, // Use closing price
        }));

        console.log(`Successfully fetched data for ${symbol}:`, formattedData); // Log successful data
        res.json(formattedData);
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error); // Log the full error
        res.status(500).json({ error: 'Failed to fetch historical data', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
