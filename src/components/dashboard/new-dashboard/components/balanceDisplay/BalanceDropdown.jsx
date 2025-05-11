// src/components/dashboard/new-dashboard/components/BalanceDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { formatNumber } from '../../utils/formatNumber';
import { FiChevronDown } from 'react-icons/fi';

const BalanceDropdown = ({ cashBalance, portfolioValue, netWorth, currentColor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <StyledWrapper ref={wrapperRef} color={currentColor || '#03C9D7'}>
            <div className="main-label" onClick={toggleDropdown}> {/* Changed label to div for simpler click handling */}
                <span className="balance-default">
                  Balance: ${formatNumber(cashBalance)}
                </span>
                <div className={`arrow-icon-container ${isOpen ? 'open' : ''}`}>
                    <FiChevronDown />
                </div>
            </div>

            {/* Dropdown Menu Section - visibility and animation controlled by 'open' class via React state */}
            <section className={`menu-container-section ${isOpen ? 'open' : ''}`}>
                <div className="menu-item">
                    Portfolio: ${formatNumber(portfolioValue)}
                </div>
                <div className="menu-item">
                    Net Worth: ${formatNumber(netWorth)}
                </div>
            </section>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  position: relative; 
  display: inline-block;

  .main-label { /* Keeping the class name for style consistency, even if it's a div now */
    font-weight: 600;
    color: white;
    background-color: ${props => props.color};
    padding: 0px 12px; 
    border-radius: 1.2rem; 
    display: flex;
    align-items: center;
    height: 2.5rem; 
    min-width: 10rem; 
    cursor: pointer;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    user-select: none; 
  }

  .balance-default {
    margin-right: 8px;
    white-space: nowrap;
  }

  /* Arrow Icon Styling */
  .arrow-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px; 
    height: 20px; 
    transition: transform 0.3s ease-in-out;
    font-size: 1.2em; 
  }

  .arrow-icon-container.open { 
    transform: rotate(180deg);
  }
  
  /* Dropdown Menu Container Styling - now driven by .open class from React state */
  .menu-container-section {
    background-color: white;
    color: #333; 
    border-radius: 10px;
    position: absolute;
    width: calc(100% + 30px); 
    left: 50%; 
    transform: translateX(-50%); 
    top: calc(100% + 8px); 
    z-index: 1000; 
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    
    /* Initial state: hidden */
    opacity: 0;
    transform: translateX(-50%) translateY(-10px) scaleY(0.95); /* Combined transform for centering and animation */
    transform-origin: top center;
    transition: opacity 0.25s ease-out, transform 0.25s ease-out;
    pointer-events: none; /* Initially not interactive */
    visibility: hidden; /* Start fully hidden */
  }

  /* Styles when the dropdown is open (via .open class) */
  .menu-container-section.open {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scaleY(1);
    pointer-events: auto;
    visibility: visible; /* Make visible */
  }

  .menu-item {
    padding: 12px 18px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
  }

  .menu-item:last-child {
    border-bottom: none;
  }
`;

export default BalanceDropdown;