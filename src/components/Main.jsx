import React, { useState } from "react";
import Button from "./common/Button";
import Write from "../Main/Write";
import shortid from "shortid";
import Post from "../Main/Post";

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

  const [posts, setPosts] = useState([
    {
      postId: shortid.generate(),
      title: "제목1",
      body: "내용1",
      userName: "몽식1",
      date: getToday(),
      kcal: "100",
      exerciseHour: "30",
      isDeleted: false,
    },
    {
      postId: shortid.generate(),
      title: "제목2",
      body: "내용2",
      userName: "몽식2",
      date: getToday(),
      kcal: "100",
      exerciseHour: "30",
      isDeleted: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div>
        <Button onClick={openModal}>글 작성하기</Button>
      </div>
      {isOpen && <Write setIsOpen={setIsOpen} setPosts={setPosts} getToday={getToday} posts={posts} />}
      <Post posts={posts}></Post>
    </>
  );
};

export default Main;
