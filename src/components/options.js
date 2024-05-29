import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MdNote,
  MdHelp,
  MdEdit,
  MdTask,
  MdComputer,
  MdSchool,
  MdAssignment,
  MdDomain,
  MdDescription,
  MdPerson,
} from 'react-icons/md';
import ProgressBar from "./barProgress";

const iconsCategorias = {
  1: MdComputer,
  2: MdPerson,
  3: MdPerson,
  4: MdSchool,
  5: MdAssignment,
  6: MdDomain,
  7: MdDescription
};

const Options = ({ categorias }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false); // Estado para mostrar el botón de Siguiente

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleButtonClick = (action) => console.log(`Realizando acción: ${action}`);

  const handleCategoryClick = (id) => {
    if (selected !== id) {
      setSelected(id);
      setShowNextButton(true); // Mostrar el botón de Siguiente al seleccionar una categoría
    }
  };

  const handleNextButtonClick = () => {
    setActiveTab(activeTab + 1); // Avanzar de pestaña al hacer clic en Siguiente
    setShowNextButton(false); // Ocultar el botón de Siguiente después de avanzar
  };

  const ModalContent = styled.div`
    padding: 20px;
  `;

  const TabContent = styled.div`
    display: ${props => (props.active ? 'block' : 'none')};
  `;

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
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {categorias.map((categoria) => {
                const Icon = iconsCategorias[categoria.id];
                return (
                  <Tarjeta
                    key={categoria.id}
                    selected={selected === categoria.id}
                    onClick={() => handleCategoryClick(categoria.id)}
                  >
                    {typeof Icon === 'function' ? (
                      <Icon size={40} style={{ marginTop: '10px', marginLeft: '35%', color: selected === categoria.id ? 'white' : 'rgb(0, 85, 169)' }} />
                    ) : (
                      <FontAwesomeIcon
                        icon={Icon}
                        size="2x"
                        style={{ marginTop: '10px', color: selected === categoria.id ? 'white' : 'rgb(0, 85, 169)' }}
                      />
                    )}
                    <h1>{categoria.nombre}</h1>
                    <p>{categoria.descripcion}</p>
                  </Tarjeta>
                );
              })}
            </div>
          </ModalContent>
          {showNextButton && <Button onClick={handleNextButtonClick}>Siguiente</Button>}
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
            <p>Contenido del paso 3...</p>
          </ModalContent>
        </TabContent>
        <Button onClick={closeModal}>Cerrar</Button>
      </Modal>
    </div>
  );
};

export default Options;

const Menu = styled.div`
  margin-top: 3%;
  margin-left: 30%;
  width: 100%;
`;

const Tarjeta = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 6px;
  flex: 1 1 30%;
  box-sizing: border-box;
  width: 100px;
  height: 170px;
  margin-left: 6px;
  background-color: ${(props) => (props.selected ? '#0072C2' : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'rgb(0, 85, 169)')};
  cursor: pointer;

  &:hover {
    background-color: #0072c2;
    color: white;
  }

  h1 {
    color: ${(props) => (props.selected ? 'white' : 'rgb(0, 85, 169)')};
  }

  p {
    color: ${(props) => (props.selected ? 'white' : 'rgb(0, 85, 169)')};
  }
`;

const Incidencia = styled.div`
  display: flex;
  width: 95%;
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
                    d="M50.844 125.844c-9.373-9.373-24.569-9.373-33.941 0s-9.373 24.569 0 33.941l246.06 246.06-246.06 246.06c-9.373 9.373-9.373 24.569 0 33.941s24.569 9.373 33.941 0l246.06-246.06 246.06 246.06c9.373 9.373373 24.569 9.373 33.941 0l-246.06-246.06 246.06-246.06c9.373-9.373 9.373-24.569 0-33.941s-24.569-9.373-33.941 0l-246.06 246.06-246.06-246.06c-9.373-9.372-24.569-9.372-33.941 0z"
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
    margin-top: 3%;
    margin-bottom: 3%;
    height: 90%;
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
    height: 40px;
    margin-top: 10px;
    padding-bottom: 20px;
    background-color: rgb(0, 85, 169);
    h3 {
      font-weight: 500;
      font-size: 30px;
      margin-left: 30%;
      margin-top: 6%;
      font-weight: bold;
      color: white;
    }
  `;
  
  const BotonCerrar = styled.button`
    position: absolute;
    top: 35px;
    right: 60px;
    color: white;
    width: 30px;
    height: 30px;
    border: none;
    background: none;
    cursor: pointer;
    transition: 0.3s ease all;
    font-weight: bold;
  
    &:hover {
      color: black;
      font-size: small;
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
  
  export {
    Options,
    Menu,
    Tarjeta,
    Incidencia,
    Text,
    ButtonWrapper,
    Modal,
    Overlay,
    ContenedorModal,
    EncabezadoModal,
    BotonCerrar,
    ContenidoModal
  };
   
