import styled from 'styled-components';

export const Barra = styled.div`
    background-color: rgb(0, 85, 169);
    display: flex; 
    justify-content: center; 
`;

export const Image_text_container = styled.div`
    display: flex;
    align-items: center; 
`;

export const Escudo = styled.div`
    width: 100%;
    margin-left: 5%;
    margin-right: 1%; 
`;

export const Background_image = styled.div`
    background-image: url('../images/logo_ucm_white.png');
`;

export const Titulo = styled.h1`
    color: white;
    margin-left: 2%;
    font-size: x-large;
`;

export const ContenedorForm = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 70%;
    width: 35vw;
    background: #ffffff;  
    box-shadow: 0 0 0 0.1rem ;
    backdrop-filter: blur(8.5);
    border-radius: 20px;
    color: black;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
`;

export const LoginText = styled.h2`
    margin: 3rem 0 2rem 0;
    color: #1e98d7;
    font-size: 30px;
    position: absolute;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items:center;
    justify-content: center;
`;

export const Input = styled.input`
    background : rgba(255,255,255,0.15);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 255, 0.59);
    border-radius: 15px;
    width: 60%;
    height: 10vh;
    padding: 1rem;
    border: none;
    outline: none;
    color: #1e98d7;
    font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
    margin-bottom: 6vh;
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

export const ButtonContainer = styled.div`
    margin: 1rem 0 2rem 0 ;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Button = styled.button`
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
