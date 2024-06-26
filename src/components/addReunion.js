import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addReunion } from '../Redux/actions/incidenciasActions';

const AddReunion = ({ state, changeState, incidenciaId }) => {
    const [formData, setFormData] = useState({
        incidencia_id: incidenciaId || '',
        tema: '',
        lugar: '',
        hora: '',
        fecha: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { incidencia_id, tema, lugar, hora, fecha } = formData;
        dispatch(addReunion(incidencia_id, tema, lugar, hora, fecha));
        changeState(false); // Cierra el modal después de enviar
    };

    return (
        <>
            {state && 
                <Overlay>
                    <ContenedorAddReunion>
                        <EncabezadoAddReunion>
                            <BoldText>Agregar reunión</BoldText>
                        </EncabezadoAddReunion>
                        <BotonCerrar onClick={() => changeState(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </BotonCerrar>
                        <ContenidoAddReunion>
                            <Form onSubmit={handleSubmit}>
                                <InputContainer>
                                    <Input
                                        type="text"
                                        name="tema"
                                        value={formData.tema}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputLabel htmlFor="tema">Tema</InputLabel>
                                </InputContainer>
                                <InputContainer>
                                    <Input
                                        type="text"
                                        name="lugar"
                                        value={formData.lugar}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputLabel htmlFor="lugar">Lugar</InputLabel>
                                </InputContainer>
                                <InputContainer>
                                    <Input
                                        type="date"
                                        name="fecha"
                                        value={formData.fecha}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputLabel htmlFor="fecha">Fecha</InputLabel>
                                </InputContainer>
                                <InputContainer>
                                    <Input
                                        type="time"
                                        name="hora"
                                        value={formData.hora}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputLabel htmlFor="hora">Hora</InputLabel>
                                </InputContainer>
                                <ButtonContainer>
                                    <Button type="submit">
                                        Agregar
                                    </Button>
                                </ButtonContainer>
                            </Form>
                        </ContenidoAddReunion>
                    </ContenedorAddReunion>
                </Overlay>
            }    
        </>
    );
};

export default AddReunion;

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

const ContenedorAddReunion = styled.div`
    width: 80%;
    max-width: 600px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    padding: 30px;
`;

const EncabezadoAddReunion = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1e98d7;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    font-family: "Bahnschrift-blod", sans-serif;
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

const ContenidoAddReunion = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
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

const BoldText = styled.span`
  font-weight: bold;
`;

