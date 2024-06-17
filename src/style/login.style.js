import styled from 'styled-components';

export const Contenedor = styled.div`
  margin: 0;
  padding: 0;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Titulo = styled.h1`
    box-sizing: border-box;
    font-weight: 700;
    color: #ffffff;
    text-align: left;
    line-height: normal;
    position: absolute;
    top: 30px;
`;

export const ContenedorForm = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70%;
  width: 35vw;
  min-width: 400px;
  background: #ffffff;
  box-shadow: 0 0 0 0.1rem;
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
  align-items: center;
  justify-content: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30%;
  width: 100%;
  margin-top: 10vh;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  height: 10vh;
  position: relative;
  margin-bottom: 6vh;
`;

export const Input = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 255, 0.59);
  border-radius: 15px;
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => (props.error ? 'red' : '#1e98d7')};
  outline: none;
  color: ${props => (props.error ? 'red' : '#1e98d7')};
  font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.1rem ${props => (props.error ? 'red' : '#1e98d7')};
    backdrop-filter: blur(12);
  }
  &::placeholder {
    color: ${props => (props.error ? 'red' : '#1e98d7')};
    font-family: "Bahnschrift Light", "Bahnschrift", sans-serif;
  }
`;

export const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
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
    box-shadow: 0px 0px 11px 0px rgba(0, 0, 255, 0.59),
      inset 0px 0px 4px 3px rgba(255, 255, 255, 0.35);
  }
`;

export const Error = styled.h1`
  position: absolute;
  font-size: 12px;
  color: red;
  margin-bottom: 30vh;
  font-family: "Bahnschrift Bold", "Bahnschrift", sans-serif;
  display: ${props => (props.error ? 'block' : 'none')};
`;

export const StyledButton = styled.button`
  position: absolute;
  right: 10px; 
  background: none;
  border: none;
  cursor: pointer;
  color: #1e98d7;
  font-size: 18px;
  &:hover {
    color: #0a4e8e;
  }
`;
