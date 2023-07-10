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
    mutation.mutate(id);
  };

  return (
    <div style={divCard} key={post.id}>
      <Link to={`/detail/${post.id}`}>
        <p>{post.title}</p>
        <p>{post.body}</p>
        <p>{post.userName}</p>
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
