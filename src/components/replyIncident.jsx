import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getEstudiantesId } from '../Redux/actions/estudiantesActions';
import { FaPaperPlane } from 'react-icons/fa';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { replyIncidencia } from '../Redux/actions/incidenciasActions';
import ConfirmIncident from './confirmIncident';

const ReplyIncident = ({ state, changeState, incidencia }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { estudiante } = useSelector((state) => state.estudiantes);
  const { sesion, user } = useSelector((state) => state.auth);
  const { destinatarios } = useSelector((state) => state.destinatarios);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(incidencia.respuestaincidencia);
  const [stateOpenConfirm,changeOpenConfirm] = useState({activo: false, type: null});
  const [EstadoIncidencia, setEstadoIncidencia] = useState(incidencia.estado);
  const alumnoInfo = incidencia.alumno;

  const filtrarDestinatario = (personalId) => {
    return destinatarios.filter(destinatario => destinatario.id === personalId);
  };

  const destinatario = filtrarDestinatario(incidencia.personal_id)[0];

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    adjustTextareaHeight(e);
  };

  const handleSendClick = () => {
    if (message.trim() === '') {
      return;
    }

    if(!(EstadoIncidencia !== 'Pendiente' && EstadoIncidencia !== 'Atendida')){
      const newMessage = {
        id: Date.now(),
        contenido: message,
        remitente_id: sesion.userId,
        incidencia_id: incidencia.id,
        fecharespuesta: new Date().toISOString(),
        remitente_tipo: sesion.userType
      };
      console.log(newMessage)
      console.log(sesion)
      dispatch(replyIncidencia(incidencia.id, message, sesion.userId, sesion.userType));
      setMessages([...messages, newMessage]);
      setMessage('');
      console.log(alumnoInfo)
      if (alumnoInfo){
        setEstadoIncidencia('Atendida')
      }
    }
  };

  const adjustTextareaHeight = (e) => {
    e.target.style.height = '45px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const obtenerIniciales = (nombreCompleto) => {
    if (nombreCompleto) {
      const nombres = nombreCompleto.split(' ');
      const inicialNombre = nombres[0].charAt(0).toUpperCase();
      const inicialApellido = nombres[1] ? nombres[1].charAt(0).toUpperCase() : '';
      return `${inicialNombre}${inicialApellido}`;
    }
    return "";
  };

  const openConfirm  = (type) => {
    changeOpenConfirm({activo: true, type: type})
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      setEstadoIncidencia('Aceptada');
    } else {
      setEstadoIncidencia('Rechazada');
    }
    changeOpenConfirm({ activo: false, type: null });
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (incidencia.alumno && alumnoInfo.id) {
      dispatch(getEstudiantesId(alumnoInfo.id));
    }
  }, [incidencia, alumnoInfo, dispatch, user, navigate]);
  return (
    <>
      {state &&
        <Overlay>
          <ContenedorReplyIncident>
            <EncabezadoReplyIncident>
              {estudiante && estudiante.foto && (
                <FotoEstudiante src={estudiante.foto} alt={`${alumnoInfo.nombre} ${alumnoInfo.apellido}`} />
              )}
              <LabelInfo>
                <Info>
                  <BoldText>Nombre:</BoldText> {alumnoInfo ? `${alumnoInfo.nombre} ${alumnoInfo.apellido}` : destinatario.nombre}
                </Info>
                <Info>
                  <BoldText>Correo:</BoldText> {alumnoInfo ? alumnoInfo.email : destinatario.email}
                </Info>
              </LabelInfo>
              {alumnoInfo &&
              <LabelInfo>
                <Info>
                  <BoldText>Carrera:</BoldText> {alumnoInfo.carrera.nombre}
                </Info>
                <Info>
                  <BoldText>Rut:</BoldText> {alumnoInfo.rut}
                </Info>
              </LabelInfo>}
            </EncabezadoReplyIncident>
            <BotonCerrar onClick={() => changeState(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </BotonCerrar>
            <ContenidoReplyIncident>
              <ContenedorInfoIncidencia>
              <TitleInfo>Informacion Incidencia</TitleInfo>
              <Info>
                  <BoldText>Categoria:</BoldText> {incidencia.categoriaNombre}
                </Info>
                <br/>
                <Info>
                  <BoldText>Prioridad:</BoldText> {incidencia.prioridad}
                </Info>
                <br/>
                <Info>
                  <BoldText>Estado:</BoldText> {EstadoIncidencia}
                </Info>
                <br/>
                <Info>
                  <BoldText>Fecha de inicio:</BoldText> {format(new Date(incidencia.fechahoracreacion), 'dd-MM-yyyy')}
                </Info>
                <br/>
                <Info>
                  <BoldText>Fecha de finalización:</BoldText> {incidencia.fechahoracierre ? format(new Date(incidencia.fechahoracierre), 'dd-MM-yyyy') : 'Aún en curso'}
                </Info>
                <br/>
                <Info>
                  <BoldText>Archivos:</BoldText>
                  <ArchivoBox>
                    {incidencia.archivos && incidencia.archivos.length > 0 ? (
                      incidencia.archivos.map((archivo) => (
                        <ArchivoItem key={archivo.id}>
                          <a href={archivo.archivo_url} target="_blank" rel="noopener noreferrer">
                            {archivo.archivo_nombre}
                          </a>
                        </ArchivoItem>
                      ))
                    ) : (
                      <SinArchivos>Sin archivos</SinArchivos>
                    )}
                  </ArchivoBox>
                </Info>
                <br/>
                { !(EstadoIncidencia !== 'Pendiente' && EstadoIncidencia !== 'Atendida') && alumnoInfo &&
                  <ButtonContainer>
                    <Button reject onClick={() => openConfirm(false)}>Rechazar</Button>
                    <Button accept onClick={() => openConfirm(true)}>Aceptar</Button>
                  </ButtonContainer>
                }
              </ContenedorInfoIncidencia>
              <ContenedorChat>
                <ChatMessages>
                  <ContenedorMessage>
                    <Remitente>
                      {obtenerIniciales(alumnoInfo ? `${alumnoInfo.nombre} ${alumnoInfo.apellido}` : `${user.nombre} ${user.apellido}`)}
                    </Remitente>
                    <div style={{ marginLeft: '10px' }}>
                      <Fecha>{format(new Date(incidencia.fechahoracreacion), "HH:mm d MMM").toLowerCase()}</Fecha>
                      <Contenido>{incidencia.descripcion}</Contenido>
                    </div>
                  </ContenedorMessage>
                  {messages.map((respuesta) => (
                    <ContenedorMessage key={respuesta.id}>
                      <Remitente>
                        {obtenerIniciales(
                          respuesta.remitente_tipo === 'alumno' && !alumnoInfo
                            ? `${user.nombre} ${user.apellido}`
                            : respuesta.remitente_tipo === 'alumno' && alumnoInfo
                              ? `${alumnoInfo.nombre} ${alumnoInfo.apellido}`
                              :  respuesta.remitente_tipo === 'personal' && alumnoInfo
                                ? `${user.nombre}`
                                : destinatario.nombre
                        )}
                      </Remitente>
                      <div style={{ marginLeft: '10px' }}>
                        <Fecha>{format(new Date(respuesta.fecharespuesta), "HH:mm d MMM").toLowerCase()}</Fecha>
                        <Contenido>{respuesta.contenido}</Contenido>
                      </div>
                    </ContenedorMessage>
                  ))}
                  {(EstadoIncidencia === 'Aceptada' || EstadoIncidencia === 'Rechazada') && 
                    <EstadoIncidenciaBox estado={EstadoIncidencia}>
                      {EstadoIncidencia === 'Aceptada' ? 'La incidencia ha sido aceptada' : 'La incidencia ha sido rechazada'}
                    </EstadoIncidenciaBox>
                  }
                </ChatMessages>
                <SendMessageContainer>
                  <SendMessage
                    placeholder="Type a message"
                    value={message}
                    onChange={handleInputChange}
                    disabled={(EstadoIncidencia !== 'Pendiente' && EstadoIncidencia !== 'Atendida')}
                  />
                  <SendIcon onClick={handleSendClick} />
                </SendMessageContainer>
              </ContenedorChat>
            </ContenidoReplyIncident>
          </ContenedorReplyIncident>
        </Overlay>
      }

      <ConfirmIncident state={stateOpenConfirm.activo} changeState={changeOpenConfirm} type={stateOpenConfirm.type} id={incidencia.id} onConfirmation={handleConfirmation}/>
    </>
  );
};

export default ReplyIncident;

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
    z-index: 2;
`;

const ContenedorReplyIncident = styled.div`
    width: 900px;
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

const FotoEstudiante = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  left:0;
  position: absolute;
  margin-left: 50px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const EncabezadoReplyIncident = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #1e98d7;
    flex-direction: column;
    justify-content: center
`;

const LabelInfo = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const Info = styled.div`
    font-family: "Bahnschrift", sans-serif;
    color: #1e98d7;
    margin-left: 20px;
    font-size: 20px;
`;

const BotonCerrar = styled.div`
    position: absolute;
    top: 15px;
    right: 20px;
    width: 30px;
    height: 30px;
    border: none;
    background: none;
    cursor: pointer;
    transition: .3 ease all;
    border-radius: 5px;
    color: #1766DC;

    &:hover{
        background: #f2f2f2
    }
    svg{
        width: 100%;
        height: 100%;
    }
`;

const ContenidoReplyIncident = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContenedorInfoIncidencia = styled.div`
    height:470px;
    width: 50%;
    left: 0;
`;

const TitleInfo = styled.h2`
  font-family: "Bahnschrift", sans-serif;
  color: #1e98d7;
  text-align: center;
`;

const ArchivoBox = styled.div`
  border-radius: 7px;
  border: 1px solid #1e98d7;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.35);
  padding: 10px;
  width: 80%;
`;

const ArchivoItem = styled.div`
  margin-bottom: 5px;

  img {
    max-width: 100%;
  }

  a {
    color: #1e98d7;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SinArchivos = styled.div`
  color: #888;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 40%;
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

const ContenedorChat = styled.div`
  height: 470px;
  width: 50%;
  right: 0;
  border-radius: 7px;
  border: 1px solid #1e98d7;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  overflow-y: auto;
  padding: 10px;
`;

const ChatMessages = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ContenedorMessage = styled.div`
    padding-bottom: 10px;
    border-bottom: 1px solid #1e98d7;
    display: flex;
    padding-top: 5px;
`;

const Remitente = styled.div`
  width: 55px;
  height: 55px;
  background-color: #1e98d7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  font-family: "Bahnschrift", sans-serif;
  flex-shrink: 0;
`;

export const Fecha = styled.div`
    width: 20vh;
    height: 30px;
    background-color: transparent;
    font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
    color: #1e98d7;
    text-align: left;
    font-size: 15px;
    line-height: 30px;
`;

export const Contenido = styled.div`
  flex: 1;
  background-color: transparent;
  box-sizing: border-box;
  font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
  font-weight: 300;
  color: #1e98d7;
  text-align: left;
  font-size: 15px;
  line-height: 1.5;
  overflow: visible;
  white-space: normal;
  word-break: break-word;
`;

const EstadoIncidenciaBox = styled.div`
  background-color: ${props => props.estado === 'Aceptada' ? 'rgba(154, 255, 145, 0.73)' : props.estado === 'Rechazada' ? '#ff8484': 'white'};
  border-radius: 7px;
  border: 1px solid ${props => props.estado === 'Aceptada' ? '#14ff00' : props.estado === 'Rechazada' ? '#ff1515': 'white'};
  box-sizing: border-box;
  box-shadow: 0px 0px 11px 0px #afafaf;
  font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
  font-weight: 300;
  color: ${props => props.estado === 'Aceptada' ? '#14ff00' : props.estado === 'Rechazada' ? '#ff1515': 'white'};
  text-align: center;
  line-height: normal;
  margin-top: 10px;
  width: auto;
`;

const SendMessageContainer = styled.div`
  width: 95%;
  position: relative;
  display: flex;
  align-items: center;
`;

const SendMessage = styled.textarea`
  width: 100%;
  height: 40px;
  max-height: 150px;
  padding: 10px 50px 10px 15px;
  border-radius: 8px;
  border: 2px solid #1e98d7;
  background-color: #ffffff;
  box-sizing: border-box;
  font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
  font-weight: 300;
  color: #1e98d7;
  text-align: left;
  resize: none;
  overflow: hidden;
  &:focus{
    border: 3px solid #1e98d7;
    outline: none;
  }
`;

const SendIcon = styled(FaPaperPlane)`
  position: absolute;
  right: 15px;
  cursor: pointer;
  color: #1e98d7;
  &:hover {
    color: #1766DC; // Cambia el color al pasar el ratón por encima
  }
`;


