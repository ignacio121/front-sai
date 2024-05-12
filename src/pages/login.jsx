import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
    const navigate = useNavigate();
    const [Rut,setRut] = useState("");
    const [Password, setPassword] = useState("");

    const Auth = (e) => {
        if (Rut === '20705543' && Password === '123'){
            navigate('/direccion')
        };
        if (Rut === '207055433' && Password === '123'){
            navigate('/estudiante')
        };
    };

    return (
        <Contenedor>
            <Titulo>Sistema de Administracion de Incidencias</Titulo>
            <ContenedorForm>
                <LoginText>INICIO DE SESIÓN</LoginText>
                <Form onSubmit={Auth}>
                    <InputContainer>
                        <Input type='text' value={Rut} onChange={(e) => setRut(e.target.value)} placeholder='Rut'></Input>
                        <br/>
                        <br/>
                        <Input type='password' value={Password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña'></Input>
                    </InputContainer>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <ButtonContainer>
                        <Button type="submit">
                            INGRESA
                        </Button>
                    </ButtonContainer>
                </Form>
                
            </ContenedorForm>
        </Contenedor>
    );
};

export default Login;


export const Contenedor = styled.div`
    margin: 0;
    padding: 0;
    background-position: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Titulo = styled.h1`
    box-sizing: border-box;
    font-weight: 700;
    color: #ffffff;
    text-align: left;
    line-height: normal;
    position: absolute;
    top: 30px;
`;

export const ContenedorForm = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 70vh;
    width: 35vw;
    background: #ffffff;  
    box-shadow: 0 0 0 0.1rem ;
    backdrop-filter: blur(8.5);
    border-radius: 20px;
    color: black;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
`;
const LoginText = styled.h2`
  margin: 3rem 0 2rem 0;
  color: #1e98d7;
  font-size: 30px;
`;

const Form = styled.form`
  display: flex;
  margin-top: 100px;
  flex-direction: column;
`;

const InputContainer =  styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  height: 20%;
  width: 400px;   
`;

const Input = styled.input`
    background : rgba(255,255,255,0.15);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 255, 0.59);
    border-radius: 15px;
    width: 80%;
    height: 10vh;
    padding: 1rem;
    border: none;
    outline: none;
    color: #1e98d7;
    font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
    &:focus{
        display: inline-block;
        box-shadow: 0 0 0 0.1rem #1e98d7;
        backdrop-filter: blur(12);
    }
    &::placeholder{
        color: #1e98d7;
        font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
    }
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0 ;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
    width: 50%;
    height: 7vh;
    padding: 2px 2px 2px 2px;
    border-radius: 27px;
    background-color: #1e98d7;
    box-sizing: border-box;
    font-family: "Bahnschrift Bold", "Bahnschrift", sans-serif;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
    line-height: normal;
    border: none;
    &:hover {
        box-sizing: border-box;
        box-shadow: 0px 0px 11px 0px rgba(0, 0, 255, 0.59), inset 0px 0px 4px 3px rgba(255, 255, 255, 0.35);
    }
`;