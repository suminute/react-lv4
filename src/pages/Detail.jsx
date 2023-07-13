import React from "react";

import { styled } from "styled-components";
import DetailPost from "../components/Detail/DetailPost";
import Header from "../components/common/Header";

const Detail = () => {
  return (
    <>
      <Header />
      <StDiv>
        <DetailPost></DetailPost>
      </StDiv>
    </>
  );
};

export default Detail;

const StDiv = styled.div`
  min-height: 84vh;
  position: relative;
  width: 100%;
`;
