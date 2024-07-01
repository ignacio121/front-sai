import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #1e98d7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  ${HiddenCheckbox}:checked + & {
    background-color: #1e98d7;
  }
`;

const CheckboxLabel = styled.span`
  font-size: 16px;
  margin-right: 10px;
  user-select: none;
`;

const Checkbox = ({ label, checked, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <CheckboxWrapper>
      <CheckboxLabel>{label}</CheckboxLabel>
      <HiddenCheckbox type="checkbox" checked={checked} onChange={handleChange} />
      <StyledCheckbox>
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </StyledCheckbox>
    </CheckboxWrapper>
  );
};

export default Checkbox;
