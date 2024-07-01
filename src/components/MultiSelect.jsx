import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MultiSelect = ({ options, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    const availableOptions = options.filter(option =>
      !selectedItems.some(selected => selected.id === option.id) &&
      option.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(availableOptions);
  }, [options, searchTerm, selectedItems]);


  const handleItemClick = (item) => {
    if (selectedItems.length < 3 && !selectedItems.some(selected => selected.id === item.id)) {
      const newSelectedItems = [...selectedItems, item];
      setSelectedItems(newSelectedItems);
      onSelectionChange(newSelectedItems); // Notify parent component
      setSearchTerm(''); // Clear the search term
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    const updatedItems = selectedItems.filter(item => item !== itemToRemove);
    setSelectedItems(updatedItems);
    onSelectionChange(updatedItems); // Notify parent component
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <MultiSelectContainer>
      <SelectedItems>
        {selectedItems.map(item => (
          <SelectedItem key={item.id} onClick={() => handleRemoveItem(item)}>
            {item.nombre} &times;
          </SelectedItem>
        ))}
      </SelectedItems>
      <InputContainer>
        <SearchInput
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
          {filteredOptions.length === 0 && <NoOptions>No hay opciones disponibles</NoOptions>}
          {filteredOptions.length > 0 && (
            <Options>
              {filteredOptions.map(option => (
                <Option key={option.id} onClick={() => handleItemClick(option)}>
                  {option.nombre}
                </Option>
              ))}
            </Options>
          )}
      </InputContainer>
    </MultiSelectContainer>
  );
};

export default MultiSelect;

const MultiSelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectedItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 4px;
`;

const SelectedItem = styled.span`
  background-color: #007bff;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  position: relative;
  width: 90%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


const Options = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Option = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const NoOptions = styled.div`
  padding: 8px;
  color: #999;
`;
