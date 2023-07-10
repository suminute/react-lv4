import React from "react";
import { styled } from "styled-components";

const Modal = ({ children }) => {
  return (
    <ModalContainer>
      <ModalInner>{children}</ModalInner>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
`;

const ModalInner = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  /* max-width: 500px; */
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  /* overflow-y: auto; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
