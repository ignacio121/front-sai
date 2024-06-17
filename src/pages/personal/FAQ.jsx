import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchPreguntasFrecuentes } from '../../Redux/actions/pfActions';

function FAQPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { data: preguntasFrecuentes } = useSelector((state) => state.preguntasFrecuentes);
  const [activeIndex, setActiveIndex] = useState(null);

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

  return (
    <>
      {token ? (
        <>
          <FAQContainer>
            {preguntasFrecuentes.map((faq, index) => (
              <FAQItem key={index}>
                <QuestionButton onClick={() => toggleDropdown(index)}>
                  {faq.pregunta}
                </QuestionButton>
                <AnswerContainer isActive={activeIndex === index}>
                  <AnswerContent>
                    {faq.respuesta}
                  </AnswerContent>
                </AnswerContainer>
              </FAQItem>
            ))}
          </FAQContainer>
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
  &:hover {
    background-color: #f1f1f1;
  }
  font-family: "Bahnschrift", sans-serif;
  color: #1e98d7;
  font-size: 17px;
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
