import { CardContent, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonComp from "../common/ButtonComp";
import useInput from "../../hooks/useInput";
import { useSelector } from "react-redux";
import { addComment, deleteComment, getComments } from "../../api/comments";
import { useMutation, useQuery, useQueryClient } from "react-query";
import shortid from "shortid";
import { styled } from "styled-components";

const DetailComment = ({ id }) => {
  const { isLoading, isError, data } = useQuery("comments", getComments);
  const [comment, onChangeCommentHandler, setComment] = useInput("");
  const { user } = useSelector((state) => state.user);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (user) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, []);

  const queryClient = useQueryClient();
  const mutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });
  const deletemutaion = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });

  const newComment = {
    id: shortid.generate(),
    postId: id,
    userId: user.userId,
    userName: user.displayName,
    body: comment,
    currentTime: Math.floor(new Date() / 1000),
    isDeleted: false,
  };

  const onSubitButtonHandler = (e) => {
    e.preventDefault();
    mutation.mutate(newComment);
    setComment("");
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  const onDeleteButtonHandler = (id) => {
    const comment = data.find((comment) => comment.id === id);
    const deletedComment = { ...comment, isDeleted: true };
    const deleteConfirm = window.confirm("삭제하시겠습니까?");
    if (deleteConfirm) {
      deletemutaion.mutate({ id, deletedComment });
      alert("삭제 되었습니다!");
    } else {
      return false;
    }
  };

  return (
    <>
      <form>
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          {user ? (
            <TextField
              id='standard-password-input'
              label='댓글을 작성하세요'
              autoComplete='current-password'
              variant='standard'
              value={comment}
              onChange={onChangeCommentHandler}
              sx={{ width: "300px" }}
            />
          ) : (
            <TextField id='standard-password-input' label='로그인 후 이용 가능합니다' autoComplete='current-password' variant='standard' disabled={disabled} sx={{ width: "300px" }} />
          )}
          <ButtonComp type={"submit"} onClick={onSubitButtonHandler} disabled={disabled}>
            저장
          </ButtonComp>
        </CardContent>
      </form>
      <CardContent sx={{ overflow: "scroll", height: "400px", paddingBottom: "50px" }}>
        {data
          ?.sort((a, b) => b.currentTime - a.currentTime)
          .filter((comment) => comment.isDeleted === false)
          ?.filter((comment) => id === comment.postId)
          .map((comment) => {
            return (
              <StDiv key={comment.id}>
                <Typography sx={{ minWidth: "75px" }}>{comment.userName}</Typography>
                <Typography align='left' sx={{ width: "350px" }}>
                  {comment.body}
                </Typography>
                {user ? user.userId === comment.userId && <ButtonComp onClick={() => onDeleteButtonHandler(comment.id)}>X</ButtonComp> : null}
              </StDiv>
            );
          })}
      </CardContent>
    </>
  );
};

export default DetailComment;

const StDiv = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  min-height: 40.75px;
`;
