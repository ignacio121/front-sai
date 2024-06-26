import React from 'react';
import styled from 'styled-components';
import { confirmReplyIncidencia, rejectIncidencia } from '../Redux/actions/incidenciasActions';
import { useDispatch } from 'react-redux';

function ConfirmIncident({ state, changeState, type, id, onConfirmation }) {
  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(confirmReplyIncidencia(id));
    onConfirmation(true); // Llamar a la función de manejo de confirmación desde props
  };

  const handleReject = () => {
    dispatch(rejectIncidencia(id));
    onConfirmation(false); // Llamar a la función de manejo de confirmación desde props
  };

  return (
    <>
      {state &&
        <Overlay>
          <ContenedorConfirmIncident>
            {type ? (
              <StyledText type={type}>
                ¿Está seguro de dar como <SpanResuelta>resuelta</SpanResuelta> esta incidencia?
              </StyledText>
            ) : (
              <StyledText type={type}>
                ¿Está seguro de <SpanResuelta>rechazar</SpanResuelta> esta incidencia?
              </StyledText>
            )}

            <ButtonContainer>
            
              <Button reject onClick={() =>  changeState(false)}>Cancelar</Button>
              <Button accept onClick={() => { changeState(false); type ? handleAccept() : handleReject() }}>Aceptar</Button>
            </ButtonContainer>
          </ContenedorConfirmIncident>
        </Overlay>
      }
    </>
  );
}

export default ConfirmIncident;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const ContenedorConfirmIncident = styled.div`
  width: 600px;
  min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100,100,111, 0.2) 0px 7px 29px 0px;
  padding: 30px;
  align-items: center;
  justify-content: center;
  margin-left: 40px;
  margin-right: 40px;
`;

const StyledText = styled.h2`
  font-family: "Bahnschrift", sans-serif;
  color: #1e98d7;
  text-align: center;

  ${(props) => props.type && `
    > span {
      color: #00ff00;
    }
  `}
  ${(props) => !props.type && `
    > span {
      color: #ff0000;
    }
  `}
`;

const SpanResuelta = styled.span`
  font-weight: bold; /* Opcional: hacer la palabra 'resuelta' en negrita */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 25%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  font-family: "Bahnschrift", sans-serif;
  cursor: pointer;
  ${(props) =>
    props.accept
      ? `background-color: #00ff00;`
      : props.reject
      ? `background-color: #ff0000;`
      : null}

  &:hover {
    opacity: 0.8;
    ${(props) =>
    props.accept
      ? `box-shadow: 0px 0px 11px 0px #00ff00, inset 0px 0px 4px 2px rgba(255, 255, 255, 0.35);`
      : props.reject
      ? `box-shadow: 0px 0px 11px 0px #ff1515, inset 0px 0px 4px 2px rgba(255, 255, 255, 0.35);`
      : null}
    box-sizing: border-box;
    
  }
`;