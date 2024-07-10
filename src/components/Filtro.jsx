import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { TbFilter } from "react-icons/tb";
import Switch from './Switch';
import Checkbox from './CheckBox'; // Asumiendo que tienes un componente Checkbox separado
import MultiSelect from './MultiSelect';
import { useSelector } from 'react-redux';

const Filtro = ({ incidencias, setFiltIncidencias }) => {
  const { categoriasHijo, categoriasPadre } = useSelector((state) => state.categorias);
  const [selectedCategoriasPadre, setSelectedCategoriasPadre] = useState([]);
  const [filteredCategoriasHijo, setFilteredCategoriasHijo] = useState([]);
  const [selectedCategoriasHijo, setSelectedCategoriasHijo] = useState([]);

  const handlePadreSelectionChange = (selectedItems) => {
    setSelectedCategoriasPadre(selectedItems);
  };

  const handleHijoSelectionChange = (selectedItems) => {
    setSelectedCategoriasHijo(selectedItems);
  };

  const [isCheckedBoxEstado, setIsCheckedBoxEstado] = useState({
    SinAtender: false,
    Atendidas: false,
    Rechazadas: false,
    Aceptadas: false,
  });

  const [isCheckedBoxPrioridad, setIsCheckedBoxPrioridad] = useState({
    Alta: false,
    Media: false,
    Baja: false,
  });

  const [dropdowns, setDropdowns] = useState({
    dropdown1: false,
    dropdown2: false,
    dropdown3: false,
    dropdown4: false,
    dropdown5: false
  });

  const [isSelected, setIsSelected] = useState({
    Recibido: false,
    Estado: false,
    Prioridad: false,
    Categoria: false,
    Fecha: false,
    Busqueda: false,
  });

  const toggleDropdown = id => {
    setDropdowns(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleCheckboxEChange = (key, value) => {
    setIsCheckedBoxEstado(prevState => ({
      ...prevState,
      [key]: value,
    }));
    setIsSelected(prevState => ({
      ...prevState,
      Estado: true,
    }));
  };

  const handleCheckboxPChange = (key, value) => {
    setIsCheckedBoxPrioridad(prevState => ({
      ...prevState,
      [key]: value,
    }));
    setIsSelected(prevState => ({
      ...prevState,
      Prioridad: true,
    }));
  };

  const handleSwitchChange = (section, isChecked) => {
    setIsSelected(prevState => ({
      ...prevState,
      [section]: isChecked,
    }));
  };

  const handleFilterChange = useCallback(() => {
    const filteredIncidencias = incidencias.filter(incidencia => {
      let estadoMatch = true;
      let prioridadMatch = true;
      let categoriaMatch = true;
  
      // Filtrar por estado
      if (isCheckedBoxEstado.SinAtender && incidencia.estado !== 'Pendiente') {
        estadoMatch = false;
      }
      if (isCheckedBoxEstado.Atendidas && incidencia.estado !== 'Atendida') {
        estadoMatch = false;
      }
      if (isCheckedBoxEstado.Rechazadas && incidencia.estado !== 'Rechazada') {
        estadoMatch = false;
      }
      if (isCheckedBoxEstado.Aceptadas && incidencia.estado !== 'Aceptada') {
        estadoMatch = false;
      }
  
      // Filtrar por prioridad
      if (isCheckedBoxPrioridad.Alta && incidencia.prioridad !== 'Alta') {
        prioridadMatch = false;
      }
      if (isCheckedBoxPrioridad.Media && incidencia.prioridad !== 'Media') {
        prioridadMatch = false;
      }
      if (isCheckedBoxPrioridad.Baja && incidencia.prioridad !== 'Baja') {
        prioridadMatch = false;
      }
  
      // Filtrar por categorías hijo seleccionadas
      if (selectedCategoriasHijo.length > 0 && !selectedCategoriasHijo.some(cat => cat.id === incidencia.categoriaincidencia_id)) {
        categoriaMatch = false;
      }
  
      // Devolver true si todas las condiciones coinciden
      return estadoMatch && prioridadMatch && categoriaMatch;
    });
  
    setFiltIncidencias(filteredIncidencias)
  }, [isCheckedBoxEstado, isCheckedBoxPrioridad, selectedCategoriasHijo, incidencias, setFiltIncidencias]);

  useEffect(() => {
    // Filtrar las subcategorías basadas en las categorías padre seleccionadas
    const filteredHijos = categoriasHijo.filter(hijo =>
      selectedCategoriasPadre.some(padre => padre.id === hijo.categoriapadre_id)
    );
    setFilteredCategoriasHijo(filteredHijos);
  }, [selectedCategoriasPadre, categoriasHijo]);

  useEffect(() => {
    // Realizar el filtrado de incidencias cuando cambian los filtros
    if (incidencias){
      handleFilterChange();
    }
  }, [handleFilterChange, incidencias]);

  return (
    <FiltroBox>
      <MainFiltro onClick={() => toggleDropdown('dropdown1')} isSelected={dropdowns.dropdown1}>
        Filtro
        <TbFilter />
      </MainFiltro>

      <Dropdown visible={dropdowns.dropdown1}>
        <UltimoMensaje>
          Solo mostrar mensajes recibidos?
          <Switch checked={isSelected.Recibido} onChange={(isChecked) => handleSwitchChange('Recibido', isChecked)} />
        </UltimoMensaje>

        <Button onClick={() => toggleDropdown('dropdown2')} isSelected={dropdowns.dropdown2}>Estado</Button>
        <Dropdown visible={dropdowns.dropdown2}>
          <Checkbox
            label="Sin Atender"
            checked={isCheckedBoxEstado.SinAtender}
            onChange={(checked) => handleCheckboxEChange('SinAtender', checked)}
          />
          <Checkbox
            label="Atendidas"
            checked={isCheckedBoxEstado.Atendidas}
            onChange={(checked) => handleCheckboxEChange('Atendidas', checked)}
          />
          <Checkbox
            label="Aceptadas"
            checked={isCheckedBoxEstado.Aceptadas}
            onChange={(checked) => handleCheckboxEChange('Aceptadas', checked)}
          />
          <Checkbox
            label="Rechazadas"
            checked={isCheckedBoxEstado.Rechazadas}
            onChange={(checked) => handleCheckboxEChange('Rechazadas', checked)}
          />
        </Dropdown>

        <Button onClick={() => toggleDropdown('dropdown3')} isSelected={dropdowns.dropdown3}>Prioridad</Button>
        <Dropdown visible={dropdowns.dropdown3}>
          <Checkbox
            label="Alta"
            checked={isCheckedBoxPrioridad.Alta}
            onChange={(checked) => handleCheckboxPChange('Alta', checked)}
          />
          <Checkbox
            label="Media"
            checked={isCheckedBoxPrioridad.Media}
            onChange={(checked) => handleCheckboxPChange('Media', checked)}
          />
          <Checkbox
            label="Baja"
            checked={isCheckedBoxPrioridad.Baja}
            onChange={(checked) => handleCheckboxPChange('Baja', checked)}
          />
        </Dropdown>

        <Button onClick={() => toggleDropdown('dropdown4')} isSelected={dropdowns.dropdown4}>Categorías</Button>
        <Dropdown visible={dropdowns.dropdown4}>
          <MultiSelect options={categoriasPadre} onSelectionChange={handlePadreSelectionChange} />
        </Dropdown>

        <Button onClick={() => toggleDropdown('dropdown5')} isSelected={dropdowns.dropdown5}>SubCategorías</Button>
        <Dropdown visible={dropdowns.dropdown5}>
          <MultiSelect options={filteredCategoriasHijo} onSelectionChange={handleHijoSelectionChange} />
        </Dropdown>
      </Dropdown>
    </FiltroBox>
  );
};

export default Filtro;

const FiltroBox = styled.div`
  position: absolute;
  top: -40px;
  left: -10px;
  color: #1e98d7;
  padding: 5px;
  font-family: "Bahnschrift Bold", "Bahnschrift", sans-serif;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 255, 0.39);
  border: 2px solid #1e98d7;
`;

const MainFiltro = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  cursor: pointer;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  height: 50px;
  background-color: #1e98d7;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.58);
  font-family: "Bahnschrift Bold", "Bahnschrift", sans-serif;
  cursor: pointer;

  ${props =>
    props.isSelected &&
    css`
      box-sizing: border-box;
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 255, 0.59),
        inset 0px 0px 4px 0px rgba(255, 255, 255, 0.35);
      background-color: #2886b5;
    `}

  &:hover {
    box-sizing: border-box;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 255, 0.59),
      inset 0px 0px 4px 0px rgba(255, 255, 255, 0.35);
    background-color: #2886b5;
  }
`;

const expand = keyframes`
  from {
    max-height: 0;
    max-width: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    max-width: 1000px;
    opacity: 1;
  }
`;

const Dropdown = styled.div`
  max-height: ${props => (props.visible ? '1000px' : '0')};
  max-width: ${props => (props.visible ? '1000px' : '0')};
  overflow: hidden;
  opacity: ${props => (props.visible ? '1' : '0')};
  ${props => props.visible 
    ? css`
        animation: ${expand} 0.3s ease-out;
        transition: opacity 0.3s ease-out, max-height 0.3s ease-out, max-width 0.3s ease-out;
      ` 
    : css`
        transition: none;
      `
  };
  padding-left: 3px;
  margin-top: 5px;
`;

const UltimoMensaje = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1vh;
`;
