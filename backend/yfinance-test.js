import yahooFinance from 'yahoo-finance2';

async function testYahooFinance() {
    const symbol = 'AAL'; // Test with American Airlines stock
    const queryOptions = {
        period1: '2023-01-01', // Start date
        period2: '2023-10-01', // End date
        interval: '1d', // Daily data
    };

    try {
        const result = await yahooFinance.historical(symbol, queryOptions);
        console.log('Historical Data:', result);
    } catch (error) {
        console.error('Error fetching historical data:', error);
    }
}

testYahooFinance();