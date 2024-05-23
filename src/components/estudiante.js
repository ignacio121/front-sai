import React from 'react';
import styled from 'styled-components';

const Estudiante = ({ nombre, apellido, rut, email, foto, carrera }) => {
  return (
    <Estudiantes>
      <Informacion>
        <EstudianteFoto src={foto} alt={`${nombre} ${apellido}`} />
        <InformacionEstudiante>
          <Nombre>{`${nombre} ${apellido}`}</Nombre>
          <RutEmail>{`${rut}`}</RutEmail>
          <RutEmail>{`${email}`}</RutEmail>
          <Carrera>{`Regular en ${carrera}`}</Carrera>
        </InformacionEstudiante>
      </Informacion>
    </Estudiantes>
  );
};

export default Estudiante;

const Estudiantes = styled.div`
  background-color: #fff;
  width: 100%;
  margin-left:30%;
  border-radius: 10px;
`;

const Informacion = styled.div`
  display: flex;
  background-color: rgb(0, 85, 169);
  height: 170px;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
`;

const EstudianteFoto = styled.img`
  background-color: #fff;
  color: black;
  width: 120px;
  height: 160px;
  border-radius: 60%;
  object-fit: cover;
`;

const InformacionEstudiante = styled.div`
  margin-left: 20px;
  font-size: 14px;
`;

const Nombre = styled.h2`
  color: white;
  margin: 0;
`;

const RutEmail = styled.p`
  color: #cce5ff; /* Tono más claro para rut y email */
  margin: 5px 0;
`;

const Carrera = styled.p`
  color: white;
  margin: 5px 0;
`;
