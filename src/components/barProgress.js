import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ step }) => {
  return (
    <ProgressContainer>
      <Step active={step >= 1}>1</Step>
      <StepSeparator active={step > 1} />
      <Step active={step >= 2}>2</Step>
      <StepSeparator active={step > 2} />
      <Step active={step >= 3}>3</Step>
    </ProgressContainer>
  );
};

export default ProgressBar;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const Step = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => (props.active ? '#0063B3' : '#ccc')};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const StepSeparator = styled.div`
  width: 50px;
  height: 5px;
  background-color: ${props => (props.active ? '#0063B3' : '#ccc')};
`;
