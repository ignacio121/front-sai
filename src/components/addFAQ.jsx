import { React, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createPreguntaFrecuente, updatePreguntaFrecuente } from '../Redux/actions/pfActions';

const AddEditFAQ = ({ state, changeState, FAQ }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        pregunta: '',
        respuesta: '',
        categoria: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { pregunta, respuesta, categoria } = formData;
        if (FAQ){
            dispatch(updatePreguntaFrecuente( FAQ.id, pregunta, respuesta, categoria));
        } else {
            dispatch(createPreguntaFrecuente(pregunta, respuesta, 2));
        }
        
        changeState(false); // Cierra el modal después de enviar
    };

    useEffect(() => {
        if (FAQ) {
            setFormData({pregunta: FAQ.pregunta, respuesta: FAQ.respuesta, categoria: FAQ.categoriafaq_id});
        } else {
            setFormData({pregunta: '', respuesta: '', categoria: ''});
        }
      }, [FAQ, setFormData]);
    


    return(
        <>
        {state &&
        <Overlay>
            <ContenedorAEFAQ>
                <EncabezadoAEFAQ>
                    {FAQ ? "Editar Pregunta frecuente": "Agregar Pergunta frecuente"}
                </EncabezadoAEFAQ>
                <BotonCerrar onClick={() => changeState(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
                </BotonCerrar>
                <ContenidoAEFAQ>
                    <Form onSubmit={handleSubmit}>
                        <InputContainer>
                            <Input
                                type="text"
                                name="pregunta"
                                value={formData.pregunta}
                                onChange={handleChange}
                                required
                            />
                            <InputLabel htmlFor="pregunta">Pregunta</InputLabel>
                        </InputContainer>
                        <InputContainer>
                            <Input
                                type="textarea"
                                name="respuesta"
                                value={formData.respuesta}
                                onChange={handleChange}
                                required
                            />
                            <InputLabel htmlFor="respuesta">Respuesta</InputLabel>
                        </InputContainer>
                        <ButtonContainer>
                            <Button type="submit">
                                {FAQ ? "Guardar cambios": "Agregar"}
                            </Button>
                        </ButtonContainer>
                    </Form>
                </ContenidoAEFAQ>
            </ContenedorAEFAQ>
        </Overlay>
        }
        </>
    );
}

export default AddEditFAQ;

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

const ContenedorAEFAQ = styled.div`
    width: 600px;
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


const BoldText = styled.span`
  font-weight: bold;
`;

const EncabezadoAEFAQ = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #1e98d7;
    flex-direction: column;
    justify-content: center;
    font-family: "Bahnschrift", sans-serif;
    color: #1e98d7;
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

const ContenidoAEFAQ = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
`;

const InputContainer = styled.div`
    position: relative;
    display: flex;
`;

const Input = styled.input`
    font-family: "Bahnschrift", sans-serif;
    color: #1e98d7;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    margin-bottom: 20px ;
    margin-top: 5px;
    &:focus {
        outline: none;
        border-color: #1e98d7;
    }
`;

const InputLabel = styled.label`
    font-family: "Bahnschrift", sans-serif;
    position: absolute;
    left: 10px;
    top: -10px;
    font-size: 14px;
    color: #1e98d7;
    pointer-events: none;
    transition: top 0.3s ease, font-size 0.3s ease;
    ${({ htmlFor }) =>
        htmlFor &&
        `
        ${Input}:focus ~ &,
        ${Input}:not(:placeholder-shown) ~ & {
            top: -10px;
            font-size: 12px;
        }
    `}
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    font-family: "Bahnschrift", sans-serif;
    width: 40%;
    padding: 10px;
    background-color: #1e98d7;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #1766dc;
    }
`;