import React, { useState } from "react";
import useInput from "../hooks/useInput";
import Modal from "../components/common/Modal";
import ButtonComp from "../components/common/ButtonComp";
import { useMutation, useQueryClient } from "react-query";
import { modifyPost } from "../api/posts";
import { auth } from "../firebase";

const ModifyPost = ({ posts, post, closeModal, id }) => {
  const [body, onChangeBodyHandler] = useInput(post.body);
  const [userName, onChangeUserNameHandler] = useInput(post.userName);
  const [kcal, onChangeKcalHandler] = useInput(post.kcal);
  const [exerciseHour, onChangeExerciseHourHandler] = useInput(post.exerciseHour);

  const queryClient = useQueryClient();
  const mutation = useMutation(modifyPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const updatePost = (e) => {
    e.preventDefault();
    let modifiedPost = posts.find((post) => post.id === id);
    modifiedPost = { ...modifiedPost, body, userName, kcal, exerciseHour };
    mutation.mutate({ id, modifiedPost });
    closeModal();
    alert("수정되었습니다!");
  };
  return (
    <Modal>
      <form onSubmit={updatePost}>
        <div>
          <label>작성자명</label>
          <input value={userName} onChange={onChangeUserNameHandler} />
        </div>
        {userName.length < 2 && <p>이름을 2글자 이상 입력해 주세요</p>}
        {userName.length >= 2 && <p>사용 가능한 이름입니다</p>}
        <div>
          <label>내용</label>
          <input value={body} onChange={onChangeBodyHandler} />
        </div>
        <div>
          <label>오늘 소모한 칼로리</label>
          <input type='number' value={kcal} onChange={onChangeKcalHandler} />
        </div>
        <div>
          <label>오늘 운동한 시간</label>
          <input type='number' value={exerciseHour} onChange={onChangeExerciseHourHandler} />
        </div>
        <ButtonComp disabled={body.length < 5 || userName.length < 2 || kcal.length < 1 || exerciseHour.length < 1}>저장</ButtonComp>
        <ButtonComp type='button' onClick={closeModal}>
          닫기
        </ButtonComp>
      </form>
    </Modal>
  );
};

export default ModifyPost;
