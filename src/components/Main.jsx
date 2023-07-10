import React, { useState } from "react";
import Button from "./common/Button";
import Write from "../Main/Write";
import Post from "../Main/Post";
import { useQuery } from "react-query";
import { getPosts } from "../api/posts";

const Main = () => {
  const getToday = () => {
    const today = new Date();
    const year = ("0" + today.getFullYear()).slice(-2);
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const date = ("0" + today.getDate()).slice(-2);
    const hours = ("0" + today.getHours()).slice(-2);
    const minutes = ("0" + today.getMinutes()).slice(-2);
    return `${year}-${month}-${date} ${hours}:${minutes}`;
  };

  const { isLoading, isError, data } = useQuery("posts", getPosts);
  const [posts, setPosts] = useState(data);
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>오류 발생...</div>;
  }

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div>
        <Button onClick={openModal}>글 작성하기</Button>
      </div>
      {isOpen && <Write setIsOpen={setIsOpen} setPosts={setPosts} getToday={getToday} posts={posts} />}
      <Post posts={data} setPosts={setPosts}></Post>
    </>
  );
};

export default Main;
