// ForoEstudiante.js

import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddPostForo, getPostForo, GetRespuestasPost, AddRespuestaPost } from '../Redux/actions/ForoActions';
import LoaderComponent from './loader';
import styled from 'styled-components';
import { FaUserSecret } from "react-icons/fa";
import Switch from './Switch';

const ForoEstudiante = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, sesion } = useSelector((state) => state.auth);
    const { data: postsForo, loading, dataRespuestas: RespuestasPost, loadingRespuestas } = useSelector((state) => state.foro);

    const [selectAgregarPost, setSelectAgregarPost] = useState(false);
    const [selectAgregarRespuesta, setSelectAgregarRespuesta] = useState(false);
    const [selectPost, setSelectPost] = useState({post: null, selected: false});
    const [formData, setFormData] = useState({
        pregunta: '',
        contenido: '',
        archivo: null,
        esAnonimo: false
    });

    const getRespuestasForo = (post) => {
        dispatch(GetRespuestasPost(post.id));
        setSelectPost({post: post, selected: true});
    };

    const handleButtonAgregate = () => {
        setSelectAgregarPost(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { pregunta, contenido, archivo, esAnonimo } = formData;

        dispatch(AddPostForo(sesion.userId, pregunta, contenido, archivo, esAnonimo));
        setSelectAgregarPost(false);
    };

    const handleRespuestaSubmit = (e) => {
        e.preventDefault();
        const { contenido } = formData;

        if (!selectPost.post) {
            return; // Manejo de error si no hay post seleccionado
        }

        dispatch(AddRespuestaPost(selectPost.post.id, sesion.userId, contenido));
        setFormData({
            pregunta: '',
            contenido: '',
            archivo: null,
            esAnonimo: false
        });
        setSelectAgregarRespuesta(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            archivo: file
        });
    };

    const handleSwitchChange = (isChecked) => {
        setFormData(prevState => ({
            ...prevState,
            esAnonimo: isChecked,
        }));
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            dispatch(getPostForo());
        }
    }, [token, navigate, dispatch]);

    return (
        <>
            {!loading && postsForo ? (
                !selectAgregarPost ? (
                    <ContenedorPosts>
                        {!selectPost.selected && <Button onClick={() => handleButtonAgregate()}>Agregar +</Button>}
                        {selectPost.selected && <ButtonContainer>
                            <Button onClick={() => setSelectAgregarRespuesta(true)}>
                                Agregar respuesta
                            </Button>
                            <Button onClick={()=>setSelectPost({...selectPost, selected: false})}>
                                Volver
                            </Button>
                        </ButtonContainer>}
                        {!selectPost.selected ? (
                            postsForo.map((post, index) => (
                                <ItemPost key={index} onClick={() => getRespuestasForo(post)}>
                                    <Header>
                                        <AutorInfo>
                                            {post.alumno.nombre === 'Anónimo' ? <FaUserSecret size={50} color='#1e98d7' /> : <FotoEstudiante src={post.foto} alt={`${post.alumno.nombre} ${post.alumno.apellido}`} />}
                                            <NombreAutor>{post.alumno.nombre} {post.alumno.apellido}</NombreAutor>
                                        </AutorInfo>
                                        <Fecha>{new Date(post.fechacreacion).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' })}</Fecha>
                                    </Header>
                                    <Contenido>
                                        <Pregunta>{post.pregunta}</Pregunta>
                                    </Contenido>
                                </ItemPost>
                            ))
                        ):(
                            <>
                            <ItemPost>
                                <Header>
                                    <AutorInfo>
                                        {selectPost.post.alumno.nombre === 'Anónimo' ? <FaUserSecret size={50} color='#1e98d7' /> : <FotoEstudiante src={selectPost.post.foto} alt={`${selectPost.post.alumno.nombre} ${selectPost.post.alumno.apellido}`} />}
                                        <NombreAutor>{selectPost.post.alumno.nombre} {selectPost.post.alumno.apellido}</NombreAutor>
                                    </AutorInfo>
                                    <Fecha>{new Date(selectPost.post.fechacreacion).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' })}</Fecha>
                                </Header>
                                <Contenido>
                                    <Pregunta>{selectPost.post.pregunta}</Pregunta>
                                    <Contenido>{selectPost.post.contenido}</Contenido>
                                </Contenido>
                            </ItemPost>
                            {selectAgregarRespuesta && (
                                <Form onSubmit={handleRespuestaSubmit}>
                                    <InputContainer>
                                        <Input
                                            type="textarea"
                                            name="contenido"
                                            value={formData.contenido}
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputLabel htmlFor="contenido">Escribe tu respuesta</InputLabel>
                                    </InputContainer>
                                    <ButtonContainer>
                                        <Button onClick={() => setSelectAgregarRespuesta(false)}>
                                            Cancelar
                                        </Button>
                                        <Button type="submit">
                                            Enviar respuesta
                                        </Button>
                                    </ButtonContainer>
                                </Form>
                            )}
                            <Pregunta>Respuestas:</Pregunta>
                            {!loadingRespuestas ? (
                                RespuestasPost.length === 0 ? (
                                    <SinRespuestas>No hay respuestas</SinRespuestas>
                                ) : (
                                    RespuestasPost.map((respuesta, index) => (
                                        
                                        <ItemPost key={index}>
                                            <Header>
                                                <AutorInfo>
                                                    {respuesta.alumno.nombre === 'Anónimo' ? <FaUserSecret size={50} color='#1e98d7' /> : <FotoEstudiante src={respuesta.foto} alt={`${respuesta.alumno.nombre} ${respuesta.alumno.apellido}`} />}
                                                    <NombreAutor>{respuesta.alumno.nombre} {respuesta.alumno.apellido}</NombreAutor>
                                                </AutorInfo>
                                                <Fecha>{new Date(respuesta.fechacreacion).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' })}</Fecha>
                                            </Header>                                        
                                            <Contenido>{respuesta.contenido}</Contenido>
                                        </ItemPost>
                                        
                                    ))
                                )
                            ):(
                                <LoaderComponent />  
                            )}
                            
                            </>
                        )}
                        
                    </ContenedorPosts>
                ) : (
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
                                name="contenido"
                                value={formData.contenido}
                                onChange={handleChange}
                            />
                            <InputLabel htmlFor="contenido">Contenido</InputLabel>
                        </InputContainer>
                        <InputContainer>
                            <Input
                                type="file"
                                name="archivo"
                                onChange={handleFileChange}
                            />
                            <InputLabel htmlFor="archivo">Archivo</InputLabel>
                        </InputContainer>
                        <SwitchContainer>
                            ¿Quiere subir este foro como anónimo?
                            <Switch checked={formData.esAnonimo} onChange={(isChecked) => handleSwitchChange(isChecked)} />
                        </SwitchContainer>
                        <ButtonContainer>
                            <Button onClick={()=>setSelectAgregarPost(false)}>
                                Volver
                            </Button>
                            <Button type="submit">
                                Agregar
                            </Button>
                        </ButtonContainer>
                    </Form>
                )
            ) : (
                <LoaderComponent />
            )}
        </>
    );
};

export default ForoEstudiante;

const ContenedorPosts = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    padding: 20px;
    position: relative;
`;

const ItemPost = styled.div`
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 8px 0px #afafaf;
    width: 100%;
    margin-bottom: 10px;
    padding: 20px;
    background-color: #f9f9f9;
    cursor: pointer;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const AutorInfo = styled.div`
    display: flex;
    align-items: center;
`;

const NombreAutor = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 15px;
    font-family: "Bahnschrift", sans-serif;
    color: #1e98d7;
`;

const Pregunta = styled.p`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-family: "Bahnschrift", sans-serif;
    color: #1e98d7;
`;

const Contenido = styled.p`
    font-size: 1rem;
    margin-bottom: 10px;
    font-family: "Bahnschrift", sans-serif;
    color: #1e98d7;
`;

const Fecha = styled.p`
    font-size: 0.9rem;
    font-family: "Bahnschrift", sans-serif;
    color: #1e98d7;
`;

const FotoEstudiante = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 10px;
    margin-top: 10px;
`;


const Button = styled.button`
  width: auto;
  max-width: 30%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  font-family: "Bahnschrift", sans-serif;
  cursor: pointer;
  background-color: rgb(0, 85, 169);
  margin-bottom: 10px;
  &:hover {
    opacity: 0.8;
    box-shadow: 0px 0px 11px 0px rgb(0, 85, 169), inset 0px 0px 4px 2px rgba(255, 255, 255, 0.35);
    box-sizing: border-box;
    
  }
  & + & {
    margin-left: 10px; /* Agrega margen solo entre botones adyacentes */
  }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-top: 15px;
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
    font-size: 16px;
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

const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
  color: #1e98d7;
  font-family: "Bahnschrift", sans-serif;
`;

const SinRespuestas = styled.p`
    font-size: 1.2rem;
    margin-top: 10px;
    font-family: "Bahnschrift", sans-serif;
    color: #999;
`;
