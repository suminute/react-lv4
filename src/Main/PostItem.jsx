import React from "react";
import useModal from "../hooks/useModal";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import ModifyPost from "./ModifyPost";
import { useMutation, useQueryClient } from "react-query";
import { deletePost } from "../api/posts";

const PostItem = ({ posts, post }) => {
  const divCard = { border: "1px solid black", padding: "10px", margin: "10px" };

  const [isOpen, openModal, closeModal] = useModal();

  const queryClient = useQueryClient();
  const mutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const onClickDeleteButtonHandler = (id) => {
    const deletedPost = posts.find((post) => post.id === id);
    const confirmPassword = window.prompt("비밀번호를 입력하세요");
    if (deletedPost.password === confirmPassword) {
      mutation.mutate(id);
      alert("삭제 되었습니다!");
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
  };

  return (
    <div style={divCard}>
      <Link to={`/detail/${post.id}`}>
        <p>{post.userName}</p>
        <p>{post.body}</p>
        <p>{post.kcal}</p>
        <p>{post.exerciseHour}</p>
        <p>{post.date}</p>
      </Link>
      <Button onClick={openModal}>수정</Button>
      {isOpen && <ModifyPost posts={posts} post={post} id={post.id} closeModal={closeModal} />}
      <Button
        onClick={() => {
          onClickDeleteButtonHandler(post.id);
        }}>
        삭제
      </Button>
    </div>
  );
};

export default PostItem;
