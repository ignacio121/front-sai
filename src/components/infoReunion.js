import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import ReplyIncident from './replyIncident';

const InfoReunion = ({ state, changeState, reunion, origen }) => {
    const { incidencias } = useSelector((state) => state.incidencias);
    const { sesion, user } = useSelector((state) => state.auth);
    const [stateInfoIncidencia, changeInfoIncidencia] = useState({ activo: false, incidencia: null });
    const [studentName, changeStudentName] = useState("");

    const incidenciaId = reunion.incidencia_id;
    const incidenciaSeleccionada = incidencias.find(incidencia => incidencia.id === incidenciaId);

    useEffect(() => {
        if (sesion && sesion.userType === "alumno") {
            changeStudentName(`${user.nombre} ${user.apellido}`);
        } else if (incidenciaSeleccionada) {
            changeStudentName(`${incidenciaSeleccionada.alumno.nombre} ${incidenciaSeleccionada.alumno.apellido}`);
        }
    }, [sesion, user, incidenciaSeleccionada]);

    const handleEventSelect = () => {
        changeInfoIncidencia({ activo: true, incidencia: incidenciaSeleccionada });
    };

    return (
        <>
            {state && 
                <Overlay>
                    <ContenedorInfoReunion>
                        <EncabezadoInfoReunion>
                            <BoldText>Motivo:</BoldText> {` ${reunion.tema}`}
                        </EncabezadoInfoReunion>
                        <BotonCerrar onClick={() => changeState(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </BotonCerrar>
                        <ContenidoInfoReunion>
                            <SeparadorContenedor>
                                <TitleInfo>Informacion reunion</TitleInfo>
                                <Info>
                                    <BoldText>Ubicacion:</BoldText> {reunion.lugar}
                                </Info>
                                <br/>
                                <Info>
                                    <BoldText>Fecha:</BoldText> {!reunion.start ? moment(`${reunion.fecha} ${reunion.hora}`).format('LLLL') : moment(reunion.start).format('LLLL')}
                                </Info>
                                <br/>
                                <Info>
                                    <BoldText>Duracion:</BoldText> 30 minutos
                                </Info>
                            </SeparadorContenedor>
                            <SeparadorContenedor>
                                <TitleInfo>Informacion Incidencia</TitleInfo>
                                <Info>
                                    <BoldText>Estudiante:</BoldText> {studentName}
                                </Info>
                                <br/>
                                {incidenciaSeleccionada && (
                                    <>
                                        <Info>
                                            <BoldText>categoria:</BoldText> {incidenciaSeleccionada.categoriaNombre}
                                        </Info>
                                        <br/>
                                        <Info>
                                            <BoldText>Descripcion:</BoldText> {incidenciaSeleccionada.descripcion}
                                        </Info>
                                    </>
                                )}
                                {/* Aquí puedes agregar más información relacionada con la incidencia */}
                            </SeparadorContenedor>
                        </ContenidoInfoReunion>
                        {!origen &&
                            <ButtonContainer>
                                <Button onClick={handleEventSelect}>
                                    Ver incidencia
                                </Button>
                            </ButtonContainer>
                        }
                    </ContenedorInfoReunion>
                    {stateInfoIncidencia.activo && <ReplyIncident state={stateInfoIncidencia.activo} changeState={changeInfoIncidencia} incidencia={stateInfoIncidencia.incidencia} />}
                </Overlay>
            }
        </>
    );
};

export default InfoReunion;

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

const ContenedorInfoReunion = styled.div`
    width: 650px;
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

const EncabezadoInfoReunion = styled.div`
    display: flex;
    align-items: center;
    margin-right: 3px;
    padding-bottom: 20px;
    border-bottom: 1px solid #1e98d7;
    justify-content: center;
    color: #1e98d7;
    font-family: "Bahnschrift", sans-serif;
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

const ContenidoInfoReunion = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TitleInfo = styled.h2`
    font-family: "Bahnschrift", sans-serif;
    color: #1e98d7;
    text-align: center;
`;

const Info = styled.div`
    font-family: "Bahnschrift", sans-serif;
    color: #1e98d7;
    margin-left: 20px;
    font-size: 15px;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

const SeparadorContenedor = styled.div`
    height: 200px;
    width: 50%;
    left: 0;
`;

export const ButtonContainer = styled.div`
    margin: 1rem 0 2rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Button = styled.button`
    width: 30%;
    height: 5vh;
    padding: 2px 2px 2px 2px;
    border-radius: 27px;
    background-color: #1e98d7;
    box-sizing: border-box;
    font-family: "Bahnschrift Bold", "Bahnschrift", sans-serif;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
    line-height: normal;
    border: none;
    &:hover {
        box-sizing: border-box;
        box-shadow: 0px 0px 11px 0px rgba(0, 0, 255, 0.59),
        inset 0px 0px 4px 3px rgba(255, 255, 255, 0.35);
    }
`;
