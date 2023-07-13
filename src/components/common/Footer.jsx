import React from "react";
import { styled } from "styled-components";

const Footer = () => {
  return (
    <StFooter>
      <nav>
        <a href='https://sum-til.tistory.com/'>Blog</a> | <a href='https://github.com/suminute'>Github</a>
      </nav>
      <p>
        <span>suminute</span>
        <br />
        <span>이메일 : </span>
        <br />
        <span>Copyright 2023. suminute. All Rights Rederved</span>
      </p>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.footer`
  width: 100%;
  height: 110px;
  /* bottom: 0; */
  position: relative;
  /* transform: translateY(-100%); */
  left: 50px;
`;
