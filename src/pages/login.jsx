import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contenedor, ContenedorForm, LoginText, Titulo, Form, InputContainer, Input, ButtonContainer, Button} from '../style/login';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login, user, token, alumnoInfo } = useAuth();
    const navigate = useNavigate();
    const [Rut,setRut] = useState("");
    const [Password, setPassword] = useState("");

    const Auth = (e) => {
        e.preventDefault();
        login(Rut,Password);
    };

    useEffect (() => {
        if (user && user.userType === "alumno"){
            navigate('/estudiante');
        }
        else if (user && user.userType === "director"){
            navigate('/director');
        };
    }, [user,navigate,token,alumnoInfo]);

    return (
        <Contenedor>
            <Titulo>Sistema de Administracion de Incidencias</Titulo>
            <ContenedorForm>
                <LoginText>INICIO DE SESIÓN</LoginText>
                <Form onSubmit={Auth}>
                    <InputContainer>
                        <Input type='text' value={Rut} onChange={(e) => setRut(e.target.value)} placeholder='Rut'></Input>
                        <Input type='password' value={Password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña'></Input>
                    </InputContainer>
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


