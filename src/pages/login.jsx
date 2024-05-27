import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../Redux/actions/authActions';
import {
  Contenedor,
  ContenedorForm,
  LoginText,
  Titulo,
  Form,
  InputContainer,
  Input,
  ButtonContainer,
  Button,
  StyledButton,
} from '../style/login.style.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error, sesion } = useSelector((state) => state.auth) || {};

  const [Rut, setRut] = useState('');
  const [Password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    dispatch(login(Rut, Password));
  };

  useEffect(() => {
    if (isAuthenticated && sesion) {
      if (sesion.userType === "alumno") {
        navigate('/estudiante');
      } else if (sesion.userType === "personal") {
        navigate('/personal');
      }
    }
  }, [isAuthenticated, sesion, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Contenedor>
      <Titulo>Sistema de Administración de Incidencias</Titulo>
      <ContenedorForm>
        <LoginText>INICIO DE SESIÓN</LoginText>
        <Form onSubmit={handleAuth}>
          <InputContainer>
            <Input
              type='text'
              value={Rut}
              onChange={(e) => setRut(e.target.value)}
              placeholder='Rut'
            />
            <Input
              type={showPassword ? 'text' : 'password'}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña'
            />
            <StyledButton type="button" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </StyledButton>
          </InputContainer>
          <ButtonContainer>
            <Button type='submit'>
              {loading ? 'Cargando...' : 'INGRESA'}
            </Button>
          </ButtonContainer>
        </Form>
        {error && typeof error === 'string' && (
          <p style={{ color: 'red' }}>{error}</p>
        )}
      </ContenedorForm>
    </Contenedor>
  );
}

export default Login;
