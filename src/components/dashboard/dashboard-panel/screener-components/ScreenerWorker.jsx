// Filepath: E:\WEB JS\fyp\opti-trade\src\components\dashboard\dashboard-panel\screener-components\ScreenerWorker.jsx

import React, { useState, useEffect } from 'react';
import data from '../../../../../data/csvjson.json'; // Adjust the path as necessary
import { Search, Menu, TrendingUp, TrendingDown } from 'lucide-react';
import StockScreener from "../../../Screener/StockScreener.jsx";

const ScreenerWorker = () => {
  return (<StockScreener />)

};

export default ScreenerWorker;
