import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNavData } from '../Redux/actions/navActions.js';
import { Button, Content, Dropdown, SideNavBar, TopNavBar, MainContainer, ContentWrapper } from '../style/navbar.style.js';
import { logout } from '../Redux/actions/authActions.js';
import { useNavigate } from 'react-router-dom';

function NavBar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdowns, setDropdowns] = useState({
    dropdown1: false,
    dropdown2: false,
    dropdown3: false,
  });

  const toggleDropdown = id => {
    setIsSelected({
      incidencias: false,
      preguntasFrecuentes: false,
      GraficasMetricas: false,
      personal: false,
    });

    setDropdowns(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const [isSelected, setIsSelected] = useState({
    incidencias: false,
    preguntasFrecuentes: false,
    GraficasMetricas: false,
    personal: false,
  });

  const handleButtonClick = (path, buttonName) => {
    setIsSelected({
      incidencias: false,
      preguntasFrecuentes: false,
      GraficasMetricas: false,
      personal: false,
    });

    setIsSelected(prevState => ({
      ...prevState,
      [buttonName]: true,
    }));
  
    setDropdowns({
      dropdown1: false
    });
  
    if (buttonName === 'incidencias') {
      setDropdowns(prevState => ({
        ...prevState,
        dropdown1: true,
      }));
    }
  
    dispatch(setNavData(path));
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <MainContainer>
      <TopNavBar>
        <div>Universidad Catolica del Maule - SAI</div>
      </TopNavBar>
      <ContentWrapper>
        <SideNavBar>
          <Button onClick={() => toggleDropdown('dropdown1')} isSelected={dropdowns.dropdown1}>Incidencias</Button>
          <Dropdown visible={dropdowns.dropdown1}>
            <Button onClick={() => handleButtonClick('incidencias', 'incidencias')}>Todas las incidencias</Button>
            <Button onClick={() => handleButtonClick('agenda', 'incidencias')}>Agenda</Button>
            <Button onClick={() => handleButtonClick('agregarIncidencia', 'incidencias')}>Agregar incidencia</Button>
          </Dropdown>
          <Button onClick={() => handleButtonClick('preguntasFrecuentes', 'preguntasFrecuentes')} isSelected={isSelected.preguntasFrecuentes}>Preguntas frecuentes</Button>
          <Button onClick={() => handleButtonClick('GraficasMetricas', 'GraficasMetricas')} isSelected={isSelected.GraficasMetricas}>Gráficas y métricas</Button>
          <Button onClick={() => handleButtonClick('personal', 'personal')} isSelected={isSelected.personal}>Personal</Button>
          <Button onClick={handleLogout}>Cerrar sesión</Button>
        </SideNavBar>
        <Content>
          {children}
        </Content>
      </ContentWrapper>
    </MainContainer>
  );
}

export default NavBar;