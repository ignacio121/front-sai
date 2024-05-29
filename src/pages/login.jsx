// src/components/Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../Redux/actions/authActions';
import { Contenedor, ContenedorForm, LoginText, Titulo, Form, InputContainer, Input, ButtonContainer, Button, Error } from '../style/login.style.js';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error, sesion } = useSelector((state) => state.auth);

  const [Rut, setRut] = useState('');
  const [Password, setPassword] = useState('');

  const [authError, setAuthError] = useState({message:'', state:null});

  const handleAuth = (e) => {
    e.preventDefault();
    if ( !(/^\d{8}$/).test(Rut) ){
      setAuthError({message: 'Por favor ingresa un rut valido', state:'true'});
    } else {
      dispatch(login(Rut, Password));
    }
  };

  useEffect(() => {
    if (error && error.message) {
        setAuthError({message:error.message, state:'true'});
    }

    if (isAuthenticated) {
      if (sesion && sesion.userType === "alumno"){
          navigate('/estudiante');
      }
      else if (sesion && sesion.userType === "personal"){
          navigate('/personal');
      };
  }
  }, [isAuthenticated, sesion, navigate, error, setAuthError]);

  return (
    <Contenedor>
      <Titulo>Sistema de Administración de Incidencias</Titulo>
      <ContenedorForm>
        <LoginText>INICIO DE SESIÓN</LoginText>
        <Form onSubmit={handleAuth}>
          <InputContainer>
          {authError.state && <Error error={authError.state} style={{ color: 'red' }}  >{authError.message}</Error>}
            <Input type='text' value={Rut} onChange={(e) => setRut(e.target.value)} placeholder='Rut' error={authError.state}/>
            <Input type='password' value={Password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' error={authError.state}/>
          </InputContainer>
          <ButtonContainer>
            <Button type='submit'>
              {loading ? 'Cargando...' : 'INGRESA'}
            </Button>
          </ButtonContainer>
        </Form>
        
      </ContenedorForm>
    </Contenedor>
  );
}

export default Login;
