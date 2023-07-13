import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { deletePost, getPosts } from "../../api/posts";
import ButtonComp from "../common/ButtonComp";
import { Card, CardContent, Typography, TextField, CardActions } from "@mui/material";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import useModal from "./../../hooks/useModal";
import ModifyPost from "./../Main/ModifyPost";
import { useNavigate } from "react-router-dom";
import DetailComment from "./DetailComment";

const DetailPost = () => {
  const { id } = useParams();
  const { isLoading, isError, data } = useQuery("posts", getPosts);
  const [posts, setPosts] = useState(data);
  const detailPost = data?.find((post) => post.id === id);

  const { user } = useSelector((state) => state.user);
  const [isOpen, openModal, closeModal] = useModal();

  const queryClient = useQueryClient();
  const mutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>오류 발생...</div>;
  }

  const onClickDeleteButtonHandler = (id) => {
    const post = posts.find((post) => post.id === id);
    const deletedPost = { ...post, isDeleted: true };
    const deleteConfirm = window.confirm("삭제하시겠습니까?");
    if (deleteConfirm) {
      mutation.mutate({ id, deletedPost });
      alert("삭제 되었습니다!");
      navigate("/");
    } else {
      return false;
    }
  };

  return (
    <StDiv>
      <Card sx={{ width: "500px", height: "800px", marginBottom: "50px" }}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div' marginBottom={"10px"} noWrap={false}>
            {detailPost.body}
          </Typography>
          <div>
            <Typography variant='body2' color='text.secondary'>
              작성자
            </Typography>
            <Typography marginBottom={"10px"}>{detailPost.userName}</Typography>
          </div>
          <div>
            <Typography variant='body2' color='text.secondary'>
              소모한 칼로리
            </Typography>
            <Typography marginBottom={"10px"}>{detailPost.kcal} kcal</Typography>
          </div>
          <div>
            <Typography variant='body2' color='text.secondary'>
              운동 시간
            </Typography>
            <Typography marginBottom={"10px"}>{detailPost.exerciseHour} 분</Typography>
          </div>
          <Typography>{detailPost.date}</Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          {user ? user.userId === detailPost.userId && <ButtonComp onClick={openModal}>수정</ButtonComp> : null}
          {isOpen && <ModifyPost posts={posts} post={detailPost} id={detailPost.id} closeModal={closeModal} />}
          {user
            ? user.userId === detailPost.userId && (
                <ButtonComp
                  onClick={() => {
                    onClickDeleteButtonHandler(detailPost.id);
                  }}>
                  삭제
                </ButtonComp>
              )
            : null}
        </CardActions>
        <DetailComment id={id}></DetailComment>
      </Card>
    </StDiv>
  );
};

export default DetailPost;

const StDiv = styled.div`
  min-height: 85vh;
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
