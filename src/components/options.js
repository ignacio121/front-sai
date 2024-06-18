import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';

import FAQComponent from './pf'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MdNote,
  MdHelp,
  MdEdit,
  MdTask,
  MdComputer,
  MdSchool,
  MdAssignment,
  MdDomain,
  MdDescription,
  MdPerson,
} from 'react-icons/md';
import ProgressBar from './barProgress';
import { useDispatch } from 'react-redux';
import { postIncidencia } from '../Redux/actions/incidenciasActions';
import IncidenciasPage from '../pages/personal/incidencias';

// Iconos por categoría
const iconsCategorias = {
  1: MdComputer,
  2: MdPerson,
  3: MdPerson,
  4: MdSchool,
  5: MdAssignment,
  6: MdDomain,
  7: MdDescription,
};

const Options = ({ categorias, categoriasHijo, destinatarios }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedDestinatario, setSelectedDestinatario] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [filteredHijos, setFilteredHijos] = useState([]);

  const textareaRef = useRef(null);

  const handleBlur = () => {
    setDescripcion(textareaRef.current.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      selectedFiles.forEach((fileObj) => URL.revokeObjectURL(fileObj.preview));
    };
  }, [selectedFiles]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openModalStateIncident = () => setShowModal4(true);
  const closeModalStateIncident = () => setShowModal4(false);
  const ModalContent = styled.div`
  padding: 20px;
`;

const InputFile = styled.input`
  display: none;
`;
const TabContent = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
`;

  const inputFileRef = useRef(null);

  const openFileInput = () => {
    inputFileRef.current.value = null; // Reiniciar el valor del input para permitir seleccionar el mismo archivo nuevamente
    inputFileRef.current.click();
  };
  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    const filesWithPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...filesWithPreview]);
  };
  const handleFileDelete = (preview) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((fileObj) => fileObj.preview !== preview)
    );
    URL.revokeObjectURL(preview); // Liberar la URL de objeto
  };
  const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
  const handleSubmit = () => {
    const data = {
      alumno_id: loginResponse.userId,
      categoriaincidencia_id: selected,
      descripcion,
      prioridad: selectedPriority,
      carrera_id: loginResponse.carrera_id,
      archivo: selectedFiles.map((fileObj) => fileObj.file),
      personal_id: selectedDestinatario.id,
    };
    console.log(data)
    dispatch(postIncidencia(data))
      .then(() => {
        // Si la solicitud es exitosa, muestra un SweetAlert de éxito
        swal('¡Incidencia enviada!', 'Tu incidencia ha sido enviada correctamente.', 'success');
        setShowModal(false);
        setSelected(null);
        setSelectedFiles([]);
        setSelectedPriority(null);
        setSelectedDestinatario(null);
        setDescripcion('');
        setActiveTab(1);
      })
      .catch((error) => {
        // Si hay un error, muestra un SweetAlert de error
        swal('Error', 'Ocurrió un error al enviar la incidencia. Por favor, intenta de nuevo.', 'error');
        console.error('Error al enviar la incidencia:', error);
      });
  };

  const handleSelectDestinatario = (destinatario) => {
    setSelectedDestinatario(destinatario);
  };

  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority);
  };

  const handleCategoryClick = (id) => {
    if (selected !== id) {
      setSelected(id);
      setShowNextButton(true);
      if (activeTab === 1) {
        const hijos = categoriasHijo.filter(categoria => categoria.categoriapadre_id === id);
        setFilteredHijos(hijos);
      }
    }
  };

  const handleNextButtonClick = () => {
    setActiveTab(activeTab + 1);
    setShowNextButton(false);
  };

  const handleButtonClick = (action) => console.log(`Realizando acción: ${action}`);

  const handleBackButtonClick = () => {
    setActiveTab(activeTab - 1);
  };

  
  const [mostrarFAQ, setMostrarFAQ] = useState(false);

  const handleMostrarFAQ = () => {
    setMostrarFAQ(!mostrarFAQ); 
  };

  return (
    <div>
      <Menu>
        <Incidencia color="#0063B3">
          <ButtonWrapper onClick={openModal}>
            <MdNote size={26} color="white" />
            <Text>Ingresar incidencia</Text>
          </ButtonWrapper>
        </Incidencia>

        <div>
      <Incidencia color="#0072C2"  onClick={handleMostrarFAQ}>
        <MdHelp size={26} color="white" style={{marginLeft:'3%'}}/>
        <span style={{marginLeft:'4%'}}>Preguntas frecuentes</span>
      </Incidencia>
      
      {mostrarFAQ && <FAQComponent />} {/* Renderiza FAQComponent si mostrarFAQ es true */}
    </div>
        <Incidencia color="#008ACB" onClick={() => handleButtonClick('foro_estudiantil')}>
          <MdEdit size={26} color="white" style={{marginLeft:'3%'}} />
          <Text>Foro estudiantil</Text>
        </Incidencia>

        <Incidencia color="#00A1E4" onClick={() => openModalStateIncident()}>
          <MdTask size={26} color="white" style={{marginLeft:'3%'}} />
          <Text>Estado Incidencias</Text>
        </Incidencia>
      </Menu>

      <Modal show={showModal} onClose={closeModal} title="Ingresar incidencia">
        <ProgressBar step={activeTab} />

        <TabContent active={activeTab === 1}>
          <ModalContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%' }}>
                {categorias.map((categoria) => {
                  const Icon = iconsCategorias[categoria.id];
                  return (
                    <Tarjeta
                      key={categoria.id}
                      selected={selected === categoria.id}
                      onClick={() => handleCategoryClick(categoria.id)}
                    >
                      {typeof Icon === 'function' ? (
                        <Icon
                          size={40}
                          style={{
                            marginTop: '10px',
                            marginLeft: '35%',
                            color: selected === categoria.id ? 'white' : 'rgb(0, 85, 169)',
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={Icon}
                          size="2x"
                          style={{
                            marginTop: '10px',
                            color: selected === categoria.id ? 'white' : 'rgb(0, 85, 169)',
                          }}
                        />
                      )}
                      <h1>{categoria.nombre}</h1>
                      <p>{categoria.descripcion}</p>
                    </Tarjeta>
                  );
                })}
              </div>
              {showNextButton && <Buttons1 onClick={handleNextButtonClick}>Siguiente</Buttons1>}
            </div>
          </ModalContent>
        </TabContent>

        <TabContent active={activeTab === 2}>
          <ModalContent>
            <h2 style={{ color: '#007bff' }}>¿Quién cree que puede resolver de mejor manera tu problemática?</h2>
            <div className="paso2_contenedor">
              {destinatarios
                .filter((destinatario) => destinatario.carrera_id === 1)
                .map((destinatario) => (
                  <PriorityButton
                    key={destinatario.id}
                    onClick={() => handleSelectDestinatario(destinatario)}
                    selected={selectedDestinatario === destinatario}
                  >
                    {destinatario.nombre}
                  </PriorityButton>
                ))}
            </div>
            <h2 style={{ color: '#007bff' }}>¿Qué prioridad le darías a tu problemática?</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <PriorityButton onClick={() => handlePriorityClick('Alta')} selected={selectedPriority === 'Alta'}>
                Alta
              </PriorityButton>
              <PriorityButton onClick={() => handlePriorityClick('Media')} selected={selectedPriority === 'Media'}>
                Media
              </PriorityButton>
              <PriorityButton onClick={() => handlePriorityClick('Baja')} selected={selectedPriority === 'Baja'}>
                Baja
              </PriorityButton>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <h2 style={{ color: '#007bff' }}>Especificanos más sobre que trata tu problemática</h2>
              <div style={{  justifyContent: 'space-between', flexWrap: 'wrap', width: '100%' }}>
                {filteredHijos.map((categoria) => (
                  <PriorityButton
                    key={categoria.id}
                    selected={selected === categoria.id}
                    onClick={() => handleCategoryClick(categoria.id)}
                  >
                    <p>{categoria.nombre}</p>
                  </PriorityButton>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Buttons1 onClick={handleBackButtonClick} style={{ marginRight: '10px', marginLeft: '30%' }}>
                Retroceder
              </Buttons1>
              <Buttons1 onClick={handleNextButtonClick} style={{ marginLeft: '5%' }}>
                Siguiente
              </Buttons1>
            </div>
          </ModalContent>
        </TabContent>

      
        <TabContent active={activeTab === 3}>
          <ModalContent>
            <h2 style={{ color: '#007bff' }}>Describe tu problemática</h2>


            
            <Textarea
              ref={textareaRef}
              rows="5"
              placeholder="Escribe aquí tu descripción..."
              defaultValue={descripcion}
              onBlur={handleBlur}
            />
            <Label htmlFor="inputFile" onClick={openFileInput}>
        Adjuntar archivos (No obligatorio)
      </Label>
      <InputFile
        type="file"
        id="inputFile"
        ref={inputFileRef}
        onChange={handleFileInputChange}
        multiple
      />
      {selectedFiles.length > 0 && (
        <FileList>
          {selectedFiles.map((fileObj, index) => (
            <FileListItem key={index}>
              <a href={fileObj.preview} target="_blank" rel="noopener noreferrer">{fileObj.file.name}</a>
              <Buttons1 style={{marginLeft:"2%"}} onClick={() => handleFileDelete(fileObj.preview)}>Eliminar</Buttons1>
            </FileListItem>
          ))}
        </FileList>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Buttons1 onClick={handleBackButtonClick} style={{ marginRight: '10px' }}>
                Retroceder
              </Buttons1>
              <Buttons1 onClick={handleSubmit} style={{ marginLeft: '5%' }}>
                Enviar
              </Buttons1>
            </div>
          </ModalContent>
        </TabContent>
      </Modal>
      <Modal show={showModal4} onClose={closeModalStateIncident} title="Estado de incidencias" styled={{width: '100px'}}>
        <IncidenciasPage></IncidenciasPage>
      </Modal>

    </div>
  );
};
export default Options;

  const FileList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 10px;
  `;

const FileListItem = styled.li`
  background-color: #f0f0f0;
  padding: 5px;
  margin-top: 5px;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const Menu = styled.div`
  margin-top: 3%;
  margin-left: 30%;
  width: 100%;
`;

const PriorityButton = styled.button`
  background-color: ${(props) => (props.selected ? '#007bff' : 'white')};
  color: ${(props) => (props.selected ? 'white' : '#007bff')};
  border: 2px solid #007bff;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => (props.selected ? '#0072C2' : '#0056b3')};
    color: white;
  }
`;

const Tarjeta = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 6px;
  flex: 1 1 30%;
  box-sizing: border-box;
  width: 100px;
  height: 170px;
  margin-left: 6px;
  background-color: ${(props) => (props.selected ? '#0072C2' : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'rgb(0, 85, 169)')};
  cursor: pointer;

  &:hover {
    background-color: #0072c2;
    color: white;
  }

  h1 {
    color: ${(props) => (props.selected ? 'white' : 'rgb(0, 85, 169)')};
  }

  p {
    color: ${(props) => (props.selected ? 'white' : 'rgb(0, 85, 169)')};
  }
`;

const Incidencia = styled.div`
  display: flex;
  width: 95%;
  align-items: center;
  color: white;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

const Buttons1 = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  margin-top: 20px;
  margin-right: 40%;
  align-self: flex-end;

  &:hover {
    background-color: #0056b3;
  }
`;


const Text = styled.p`
  margin-left: 20px;
`;

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: white;
  width: 100%;
  height: 100%;
`;

const Modal = ({ children, show, onClose, title }) => {
  return (
    <>
      {show && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <h3>{title}</h3>
              <BotonCerrar onClick={onClose}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="times"
                  className="svg-inline--fa fa-times fa-w-11"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 352 512"
                >
                  <path
                    fill="currentColor"
                    d="M50.844 125.844c-9.373-9.373-24.569-9.373-33.941 0s-9.373 24.569 0 33.941l246.06 246.06-246.06 246.06c-9.373 9.373-9.373 24.569 0 33.941s24.569 9.373 33.941 0l246.06-246.06 246.06 246.06c9.373 9.373 24.569 9.373 33.941 0l-246.06-246.06 246.06-246.06c9.373-9.373 9.373-24.569 0-33.941s-24.569-9.373-33.941 0l-246.06 246.06-246.06-246.06c-9.373-9.372-24.569-9.372-33.941 0z"
                  ></path>
                </svg>
              </BotonCerrar>
            </EncabezadoModal>
            <ContenidoModal>{children}</ContenidoModal>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.468);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const ContenedorModal = styled.div`
  width: auto;
  min-width: 50%;
  height: auto;
  max-height: 90%;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(141, 121, 121, 0.24) 0px 3px 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  box-sizing: border-box;
`;



    
const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  height: auto;
  padding: 10px 20px;
  background-color: rgb(0, 85, 169);
  width: 100%;
  box-sizing: border-box;

  h3 {
    font-weight: 500;
    font-size: 1.5em;
    margin: 0;
    flex-grow: 1;
    text-align: center;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  `;

const BotonCerrar = styled.button`
  position: absolute;
  top: 20px;
  right: 35px;
  color: white;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  font-weight: bold;

  &:hover {
    color: black;
    font-size: small;
    font-weight: bold;
  }

  svg {
    width: 100%;
    height: 100%;
    stroke-width: 2;
  }
  `;

    
    const ContenidoModal = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    `;
    
    export {
      Modal,
      Menu,
      Tarjeta,
      Incidencia,
      Text,
      ButtonWrapper,
      Overlay,
      ContenedorModal,
      EncabezadoModal,
      BotonCerrar,
      ContenidoModal
    };
  
