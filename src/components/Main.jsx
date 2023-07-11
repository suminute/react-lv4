import React, { useState } from "react";
import ButtonComp from "./common/ButtonComp";
import Write from "../Main/Write";
import Post from "../Main/Post";
import { useQuery } from "react-query";
import { getPosts } from "../api/posts";
import useModal from "../hooks/useModal";

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
    <>
      <div>
        <ButtonComp onClick={openModal}>글 작성하기</ButtonComp>
      </div>
      {isOpen && <Write closeModal={closeModal} />}
      <Post posts={data}></Post>
    </>
  );
};

export default Main;
