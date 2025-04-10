// Filepath: src/components/dashboard/new-dashboard/components/StockSearch.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStockData } from '../contexts/StockDataContext';
import styled from 'styled-components';

const StockSearch = () => {
    const navigate = useNavigate();
    const { stockData, error } = useStockData();
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const wrapperRef = useRef(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle search functionality with error checking
    useEffect(() => {
        if (error) {
            alert('Server is offline. Please try again later.');
            return;
        }

        if (searchQuery.length > 1 && stockData) {
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    }, [searchQuery, stockData, error]);

    const handleStockSelect = (stock) => {
        navigate('/dashboard/buy-sell', {
            state: { stock }
        });
        setSearchQuery('');
        setShowResults(false);
    };

    // Safe filtering with null checks
    const filteredResults = (stockData || []).filter(stock =>
        stock.symbol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    return (
        <StyledWrapper ref={wrapperRef}>
            <div className="group">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
                    <g>
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                    </g>
                </svg>
                <input
                    id="query"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    placeholder="Search stocks..."
                    className="input"
                    name="searchbar"
                    disabled={!!error}
                />

                {showResults && filteredResults.length > 0 && (
                    <div className="results-dropdown">
                        {filteredResults.map((stock) => (
                            <div
                                key={stock.symbol}
                                onClick={() => handleStockSelect(stock)}
                                className="result-item"
                            >
                                <img
                                    src={stock.logo_light}
                                    alt={stock.symbol}
                                    className="stock-logo"
                                />
                                <div className="stock-info">
                                    <div className="symbol">{stock.symbol}</div>
                                    <div className="name">{stock.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    width: 400px; /* Increased width */
    max-width: 350px;
  }
  .input {
    font-family: "Montserrat", sans-serif;
    width: 100%;
    height: 35px;
    padding-left: 2.5rem;
    box-shadow: 0 0 0 1.5px #2b2c37, 0 0 25px -17px #000;
    border: 0;
    border-radius: 12px;
    background-color: #16171d;
    outline: none;
    color: #bdbecb;
    transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: text;
    z-index: 0;
    font-size: 14px;
  }

  .input::placeholder {
    color: #bdbecb;
  }

  .input:hover {
    box-shadow: 0 0 0 2.5px #2f303d, 0px 0px 25px -15px #000;
  }

  .input:active {
    transform: scale(0.95);
  }

  .input:focus {
    box-shadow: 0 0 0 2.5px #2f303d;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    fill: #bdbecb;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    z-index: 1;
  }

  .results-dropdown {
    position: absolute;
    top: 110%;
    width: 100%;
    background: #2b2c37;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 100;
    max-height: 300px;
    overflow-y: auto;
  }

  .result-item {
    display: flex;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #3a3b47;
    }
  }

  .stock-logo {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 12px;
  }

  .stock-info {
    .symbol {
      color: #bdbecb;
      font-size: 14px;
      font-weight: 500;
    }

    .name {
      color: #7e808f;
      font-size: 12px;
      margin-top: 2px;
    }
  }
`;

export default StockSearch;