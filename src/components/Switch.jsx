// Switch.js
import React from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 50px;
  height: 22px;
  border-radius: 16px;
  background-color: #0008ff33;
  cursor: pointer;
  margin-left: 2vw;
`;

const Ball = styled.div`
  position: absolute;
  top: 2px;
  left: ${props => (props.checked ? 'calc(100% - 20px)' : '2px')};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color:${props => (props.checked ? '#1e98d7' : '#fff')};
  transition: left 0.3s ease;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Switch = ({ checked, onChange }) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <SwitchContainer onClick={handleChange}>
      <Checkbox type="checkbox" checked={checked} readOnly />
      <Ball checked={checked} />
    </SwitchContainer>
  );
};

export default Switch;
