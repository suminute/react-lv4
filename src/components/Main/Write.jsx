import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import ButtonComp from "../common/ButtonComp";
import shortid from "shortid";
import { useMutation, useQueryClient } from "react-query";
import { addPost } from "../../api/posts";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import TransitionsModal from "../common/TrasitionModal";
import { styled } from "styled-components";
import { Box, TextField, Typography } from "@mui/material";

const Write = ({ closeModal }) => {
  const [body, onChangeBodyHandler] = useInput("");
  const [kcal, onChangeKcalHandler] = useInput("");
  const [exerciseHour, onChangeExerciseHourHandler] = useInput("");
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const getToday = () => {
    const today = new Date();
    const year = ("0" + today.getFullYear()).slice(-2);
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const date = ("0" + today.getDate()).slice(-2);
    const hours = ("0" + today.getHours()).slice(-2);
    const minutes = ("0" + today.getMinutes()).slice(-2);
    return `${year}-${month}-${date} ${hours}:${minutes}`;
  };

  const newPost = {
    id: shortid.generate(),
    body,
    userName: user ? user.displayName : "",
    userId: user ? user.uid : "",
    date: getToday(),
    currentTime: Math.floor(new Date() / 1000),
    kcal,
    exerciseHour,
    isDeleted: false,
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(newPost);
    closeModal();
  };

  const navigateLogin = () => {
    closeModal();
    navigate("/login");
  };
  return user ? (
    <Box>
      <TransitionsModal>
        <form>
          <div>
            <TextField
              error={body.length < 5 ? true : false}
              id='standard-error-helper-text'
              label='내용'
              value={body}
              helperText='5글자 이상 입력해 주세요'
              variant='standard'
              onChange={onChangeBodyHandler}
              margin='normal'
              sx={{ width: "300px" }}
            />
          </div>
          <StFlexDiv>
            <TextField
              error={kcal.length < 1 ? true : false}
              id='standard-error-helper-text'
              label='오늘 소모한 칼로리'
              value={kcal}
              type='number'
              helperText='숫자를 입력하세요'
              variant='standard'
              onChange={onChangeKcalHandler}
              margin='normal'
              sx={{ width: "300px" }}
            />
            <Typography variant='h6'>kcal</Typography>
          </StFlexDiv>
          <StFlexDiv>
            <TextField
              error={exerciseHour.length < 1 ? true : false}
              id='standard-error-helper-text'
              label='오늘 운동한 시간'
              value={exerciseHour}
              type='number'
              helperText='숫자를 입력하세요'
              variant='standard'
              onChange={onChangeExerciseHourHandler}
              margin='normal'
              sx={{ width: "300px" }}
            />
            <Typography variant='h6'>분</Typography>
          </StFlexDiv>
          <Stdiv>
            <ButtonComp type='submit' disabled={body.length < 5 || kcal.length < 1 || exerciseHour.length < 1} onClick={onSubmitHandler}>
              저장
            </ButtonComp>
            <ButtonComp type='button' onClick={closeModal}>
              닫기
            </ButtonComp>
          </Stdiv>
        </form>
      </TransitionsModal>
    </Box>
  ) : (
    <TransitionsModal>
      로그인 후 작성 가능합니다
      <Stdiv>
        <ButtonComp onClick={navigateLogin}>로그인</ButtonComp>
        <ButtonComp onClick={closeModal}>닫기</ButtonComp>
      </Stdiv>
    </TransitionsModal>
  );
};

export default Write;

const Stdiv = styled.div`
  margin-top: 10%;
  display: flex;
  justify-content: center;
`;

const StFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
