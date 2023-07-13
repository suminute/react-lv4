import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import { Link } from "react-router-dom";
import ButtonComp from "../common/ButtonComp";
import ModifyPost from "./ModifyPost";
import { useMutation, useQueryClient } from "react-query";
import { deletePost } from "../../api/posts";
import { useSelector } from "react-redux";
import { Card, CardActions, CardContent, Typography } from "@mui/material";

const PostItem = ({ posts, post }) => {
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
    <Card sx={{ maxWidth: 345, marginBottom: "50px" }}>
      <CardContent>
        <Link to={`/detail/${post.id}`}>
          <Typography gutterBottom variant='h5' component='div' marginBottom={"10px"} noWrap={true}>
            {post.body}
          </Typography>
          <div>
            <Typography variant='body2' color='text.secondary'>
              작성자
            </Typography>
            <Typography marginBottom={"10px"}>{post.userName}</Typography>
          </div>
          <div>
            <Typography variant='body2' color='text.secondary'>
              소모한 칼로리
            </Typography>
            <Typography marginBottom={"10px"}>{post.kcal} kcal</Typography>
          </div>
          <div>
            <Typography variant='body2' color='text.secondary'>
              운동 시간
            </Typography>
            <Typography marginBottom={"10px"}>{post.exerciseHour} 분</Typography>
          </div>
          <Typography>{post.date}</Typography>
        </Link>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
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
      </CardActions>
    </Card>
  );
};

export default PostItem;
