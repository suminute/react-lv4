import React from "react";
import useInput from "../../hooks/useInput";
import ButtonComp from "../common/ButtonComp";
import { useMutation, useQueryClient } from "react-query";
import { modifyPost } from "../../api/posts";
import TransitionsModal from "../common/TrasitionModal";
import { TextField, Typography } from "@mui/material";
import { styled } from "styled-components";

const ModifyPost = ({ posts, post, closeModal, id }) => {
  const [body, onChangeBodyHandler] = useInput(post.body);
  const [userName, onChangeUserNameHandler] = useInput(post.userName);
  const [kcal, onChangeKcalHandler] = useInput(post.kcal);
  const [exerciseHour, onChangeExerciseHourHandler] = useInput(post.exerciseHour);

  // 쿼리
  const queryClient = useQueryClient();
  const mutation = useMutation(modifyPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  // 수정 버튼
  const updatePost = (e) => {
    e.preventDefault();
    let modifiedPost = posts.find((post) => post.id === id);
    modifiedPost = { ...modifiedPost, body, userName, kcal, exerciseHour };
    mutation.mutate({ id, modifiedPost });
    closeModal();
    alert("수정되었습니다!");
  };

  return (
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
          <ButtonComp type='submit' disabled={body.length < 5 || kcal.length < 1 || exerciseHour.length < 1} onClick={updatePost}>
            저장
          </ButtonComp>
          <ButtonComp type='button' onClick={closeModal}>
            닫기
          </ButtonComp>
        </Stdiv>
      </form>
    </TransitionsModal>
  );
};

export default ModifyPost;

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
