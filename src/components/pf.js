import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPreguntasFrecuentes } from '../Redux/actions/pfActions';
import { FaSearch } from 'react-icons/fa'; // Importar el ícono de búsqueda

const FAQComponent = () => {
  const dispatch = useDispatch();
  const preguntasFrecuentes = useSelector(state => state.preguntasFrecuentes);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 2; // Cambiar a 2 preguntas por página

  useEffect(() => {
    dispatch(fetchPreguntasFrecuentes());
  }, [dispatch]);

  useEffect(() => {
    if (preguntasFrecuentes && !preguntasFrecuentes.loading && !preguntasFrecuentes.error) {
      setLoading(false);
      setModalOpen(true);
    }
  }, [preguntasFrecuentes]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const modalStyle = {
    display: modalOpen ? 'block' : 'none',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
    maxWidth: '600px',
  };

  const closeModalStyle = {
    color: '#aaaaaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const searchContainerStyle = {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const titleStyle = {
    color: '#007bff',
    marginBottom: '20px',
  };

  const searchInputStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
    flex: '1',
  };

  const searchIconStyle = {
    fontSize: '20px',
    cursor: 'pointer',
    color: '#555',
  };

  const paginationContainerStyle = {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
  };

  const paginationButtonStyle = {
    padding: '8px 16px',
    margin: '0 4px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
  };

  const activePaginationButtonStyle = {
    ...paginationButtonStyle,
    backgroundColor: '#007bff',
    color: '#fff',
  };

  const handleSearch = () => {
    setCurrentPage(1); 
  };

  const filteredPreguntas = preguntasFrecuentes.data
    ? preguntasFrecuentes.data.filter(pregunta =>
        pregunta.pregunta.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPreguntas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Cargando preguntas frecuentes...</p>;
  }

  if (preguntasFrecuentes.error) {
    return <p>Error al cargar las preguntas frecuentes: {preguntasFrecuentes.error}</p>;
  }

  return (
    <div>
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <span style={closeModalStyle} onClick={closeModal}>
            &times;
          </span>
          <div style={titleStyle}>
            <h2>Preguntas Frecuentes</h2>
          </div>
          <div style={searchContainerStyle}>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={searchInputStyle}
            />
            <FaSearch style={searchIconStyle} onClick={handleSearch} />
          </div>
          <ul>
            {currentItems.length > 0 ? (
              currentItems.map((pregunta, index) => (
                <li key={index}>
                  <h3>{pregunta.pregunta}</h3>
                  <p>{pregunta.respuesta}</p>
                </li>
              ))
            ) : (
              <li>No hay preguntas frecuentes disponibles</li>
            )}
          </ul>
          {filteredPreguntas.length > itemsPerPage && (
            <div style={paginationContainerStyle}>
              {[...Array(Math.ceil(filteredPreguntas.length / itemsPerPage)).keys()].map(
                pageNumber => (
                  <button
                    key={pageNumber}
                    style={pageNumber + 1 === currentPage ? activePaginationButtonStyle : paginationButtonStyle}
                    onClick={() => paginate(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;
