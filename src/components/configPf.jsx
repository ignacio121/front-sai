import React, { useState } from 'react';
import { RxGear, RxPlus, RxPencil2, RxTrash } from "react-icons/rx";
import styled, { keyframes } from 'styled-components';

const ConfigPF = ({ onAddClick, onEditClick, onDeleteClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <ConfigBox>
            <MainConfig onClick={toggleVisibility}><RxGear /></MainConfig>
            <ContainerSelect isVisible={isVisible}>
                <AddFAQ onClick={onAddClick}><RxPlus /></AddFAQ>
                <EditFAQ onClick={onEditClick}><RxPencil2 /></EditFAQ>
                <DeleteFAQ onClick={onDeleteClick}><RxTrash /></DeleteFAQ>
            </ContainerSelect>
        </ConfigBox>
    );
}

export default ConfigPF;

const ConfigBox = styled.div`
    position: absolute;
    top: 100px;
    right: 40px;
    display: flex;
    align-items: center;
`;

const MainConfig = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 255, 0.39);
    border: 2px solid #1e98d7;
    padding: 7px;
    color: #1e98d7;
    border-radius: 50%;
    cursor: pointer;
    background-color: white;
    z-index: 2; /* Asegura que esté sobre ContainerSelect */
`;

const slideIn = keyframes`
    from {
        transform: translateX(50px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const slideOut = keyframes`
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(50px);
        opacity: 0;
    }
`;

const ContainerSelect = styled.div`
    display: ${props => (props.isVisible ? 'flex' : 'none')};
    align-items: center;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 255, 0.39);
    border: 2px solid #1e98d7;
    padding: 4px;
    border-radius: 7px;
    position: absolute;
    left: -115px;
    animation: ${props => (props.isVisible ? slideIn : slideOut)} 0.3s forwards;
    z-index: 1;
    background-color: white;
`;

const AddFAQ = styled.div`
    display: flex;
    color: #4cff38;
    font-size: 35px;
    align-items: center;
    cursor: pointer;
    margin-right: 2px;
`;

const EditFAQ = styled.div`
    display: flex;
    color: #afafaf;
    font-size: 35px;
    align-items: center;
    cursor: pointer;
    margin-right: 3px;
`;

const DeleteFAQ = styled.div`
    display: flex;
    color: #ff1515;
    font-size: 35px;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
`;
