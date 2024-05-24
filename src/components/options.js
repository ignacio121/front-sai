import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser , faPencil, faDisplay, faHouse} from '@fortawesome/free-solid-svg-icons';
import { MdNote, MdHelp, MdEdit, MdTask } from 'react-icons/md';

import ProgressBar from "./barProgress";

const Options = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
  
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
  
    const handleTabClick = tab => {
      setActiveTab(tab);
    };
    const ModalContent = styled.div`
  padding: 20px;
`;
const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

    const TabContent = styled.div`
      display: ${props => (props.active ? 'block' : 'none')};
    `;


    const handleButtonClick = (action) => {
      console.log(`Realizando acción: ${action}`);
    };

  return (
    <div>
      <Menu>
        <Incidencia color="#0063B3">
          <ButtonWrapper onClick={openModal}>
            <MdNote size={26} color="white" />
            <Text>Ingresar incidencia</Text>
          </ButtonWrapper>
        </Incidencia>

        <Incidencia color="#0072C2" onClick={() => handleButtonClick("preguntas_frecuentes")}>
          <MdHelp size={26} color="white" />
          <Text>Preguntas frecuentes</Text>
        </Incidencia>

        <Incidencia color="#008ACB" onClick={() => handleButtonClick("foro_estudiantil")}>
          <MdEdit size={26} color="white" />
          <Text>Foro estudiantil</Text>
        </Incidencia>

        <Incidencia color="#00A1E4" onClick={() => handleButtonClick("estado_incidencias")}>
          <MdTask size={26} color="white" />
          <Text>Estado Incidencias</Text>
        </Incidencia>
      </Menu>
      
      <Modal show={showModal} onClose={closeModal} title="Ingresar incidencia">
      <ProgressBar step={activeTab} />
        <div className='barraModal'>
          {/* <button onClick={() => handleTabClick(1)}>Paso 1 Categoría</button>
          <button onClick={() => handleTabClick(2)}>Paso 2</button>
          <button onClick={() => handleTabClick(3)}>Paso 3</button> */}
        </div>
        <TabContent active={activeTab === 1}>
          <ModalContent>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='tarjetas' style={{ marginLeft: '90px',marginTop:'10px',marginBottom:'0%'  }}>
                  <div icon={faDisplay} size="2x" style={{ marginTop: '10px' }} ></div>
                  <h1>Plataforma</h1>
                  <p>Problemas con Plataformas como LMS, portal del estudiante, etc </p>
                </div>
              <div className={`tarjetas ${selected ? 'seleccionada' : ''}`} onClick={handleClick}>
                <FontAwesomeIcon icon={faUser} size="2x" style={{ marginTop: '10px', color: selected ? 'white' : 'rgb(0, 85, 169)' }} />
                <h1 style={{ color: selected ? 'white' : 'rgb(0, 85, 169)' }}>Personal</h1>
                <p style={{ color: selected ? 'white' : 'rgb(0, 85, 169)' }}>Problemas Personales o situaciones familiares</p>
              </div>

                <div className='tarjetas'>
                  <FontAwesomeIcon icon={faBook} size="2x" style={{ marginTop: '10px' }} />
                  <h1>Ramos</h1>
                  <p>Asistencia para tomar, cambiar o botar ramos </p>
                </div>
                <div className='tarjetas'>
                  <FontAwesomeIcon icon={faPencil} size="2x" style={{ marginTop: '10px' }} />
                  <h1>Tramites</h1>
                  <p>Tramites con jefe de carrera o asistencia </p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='tarjetas'style={{ marginRight: '90px',marginTop:'10px', marginBottom:'0%' }}>
                  <FontAwesomeIcon icon={faHouse} size="2x" style={{ marginTop: '10px' }} />
                  <h1>Plataforma</h1>
                  <p>Problemas con personal, infraestructural de la universidad </p>
                </div>
              </div>
              </div>

          </ModalContent>
        </TabContent>
        <TabContent active={activeTab === 2}>
          <ModalContent>
            <div className='paso2'>
              <h2>¿Quién cree que puede resolver de mejor manera tu problemática?</h2>
           
            <div className='paso2_contenedor'>
              <p>Jefe de carrera</p>

            </div>
            <div className='paso2_contenedor'>
              <p>Asistente de jefe de carreras</p>

            </div>
            </div>
          </ModalContent>
        </TabContent>
        <TabContent active={activeTab === 3}>
          <ModalContent>
            <h2>Paso 3 - Contenido</h2>
            <p>Contenido del paso 2...</p>
          </ModalContent>
        </TabContent>
        <Button onClick={closeModal}>Cerrar</Button>
      </Modal>
    </div>
  );
};

export default Options;

const Menu = styled.div`
 margin-top:3%;
 margin-left:30%;
 width:100%;
`;

const Incidencia = styled.div`
  display: flex;
  width:95%;
  align-items: center;
  color: white;
  padding: 10px;
  cursor: pointer; 
  background-color: ${(props) => props.color}; 
`;

const Text = styled.p`
  margin-left: 20px;
`;

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: white;
  width: 100%;
  height: 100%;
`;

const Modal = ({ children, show, onClose, title }) => {
  return (
    <>
      {show && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <h3>{title}</h3>
              <BotonCerrar onClick={onClose}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="times"
                  className="svg-inline--fa fa-times fa-w-11"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 352 512"
                >
                  <path
                    fill="currentColor"
                    d="M50.844 125.844c-9.373-9.373-24.569-9.373-33.941 0s-9.373 24.569 0 33.941l246.06 246.06-246.06 246.06c-9.373 9.373-9.373 24.569 0 33.941s24.569 9.373 33.941 0l246.06-246.06 246.06 246.06c9.373 9.373 24.569 9.373 33.941 0s9.373-24.569 0-33.941l-246.06-246.06 246.06-246.06c9.373-9.373 9.373-24.569 0-33.941s-24.569-9.373-33.941 0l-246.06 246.06-246.06-246.06c-9.373-9.372-24.569-9.372-33.941 0z"
                  ></path>
                </svg>
              </BotonCerrar>
            </EncabezadoModal>
            <ContenidoModal>{children}</ContenidoModal>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.468);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const ContenedorModal = styled.div`
  width: 90%;
  margin-top:3%;
  margin-bottom:3%;
  height:90%;
  max-width: 700px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(141, 121, 121, 0.24) 0px 3px 8px;
  padding: 20px;
  z-index: 4;
`;

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  height:40px;
  margin-top:10px;
  
  padding-bottom: 20px;
  background-color:rgb(0, 85, 169);
  h3 {
    font-weight: 500;
    font-size: 30px;
    margin-left:30%;
    margin-top:6%;
    font-weight: bold; 
    color:white;
  }
`;

const BotonCerrar = styled.button`
  position: absolute;
  top: 35px;
  right: 60px;
  color:white;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  
  font-weight: bold; 

  &:hover {
    color: black;
    font-size:small;
    font-weight: bold; 
  }

  svg {
    width: 100%;
    height: 100%;
    stroke-width: 2;
  }
`;

const ContenidoModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

