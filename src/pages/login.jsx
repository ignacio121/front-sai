// src/components/Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../Redux/actions/authActions';
import { Contenedor, ContenedorForm, LoginText, Titulo, Form, InputContainer, Input, ButtonContainer, Button } from '../style/login.style.js';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user, error } = useSelector((state) => state.auth);

  const [Rut, setRut] = useState('');
  const [Password, setPassword] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    dispatch(login(Rut, Password));
  };

  useEffect(() => {
    console.log(user)
    if (isAuthenticated && user) {
        console.log(user)
        if (user.userType === "alumno"){
            navigate('/estudiante');
        }
        else if (user.userType === "personal"){
            navigate('/personal');
        };
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Contenedor>
      <Titulo>Sistema de Administración de Incidencias</Titulo>
      <ContenedorForm>
        <LoginText>INICIO DE SESIÓN</LoginText>
        <Form onSubmit={handleAuth}>
          <InputContainer>
            <Input type='text' value={Rut} onChange={(e) => setRut(e.target.value)} placeholder='Rut' />
            <Input type='password' value={Password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
          </InputContainer>
          <ButtonContainer>
            <Button type='submit'>
              {loading ? 'Cargando...' : 'INGRESA'}
            </Button>
          </ButtonContainer>
        </Form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </ContenedorForm>
    </Contenedor>
  );
}

export default Login;
