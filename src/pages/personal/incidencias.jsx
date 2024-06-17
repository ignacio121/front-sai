import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { getIncidencias } from '../../Redux/actions/incidenciasActions';
import { Categoria, Estado, Fecha, IncidenciasContainer, IncidenciasMainContainer, MensajeView, Prioridad, Separador, UltimoMensaje } from '../../style/incidencia.style';
import ReplyIncident from '../../components/replyIncident';
import LoaderComponent from '../../components/loader';
import Pagination from '../../components/pagination';


function IncidenciasPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sesion, token } = useSelector((state) => state.auth);
  const { incidencias, loading } = useSelector((state) => state.incidencias);

  const [stateReplyIncident, changeReplyIncident] = useState({ activo: false, incidencia: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [incidenciasPerPage] = useState(7); // Número de incidencias por página
  const [currentIncidencias, setCurrentIncidencias] = useState([]);

  const ultimaRespuesta = (respuestas) => {
    if (respuestas.length === 0) {
      return false;
    }
    const ultimaRespuesta = respuestas[respuestas.length - 1];
    return ultimaRespuesta.remitente_tipo !== sesion.userType;
  };

  const OpenReplyIncident = (incidencia) => {
    changeReplyIncident({ activo: true, incidencia: incidencia });
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      dispatch(getIncidencias(sesion.userId, sesion.userType, token));
    }
    if (incidencias){
      const indexOfLastIncidencia = currentPage * incidenciasPerPage;
      const indexOfFirstIncidencia = indexOfLastIncidencia - incidenciasPerPage;
      setCurrentIncidencias(incidencias.slice(indexOfFirstIncidencia, indexOfLastIncidencia))
    }
  }, [token, navigate, dispatch, sesion, currentPage, incidencias, incidenciasPerPage]);

  
  // Cambiar de página

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading || currentIncidencias ? (
        <>
          <IncidenciasMainContainer>
            {currentIncidencias.map(incidencia => (
              <IncidenciasContainer key={incidencia.id} onClick={() => OpenReplyIncident(incidencia)}>
                <Estado estado={incidencia.estado} />
                <Prioridad> {incidencia.prioridad} </Prioridad>
                <Separador />
                <Categoria> {incidencia.categoriaNombre} </Categoria>
                <Separador />
                <UltimoMensaje> {incidencia.descripcion} </UltimoMensaje>
                <MensajeView ultimaRespuesta={ultimaRespuesta(incidencia.respuestaincidencia)} />
                <Separador />
                <Fecha>{format(new Date(incidencia.fechahoracreacion), 'dd-MM-yyyy')}</Fecha>
              </IncidenciasContainer>
            ))}
            {incidencias && 
            <Pagination
              incidenciasPerPage={incidenciasPerPage}
              totalIncidencias={incidencias.length}
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
