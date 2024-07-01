import styled from 'styled-components';

const getColor = (estado) => {
  switch (estado) {
    case 'Pendiente':
      return '#afafaf';
    case 'Atendida':
      return '#fff321';
    case 'Rechazada':
      return '#ff1515';
    case 'Aceptada':
      return '#4cff38';
    default:
      return '#afafaf';
  }
};

export const IncidenciasMainContainer = styled.div`
  height: 85%;
  width: 95%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-bottom: 15px;
  }
`;

export const IncidenciasHeader = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  margin-bottom: 6px;
  box-sizing: border-box;
  justify-content: space-between;
`;

export const EstadoHeader = styled.div`
  height: 70px;
  width: 4vw;
  font-family: "Bahnschrift", sans-serif;
  color: #1e98d7;
  text-align: center;
  font-size: 18px;
  line-height: 30px;

  @media (max-width: 768px) {
    width: 100%;
    height: 10px;
    border-radius: 10px 10px 0 0;
  }
`;

export const HeaderItem = styled.div`
  flex: 1;
  text-align: center;
  font-family: "Bahnschrift", sans-serif;
  color: #1e98d7;
  font-size: 18px;
  line-height: 40px;
  padding: 0 8px;
  overflow: hidden;
  white-space: nowrap;
  min-width: 95px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 4px;
  }
`;

export const IncidenciasContainer = styled.div`
  display: flex;
  align-items: center; 
  width: 100%;
  height: 70px;
  margin-bottom: 6px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px 0px #afafaf;
  cursor: pointer;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }
`;

export const Estado = styled.div`
  height: 70px;
  width: 4vw;
  border-radius: 10px 0 0 10px;
  background-color: ${({ estado }) => getColor(estado)};
  box-sizing: border-box;
  box-shadow: 3px 0px 6px 0px ${({ estado }) => getColor(estado)};

  @media (max-width: 768px) {
    width: 100%;
    height: 10px;
    border-radius: 10px 10px 0 0;
  }
`;

export const Prioridad = styled.div`
  width: 100px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0);
  font-family: "Bahnschrift", sans-serif;
  color: #1e98d7;
  text-align: center;
  font-size: 18px;
  line-height: 30px;
  margin: 0 2vw;

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
  }
`;

export const Categoria = styled.div`
  flex: 2;
  height: 30px;
  background-color: rgba(255, 255, 255, 0);
  font-family: "Bahnschrift", sans-serif;
  color: #1e98d7;
  text-align: center;
  font-size: 17px;
  line-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
  }
`;

export const UltimoMensaje = styled.div`
  flex: 3;
  height: 30px;
  background-color: rgba(255, 255, 255, 0);
  box-sizing: border-box;
  font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
  font-weight: 300;
  color: #1e98d7;
  text-align: left;
  font-size: 15px;
  line-height: 30px;
  margin: 0 2vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
  }
`;

export const MensajeView = styled.div`
  width: 13px;
  height: 13px;
  background-color: ${({ ultimaRespuesta }) => ultimaRespuesta ? '#1e98d7' : 'transparent'};
  box-sizing: border-box;
  border-radius: 50%;
  margin-right: 1vw;

  @media (max-width: 768px) {
    width: 100%;
    height: 10px;
  }
`;

export const Fecha = styled.div`
  flex: 1;
  height: 30px;
  background-color: rgba(255, 255, 255, 0);
  font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
  color: #1e98d7;
  text-align: center;
  font-size: 15px;
  line-height: 30px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 5px 0;
  }
`;

export const Separador = styled.div`
  width: 1px;
  height: 50px;
  background-color: rgba(30, 152, 215, 0.43);
  box-sizing: border-box;
  box-shadow: 0px 0px 11px 0px #afafaf;

  @media (max-width: 768px) {
    width: 100%;
    height: 1px;
  }
`;
