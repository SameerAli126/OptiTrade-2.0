import React from 'react';
import styled from 'styled-components';

const FlipCard = ({ position }) => {
    return (
        <StyledFlipCard style={{
            left: position.x,
            top: position.y,
            transform: 'translateY(-50%)' // Center vertically relative to symbol
        }}>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <p>hello</p>
                    </div>
                    <div className="flip-card-back">
                        <p>hello</p>
                    </div>
                </div>
            </div>
        </StyledFlipCard>
    );
};

const StyledFlipCard = styled.div`
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  width: 190px;
  height: 254px;

  /* Keep original flip card styles from your code */
  .flip-card {
    background-color: transparent;
    width: 100%;
    height: 100%;
    perspective: 1000px;
    font-family: sans-serif;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front, .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid coral;
    border-radius: 1rem;
  }

  .flip-card-front {
    background: linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%,
       rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%);
    color: coral;
  }

  .flip-card-back {
    background: linear-gradient(120deg, rgb(255, 174, 145) 30%, coral 88%,
       bisque 40%, rgb(255, 185, 160) 78%);
    color: white;
    transform: rotateY(180deg);
  }

  p {
    font-size: 1.4em;
    font-weight: 900;
    margin: 0;
  }
`;

export default FlipCard;