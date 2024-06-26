import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../Redux/actions/authActions';
import { Contenedor, ContenedorForm, LoginText, Titulo, Form, InputContainer, Input, ButtonContainer, Button, Error, StyledButton, Container } from '../style/login.style.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import { getIncidencias } from '../Redux/actions/incidenciasActions.js';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error, sesion } = useSelector((state) => state.auth);

  const [Rut, setRut] = useState('');
  const [Password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState({ message: '', state: false });

  const handleAuth = (e) => {
    e.preventDefault();
    if (!(/^\d{8}$/).test(Rut)) {
      setAuthError({ message: 'Por favor ingresa un rut válido', state: true });
    } else {
      dispatch(login(Rut, Password));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (sesion?.userType === 'alumno') {
        navigate('/estudiante');
      } else if (sesion?.userType === 'personal') {
        navigate('/personal');
        dispatch(getIncidencias(sesion.userId, sesion.userType));
      }
    }
    if (error && error.message) {
      setAuthError({ message: error.message, state: true });
    } else if (!error) {
      setAuthError({ message: '', state: false });
    }
  }, [isAuthenticated, sesion, navigate, dispatch, error]);

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
            {authError.state && <Error error={authError.state.toString()} style={{ color: 'red' }}>{authError.message}</Error>}
            <Container>
              <Input type="text" value={Rut} onChange={(e) => setRut(e.target.value)} placeholder="Rut" error={authError.state} />
            </Container>
            <Container>
              <Input type={showPassword ? 'text' : 'password'} value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" error={authError.state} />
              <StyledButton type="button" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </StyledButton>
            </Container>
          </InputContainer>
          <ButtonContainer>
            <Button type="submit">
              {loading ? 'Cargando...' : 'INGRESA'}
            </Button>
          </ButtonContainer>
        </Form>
      </ContenedorForm>
    </Contenedor>
  );
}

export default Login;
