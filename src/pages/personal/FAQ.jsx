import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deletePreguntaFrecuente, fetchPreguntasFrecuentes } from '../../Redux/actions/pfActions';
import ConfigPF from '../../components/configPf';
import { RxPencil2, RxTrash } from "react-icons/rx";
import AddEditFAQ from '../../components/addFAQ';
import Pagination from '../../components/pagination';

function FAQPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { data: preguntasFrecuentes } = useSelector((state) => state.preguntasFrecuentes);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIconType, setActiveIconType] = useState(null);
  const [stateAddEdit, changeStateAddEdit] = useState({ activo: false, FAQ: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [FAQPerPage] = useState(9);
  const [currentFAQ, setCurrentFAQ] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      dispatch(fetchPreguntasFrecuentes());
    }
  }, [token, navigate, dispatch]);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleAddClick = () => {
    setActiveIconType('add');
    changeStateAddEdit({ activo: true, FAQ: null });
  };

  const handleEditClick = () => {
    setActiveIconType('edit');
  };

  const handleDeleteClick = () => {
    setActiveIconType('delete');
  };

  const handleIconClick = (FAQ, action) => {

    console.log('FAQ ID:', FAQ, action);
    if (action === 'edit'){
      changeStateAddEdit({ activo: true, FAQ: FAQ });
    }
    if (action === 'delete'){
      dispatch(deletePreguntaFrecuente(FAQ.id));
    }
  };

  useEffect(() => {
    const indexOfLastFAQ = currentPage * FAQPerPage;
    const indexOfFirstFAQ = indexOfLastFAQ - FAQPerPage;
    setCurrentFAQ(preguntasFrecuentes.slice(indexOfFirstFAQ, indexOfLastFAQ));
  }, [currentPage, preguntasFrecuentes, FAQPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {token ? (
        <>
          <ConfigPF onAddClick={handleAddClick} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
          <FAQContainer>
            {currentFAQ.map((faq, index) => (
              <FAQItem key={faq.id}>
                <QuestionButton onClick={() => toggleDropdown(index)}>
                  {faq.pregunta}
                  {activeIconType === 'edit' && (
                    <EditIcon onClick={() => handleIconClick(faq, activeIconType)}>
                      <RxPencil2 />
                    </EditIcon>
                  )}
                  {activeIconType === 'delete' && (
                    <DeleteIcon onClick={() => handleIconClick(faq, activeIconType)}>
                      <RxTrash />
                    </DeleteIcon>
                  )}
                </QuestionButton>
                <AnswerContainer isActive={activeIndex === index}>
                  <AnswerContent>{faq.respuesta}</AnswerContent>
                </AnswerContainer>
              </FAQItem>
            ))}
            <Pagination
            incidenciasPerPage={FAQPerPage}
            totalIncidencias={preguntasFrecuentes.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          </FAQContainer>
          
    
          <AddEditFAQ state={stateAddEdit.activo} changeState={changeStateAddEdit} FAQ={stateAddEdit.FAQ}/>
        </>
      ) : (
        <DeniedMessage>Acceso denegado. Por favor, inicia sesión para acceder a esta página.</DeniedMessage>
      )}
    </>
  );
}

export default FAQPage;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
`;

const FAQItem = styled.div`
  overflow: hidden;
  border-radius: 10px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px 0px #afafaf;
`;

const QuestionButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #f9f9f9;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #f1f1f1;
  }
  font-family: "Bahnschrift", sans-serif;
  color: #1e98d7;
  font-size: 17px;
`;

const EditIcon = styled.div`
  display: flex;
  color: #afafaf;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
`;

const DeleteIcon = styled.div`
  display: flex;
  color: #ff1515;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
`;

const AnswerContainer = styled.div`
  max-height: ${({ isActive }) => (isActive ? '500px' : '0')}; 
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
  padding: ${({ isActive }) => (isActive ? '15px' : '0 15px')};
  background-color: #fff;
  border-top: 1px solid #ddd;
`;

const AnswerContent = styled.div`
  font-size: 14px;
  color: #1e98d7;
  font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
`;

const DeniedMessage = styled.p`
  color: red;
  font-size: 16px;
  text-align: center;
`;
