// IncidenciasPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { getIncidencias } from '../../Redux/actions/incidenciasActions';
import {
  Categoria,
  Estado,
  Fecha,
  EstadoHeader,
  IncidenciasContainer,
  IncidenciasHeader,
  IncidenciasMainContainer,
  MensajeView,
  Prioridad,
  Separador,
  UltimoMensaje,
} from '../../style/incidencia.style';
import ReplyIncident from '../../components/replyIncident';
import LoaderComponent from '../../components/loader';
import Pagination from '../../components/pagination';
import Filtro from '../../components/Filtro';

function IncidenciasPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sesion, token } = useSelector((state) => state.auth);
  const { incidencias, loading, error } = useSelector((state) => state.incidencias);

  const [stateReplyIncident, changeReplyIncident] = useState({ activo: false, incidencia: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [incidenciasPerPage] = useState(7); // Número de incidencias por página
  const [currentIncidencias, setCurrentIncidencias] = useState([]);
  const [filtIncidencias, setFiltIncidencias] = useState([]);

  const ultimaRespuesta = (incidencia) => {
    const respuestas = incidencia.respuestaincidencia;
    if (respuestas.length === 0 && sesion.userType === 'alumno') {
      return false;
    }
    if (respuestas.length === 0 && sesion.userType === 'personal') {
      return true;
    }
    const ultimaRespuesta = respuestas[respuestas.length - 1];
    return ultimaRespuesta.remitente_tipo !== sesion.userType;
  };

  const OpenReplyIncident = (incidencia) => {
    changeReplyIncident({ activo: true, incidencia: incidencia });
  };

  useEffect(() => {
    if (!token || error) {
      navigate('/');
    } 
    if (!incidencias && !loading){
      dispatch(getIncidencias(sesion.userId, sesion.userType));
    }
    if (incidencias && sesion.userType === 'personal'){
      const indexOfLastIncidencia = currentPage * incidenciasPerPage;
      const indexOfFirstIncidencia = indexOfLastIncidencia - incidenciasPerPage;
  
      // Aplicar filtros si existen
      if (filtIncidencias.length > 0){
        setCurrentIncidencias(filtIncidencias.slice(indexOfFirstIncidencia, indexOfLastIncidencia));
      } else {
        setCurrentIncidencias(incidencias.slice(indexOfFirstIncidencia, indexOfLastIncidencia));
      }
    } else if (incidencias && sesion.userType === 'alumno'){
      setCurrentIncidencias(incidencias);
    }
  }, [token, navigate, dispatch, sesion, currentPage, incidencias, incidenciasPerPage, loading, error, filtIncidencias]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading || currentIncidencias.length > 0 ? (
        <>
          <IncidenciasMainContainer>
            {incidencias && sesion.userType === 'personal' &&
             <Filtro incidencias={incidencias} setFiltIncidencias={setFiltIncidencias} />
            }
            <IncidenciasHeader>
              <EstadoHeader>Estado</EstadoHeader> 
              <Prioridad> Prioridad </Prioridad>
              <Categoria> Categoria </Categoria>
              <UltimoMensaje> Descripcion </UltimoMensaje>
              <Fecha>Fecha</Fecha>
            </IncidenciasHeader>
            
            {currentIncidencias.map(incidencia => (
              <IncidenciasContainer key={incidencia.id} onClick={() => OpenReplyIncident(incidencia)}>
                <Estado estado={incidencia.estado} />
                <Prioridad> {incidencia.prioridad} </Prioridad>
                <Separador />
                <Categoria> {incidencia.categoriaNombre} </Categoria>
                <Separador />
                <UltimoMensaje> {incidencia.descripcion} </UltimoMensaje>
                <MensajeView ultimaRespuesta={ultimaRespuesta(incidencia)} />
                <Separador />
                <Fecha>{format(new Date(incidencia.fechahoracreacion), 'dd-MM-yyyy')}</Fecha>
              </IncidenciasContainer>
            ))}
            
            {incidencias && sesion.userType === 'personal' && 
              <Pagination
                incidenciasPerPage={incidenciasPerPage}
                totalIncidencias={filtIncidencias.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            }
          </IncidenciasMainContainer>
          {stateReplyIncident.incidencia && <ReplyIncident state={stateReplyIncident.activo} changeState={changeReplyIncident} incidencia={stateReplyIncident.incidencia} />}
        </>
      ) : (
        <LoaderComponent />
      )}
    </>
  );
}

export default IncidenciasPage;
