import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoaderComponent = () => {
  return <Loader></Loader>;
};

export default LoaderComponent;

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgb(255, 255, 255, 0.16);
  border-bottom-color: #1e98d7;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;