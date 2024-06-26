import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPreguntasFrecuentes } from '../Redux/actions/pfActions';
import { FaSearch } from 'react-icons/fa'; // Importar el ícono de búsqueda
import styled from 'styled-components';

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
      <Modal isOpen={modalOpen}>
        <ModalContent>
          <CloseModal onClick={closeModal}>&times;</CloseModal>
          <Title>
            <h2>Preguntas Frecuentes</h2>
          </Title>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <SearchIcon onClick={handleSearch} />
          </SearchContainer>
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
            <PaginationContainer>
              {[...Array(Math.ceil(filteredPreguntas.length / itemsPerPage)).keys()].map(
                pageNumber => (
                  <PaginationButton
                    key={pageNumber}
                    active={pageNumber + 1 === currentPage}
                    onClick={() => paginate(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </PaginationButton>
                )
              )}
            </PaginationContainer>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FAQComponent;


const Modal = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fff;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
`;

const CloseModal = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  color: #007bff;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  flex: 1;
`;

const SearchIcon = styled(FaSearch)`
  font-size: 20px;
  cursor: pointer;
  color: #555;
`;

const PaginationContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  margin: 0 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${props => (props.active ? '#007bff' : '#f0f0f0')};
  color: ${props => (props.active ? '#fff' : '#000')};
  cursor: pointer;
`;