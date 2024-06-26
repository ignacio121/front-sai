import styled, { keyframes, css } from 'styled-components';

export const TopNavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  background-color: #1e98d7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Bahnschrift Bold", "Bahnschrift", sans-serif;
  z-index: 1;
`;

export const SideNavBar = styled.div`
  position: fixed;
  top: 65px;
  left: 0;
  width: 250px;
  background-color: #1e98d7;
  color: white;
  height: calc(100%);
  box-sizing: border-box;
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  height: 50px;
  background-color: #1e98d7;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.58);
  font-family: "Bahnschrift Bold", "Bahnschrift", sans-serif;
  cursor: pointer;

  ${props =>
    props.isSelected &&
    css`
      box-sizing: border-box;
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 255, 0.59),
        inset 0px 0px 4px 0px rgba(255, 255, 255, 0.35);
      background-color: #2886b5;
    `}

  &:hover {
    box-sizing: border-box;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 255, 0.59),
      inset 0px 0px 4px 0px rgba(255, 255, 255, 0.35);
    background-color: #2886b5;
  }
`;

export const expand = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
  }
`;

export const collapse = keyframes`
  from {
    max-height: 1000px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
`;

export const Dropdown = styled.div`
  max-height: ${props => (props.visible ? '1000px' : '0')};
  overflow: hidden;
  opacity: ${props => (props.visible ? '1' : '0')};
  animation: ${props => (props.visible ? expand : collapse)} 0.3s ease-out;
  padding-left: 10px;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  background-color: #2886b5;
`;

export const Content = styled.div`
  padding: 20px;
  padding-top: 85px;
  overflow: auto;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 1);
  height: calc(100vh - 105px);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-left: 250px;
`;