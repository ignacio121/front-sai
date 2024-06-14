import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPreguntasFrecuentes } from '../Redux/actions/pfActions';
import styled from 'styled-components';

const FAQComponent = () => {
  const dispatch = useDispatch();
  const preguntasFrecuentes = useSelector(state => state.preguntasFrecuentes);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPreguntas, setFilteredPreguntas] = useState([]);

  const preguntasPerPage = 3;

  useEffect(() => {
    dispatch(fetchPreguntasFrecuentes());
  }, [dispatch]);

  useEffect(() => {
    if (
      preguntasFrecuentes &&
      !preguntasFrecuentes.loading &&
      !preguntasFrecuentes.error &&
      preguntasFrecuentes.data
    ) {
      setLoading(false);
      setModalOpen(true);
      setFilteredPreguntas(preguntasFrecuentes.data);
    }
  }, [preguntasFrecuentes]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const filteredAndPaginatedPreguntas = () => {
    let filtered = filteredPreguntas;

    // Apply search filter if searchTerm is not empty
    if (searchTerm) {
      filtered = filtered.filter(pregunta =>
        pregunta.pregunta.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Pagination logic
    const startIndex = (currentPage - 1) * preguntasPerPage;
    const paginatedPreguntas = filtered.slice(startIndex, startIndex + preguntasPerPage);

    return paginatedPreguntas;
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const totalPages = Math.ceil(filteredPreguntas.length / preguntasPerPage);

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
          <h2>Preguntas Frecuentes</h2>

          <SearchInput
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <ul>
            {filteredAndPaginatedPreguntas().map((pregunta, index) => (
              <li key={index}>
                <h3>{pregunta.pregunta}</h3>
                <p>{pregunta.respuesta}</p>
              </li>
            ))}
          </ul>

          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <PageButton key={index + 1} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </PageButton>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
};

const modalStyle = {
  display: 'block',
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
  backgroundColor: '#fefefe',
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

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  border: none;

  &:hover {
    background-color: #0056b3;
  }
`;

export default FAQComponent;
