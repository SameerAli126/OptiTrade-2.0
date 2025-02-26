import React from 'react';
import styled from 'styled-components';

const Card = () => {
    return (
        <StyledWrapper>
            <div className="card">
                <p className="card-title">Current Balance</p>
                <p className="balance">$12,345.67</p>
                <p className="account">
                    <svg width={20} height={20} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                        <rect width={22} height={16} x={1} y={4} rx={2} ry={2} />
                        <path d="M1 10h22" />
                    </svg>
                    Account: **** **** **** 1234
                </p>
                <div className="buttons">
                    <a href="#" className="button button-transfer">
                        <svg width={16} height={16} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                        Transfer
                    </a>
                    <a href="#" className="button button-save">
                        <svg width={16} height={16} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-7h-2c0-1-.5-1.5-1-2h0V5z" />
                            <path d="M13 5c-1 1.5-2 3-2 3" />
                            <path d="M16 5c1 1.5 2 3 2 3" />
                        </svg>
                        Save
                    </a>
                </div>
                <svg className="dollar-sign" width={40} height={40} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
    font-family: Arial, sans-serif;
    width: 310px;
    padding: 32px;
    border-radius: 24px;
    background: linear-gradient(to bottom right, #60a5fa, #a78bfa);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
    color: white;
  }

  .card::before,
  .card::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    z-index: 1;
  }

  .card::before {
    width: 160px;
    height: 160px;
    top: -80px;
    right: -80px;
  }

  .card::after {
    width: 128px;
    height: 128px;
    bottom: -64px;
    left: -64px;
  }

  .card-title {
    font-size: 1.2em;
    font-weight: bold;
  }

  .balance {
    font-size: 2em;
    font-weight: bold;
    margin: 0 0 12px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .account {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 22px;
  }

  .account svg {
    margin-right: 8px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }

  .button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition:
      transform 0.3s,
      box-shadow 0.3s;
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .button svg {
    margin-right: 8px;
  }

  .button-transfer {
    background-color: rgb(253, 253, 253);
    color: #3b82f6;
    margin-right: 16px;
    z-index: 2;
  }

  .button-save {
    background-color: #7e4ed1;
    color: white;
  }

  .dollar-sign {
    position: absolute;
    top: 24px;
    right: 24px;
    opacity: 0.5;
  }`;

export default Card;
