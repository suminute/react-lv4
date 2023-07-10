import React, { useState } from "react";
import Button from "./common/Button";
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
        <Button onClick={openModal}>글 작성하기</Button>
      </div>
      {isOpen && <Write closeModal={closeModal} />}
      <Post posts={data}></Post>
    </>
  );
};

export default Main;
