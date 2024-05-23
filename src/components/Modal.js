import React from 'react';
import styled from 'styled-components';

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

export default Modal;

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
