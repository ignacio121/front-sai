import styled from 'styled-components';

export const IncidenciasMainContainer = styled.div`
    margin-top: 30px;
    height: 85%;
    width: 95%;
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const IncidenciasContainer = styled.div`
  display: flex;
  align-items: center; 
  width: 100%;
  height: 70px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px 0px #afafaf;
`;

export const Estado = styled.div`
  height: 70px;
  width: 4vw;
  border-radius: 10px 0 0 10px;
  background-color: #4cff38;
  box-sizing: border-box;
  box-shadow: 3px 0px 6px 0px #4cff38;
`;

export const Prioridad = styled.div`
  width: 61px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0);
  font-family: "Bahnschrift", sans-serif;
  color: #1e98d7;
  text-align: center;
  font-size: 18px;
  line-height: 30px;
  margin-left: 2vw;
  margin-right: 2vw;
`;

export const Categoria = styled.div`
  width: 20vh;
  height: 30px;
  background-color: rgba(255, 255, 255, 0);
  font-family: "Bahnschrift", sans-serif;
  color: #1e98d7;
  text-align: center;
  font-size: 17px;
  line-height: 30px;
`;

export const UltimoMensaje = styled.div`
    width: 30vw;
    height: 30px;
    background-color: rgba(255, 255, 255, 0);
    box-sizing: border-box;
    font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
    font-weight: 300;
    color: #1e98d7;
    text-align: left;
    font-size: 15px;
    line-height: 30px;
    margin-left: 2vw;
    margin-right: 2vw;
`;

export const MensajeView = styled.div`
    width: 13px;
    height: 13px;
    background-color: #1e98d7;
    box-sizing: border-box;
    border-radius: 50%;
    margin-right: 1vw;
`;

export const Fecha = styled.div`
  width: 20vh;
  height: 30px;
  background-color: rgba(255, 255, 255, 0);
  font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
  color: #1e98d7;
  text-align: center;
  font-size: 15px;
  line-height: 30px;
`;

export const Separador = styled.div`
    width: .1%;
    height: 50px;
    background-color: rgba(30, 152, 215, 0.43);
    box-sizing: border-box;
    box-shadow: 0px 0px 11px 0px #afafaf;
`;

