import React from 'react';
import styled from 'styled-components';
import logoBarra from '../images/logo_ucm_white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/actions/authActions';

const Barra = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Barra1>
        <ImageTextContainer>
          <Escudo src={logoBarra} alt="logo" />
          <Titulo>SISTEMA DE ADMINISTRACIÓN DE INCIDENCIAS UCM</Titulo>
          <LogoutButton onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
            <ButtonText>Cerrar sesión</ButtonText>
          </LogoutButton>
        </ImageTextContainer>
      </Barra1>
    </>
  );
};

export default Barra;

const Barra1 = styled.div`
  background-color: rgb(0, 85, 169);
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 1000;
  top: 0;
`;

const ImageTextContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
`;

export const Escudo = styled.img`
  width: 150px;
  margin-right: 20px;
`;

const Titulo = styled.h1`
  color: white;
  font-size: 1.5rem;
  flex-grow: 1;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center; 
  color: white;
  background-color: rgb(0, 85, 169);
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0077ff;
  }
`;

const ButtonText = styled.p`
  margin-left: 8px; 
`;
