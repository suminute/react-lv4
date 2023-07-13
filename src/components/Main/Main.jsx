import React, { useState } from "react";
import ButtonComp from "../common/ButtonComp";
import Write from "./Write";
import Post from "./Post";
import { useQuery } from "react-query";
import { getPosts } from "../../api/posts";
import useModal from "../../hooks/useModal";
import { styled } from "styled-components";
import { Typography } from "@mui/material";

const Main = () => {
  const { isLoading, isError, data } = useQuery("posts", getPosts);
  const [posts, setPosts] = useState(data);
  const [isOpen, openModal, closeModal] = useModal();

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>오류 발생...</div>;
  }

  return (
    <StMain>
      <StDiv>
        <StBox>
          <Typography variant='h3' sx={{ color: "white", marginBottom: "50px" }}>
            운동으로 소통하며 활기찬 삶을 만나보세요!🔥
          </Typography>
          <ButtonComp onClick={openModal}>글 작성하기</ButtonComp>
        </StBox>
        {isOpen && <Write closeModal={closeModal} />}
        <Post posts={data}></Post>
      </StDiv>
    </StMain>
  );
};

export default Main;

const StMain = styled.main`
  min-height: 100%;
  position: relative;
  width: 100%;
`;

const StDiv = styled.div`
  padding-bottom: 110px;
`;

const StBox = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://github.com/suminute/react-lv4/assets/92218638/e463a469-0f70-47a5-9225-06adc6782e43");
  background-size: cover;
  background-position: center;
  margin-bottom: 110px;
`;
