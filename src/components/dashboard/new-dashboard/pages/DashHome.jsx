// DashHome.jsx
import React from 'react'; // Removed useState, useEffect if data is static/passed down
import { useStateContext } from '../contexts/ContextProvider';
import DashHeader from '../components/DashHeader';

// --- Import your new custom components ---
import NasdaqSnapshotCard from '../components/DashHome/NasdaqSnapshotCard';
import AISpotlightStockCard from '../components/DashHome/AiSpotlightStockCard.jsx';
// import MyWatchlistMoverCard from '../components/DashHome/MyWatchlistMoverCard'; // Create this if needed
import MyPortfolioQuickSummaryCard from '../components/DashHome/MyPortfolioQuickSummaryCard';
// import AIOpportunitiesRadarCard from '../components/DashHome/AIOpportunitiesRadarCard'; // Create this
// import AIRelevantNewsSection from '../components/DashHome/AIRelevantNewsSection'; // Create this
// import AITradingAcademySnippet from '../components/DashHome/AITradingAcademySnippet'; // Create this

// --- Dummy Data (In a real app, this would come from API calls, state, or props) ---
const dummyNasdaqData = {
    indexName: "NASDAQ Composite",
    currentLevel: "16,020.75",
    changeAbsolute: "+150.30",
    changePercentage: "+0.95%",
    aiSentiment: "Bullish",
    chartData: [ /* ... */ ]
};
const dummyAiStock1 = { symbol: "TSLA", name: "Tesla, Inc.", currentPrice: "175.20", priceChangePercent: "+1.5%", aiSignal: "Strong Buy", aiRationale: "Breakout above key resistance.", logoUrl: "https://logo.clearbit.com/tesla.com" };
const dummyAiStock2 = { symbol: "NVDA", name: "NVIDIA Corp.", currentPrice: "905.50", priceChangePercent: "+2.1%", aiSignal: "Bullish Momentum", aiRationale: "Positive earnings outlook.", logoUrl: "https://logo.clearbit.com/nvidia.com" };
// const dummyWatchlistMover = { symbol: "AAPL", name: "Apple Inc.", currentPrice: "183.50", priceChangePercent: "+2.8%", todaysHigh: "184.00", logoUrl: "https://logo.clearbit.com/apple.com" };
const dummyPortfolioSummary = {
    totalValue: "5,498.28",
    todaysPnL_absolute: "+75.50",
    todaysPnL_percent: "+1.38%",
    overallReturn_absolute: "+498.28",
    overallReturn_percent: "+10.0%",
    aiPortfolioTip: "AI suggests your portfolio is tech-heavy. Consider diversifying into other sectors for better risk management." +
        " You can also consider adding more stocks to your portfolio to increase diversification." +
        " So far, your portfolio has a 100% return on investment (ROI) and is in the green." +
        " You can also see your portfolio's performance in the AI Portfolio Overview card." +
        " If you want to see more details, click the AI Portfolio Overview card."
};
// ... Add more dummy data for other cards as you build them


const DashHome = () => {
    const { currentColor, currentMode, user } = useStateContext();

    // For demonstration, assume user has a portfolio. In a real app, check this properly.
    const userHasPortfolio = user && true; // Replace 'true' with actual logic e.g. user.portfolio?.holdings?.length > 0

    return (
        <div className="rounded-3xl p-4 md:p-6 dark:bg-secondary-dark-bg dark:text-gray-200">
            <DashHeader category="Overview" title="Dashboard Home" />

            {/* --- TOP SECTION: MARKET & AI SNAPSHOT --- */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Row 1 */}
                <NasdaqSnapshotCard currentColor={currentColor} />

                {/* Conditionally render Portfolio Summary if user has a portfolio,
                    otherwise, you might want a placeholder or another card */}
                {userHasPortfolio ? (
                    <MyPortfolioQuickSummaryCard summary={dummyPortfolioSummary} currentColor={currentColor} />
                ) : (
                    // Optional: Placeholder if no portfolio
                    <div className="bg-white dark:bg-secondary-dark-bg p-6 rounded-2xl shadow-md flex items-center justify-center min-h-[200px]"> {/* Adjust min-height as needed */}
                        <p className="text-gray-500 dark:text-gray-400">Connect your portfolio to see summary here.</p>
                    </div>
                )}

                {/* Row 2 (these will wrap to the next line in a 2-column grid) */}
                <AISpotlightStockCard stock={dummyAiStock1} currentColor={currentColor} />
                <AISpotlightStockCard stock={dummyAiStock2} currentColor={currentColor} />

                {/* If you have more cards like AIOpportunitiesRadarCard or AIRelevantNewsCard,
                    they would continue to fill this 2-column grid, wrapping as needed.
                    For example:
                */}
                {/* <AIOpportunitiesRadarCard opportunities={dummyOpportunities} currentColor={currentColor} /> */}
                {/* <AIRelevantNewsCard newsItems={dummyNewsItems} currentColor={currentColor} currentMode={currentMode} /> */}

            </div>

            {/* You can add other sections below this main card grid if needed */}


            {/* --- BOTTOM SECTION: NEWS & LEARNING --- */}
            {/* <div className="mt-10 flex flex-wrap gap-6 justify-center"> */}
            {/* Add AIRelevantNewsSection here when built */}
            {/* Add AITradingAcademySnippet here when built */}
            {/* </div> */}
        </div>
    );
};

export default DashHome;