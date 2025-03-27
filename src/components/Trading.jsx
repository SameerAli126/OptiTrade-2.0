import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
const Trading = () => {

    const token = localStorage.getItem("token");

    // If token exists, redirect to Dashboard, else redirect to login page
    return token ? <Navigate to="/dashboard/home" /> : <Navigate to="/login" />;

    // const [stocks, setStocks] = useState([
    //     { symbol: "AAPL", price: 150 },
    //     { symbol: "GOOGL", price: 2800 },
    //     { symbol: "AMZN", price: 3400 },
    // ]);
    // const [portfolio, setPortfolio] = useState([]);
    // const [selectedStock, setSelectedStock] = useState("");
    // const [quantity, setQuantity] = useState(0);
    // const [tradeType, setTradeType] = useState("buy");
    // const [userId] = useState(1); // Assuming user is logged in and has id 1
    //
    // useEffect(() => {
    //     fetchPortfolio();
    // }, []);
    //
    // const fetchPortfolio = async () => {
    //     const response = await fetch(`http://localhost:3000/portfolio/${userId}`);
    //     const data = await response.json();
    //     setPortfolio(data);
    // };
    //
    // const handleTrade = async (e) => {
    //     e.preventDefault();
    //     const stock = stocks.find((s) => s.symbol === selectedStock);
    //
    //     if (!stock) {
    //         alert("Invalid stock selected");
    //         return;
    //     }
    //
    //     const response = await fetch("http://localhost:3000/trade", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             user_id: userId,
    //             stock_symbol: selectedStock,
    //             quantity: parseInt(quantity),
    //             trade_type: tradeType,
    //             price: stock.price,
    //         }),
    //     });
    //
    //     const data = await response.json();
    //     if (response.ok) {
    //         alert("Trade successful!");
    //         fetchPortfolio(); // Refresh portfolio
    //     } else {
    //         alert("Trade failed: " + data.message);
    //     }
    // };
    //
    // return (
    //     <div className="trading-container px-4 md:px-8">
    //         <h2 className="text-2xl md:text-3xl">Trading</h2>
    //
    //         <form onSubmit={handleTrade} className="trade-form flex flex-col gap-4">
    //             <label>Stock</label>
    //             <select value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
    //                 <option value="">Select a stock</option>
    //                 {stocks.map((stock) => (
    //                     <option key={stock.symbol} value={stock.symbol}>
    //                         {stock.symbol} - ${stock.price}
    //                     </option>
    //                 ))}
    //             </select>
    //
    //             <label>Quantity</label>
    //             <input
    //                 type="number"
    //                 value={quantity}
    //                 onChange={(e) => setQuantity(e.target.value)}
    //                 required
    //             />
    //
    //             <label>Trade Type</label>
    //             <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
    //                 <option value="buy">Buy</option>
    //                 <option value="sell">Sell</option>
    //             </select>
    //
    //             <button type="submit">Submit Trade</button>
    //         </form>
    //
    //         <h2 className="text-2xl md:text-3xl mt-8">Portfolio</h2>
    //         {portfolio.length > 0 ? (
    //             <ul>
    //                 {portfolio.map((item) => (
    //                     <li key={item.stock_symbol}>
    //                         {item.stock_symbol}: {item.quantity} shares
    //                     </li>
    //                 ))}
    //             </ul>
    //         ) : (
    //             <p>No stocks in portfolio</p>
    //         )}
    //     </div>
    //);
};

export default Trading;
