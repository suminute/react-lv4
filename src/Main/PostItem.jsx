import React, { useState } from "react";
import useModal from "../hooks/useModal";
import { Link } from "react-router-dom";
import ButtonComp from "../components/common/ButtonComp";
import ModifyPost from "./ModifyPost";
import { useMutation, useQueryClient } from "react-query";
import { deletePost } from "../api/posts";
import { useSelector } from "react-redux";

const PostItem = ({ posts, post }) => {
  const divCard = { border: "1px solid black", padding: "10px", margin: "10px" };
  const { user } = useSelector((state) => state.user);

  const [isOpen, openModal, closeModal] = useModal();

  const queryClient = useQueryClient();
  const mutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const onClickDeleteButtonHandler = (id) => {
    const post = posts.find((post) => post.id === id);
    const deletedPost = { ...post, isDeleted: true };
    const deleteConfirm = window.confirm("삭제하시겠습니까?");
    if (deleteConfirm) {
      mutation.mutate({ id, deletedPost });
      alert("삭제 되었습니다!");
    } else {
      return false;
    }
  };

  return (
    <div style={divCard}>
      <Link to={`/detail/${post.id}`}>
        <p>작성자 : {post.userName}</p>
        <p>{post.body}</p>
        <p>{post.kcal} kcal</p>
        <p>{post.exerciseHour} 분</p>
        <p>{post.date}</p>
      </Link>
      {user ? user === post.userId && <ButtonComp onClick={openModal}>수정</ButtonComp> : null}
      {isOpen && <ModifyPost posts={posts} post={post} id={post.id} closeModal={closeModal} />}
      {user
        ? user === post.userId && (
            <ButtonComp
              onClick={() => {
                onClickDeleteButtonHandler(post.id);
              }}>
              삭제
            </ButtonComp>
          )
        : null}
    </div>
  );
};

export default PostItem;
