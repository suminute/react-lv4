import React, { useState } from "react";
import Modal from "../components/common/Modal";
import useInput from "../hooks/useInput";
import Button from "../components/common/Button";
import shortid from "shortid";
import { useMutation, useQueryClient } from "react-query";
import { addPost } from "../api/posts";

const Write = ({ closeModal }) => {
  const [body, onChangeBodyHandler] = useInput("");
  const [userName, onChangeUserNameHandler] = useInput("");
  const [kcal, onChangeKcalHandler] = useInput("");
  const [exerciseHour, onChangeExerciseHourHandler] = useInput("");
  const [password, onChangePasswordHandler] = useInput("");

  const getToday = () => {
    const today = new Date();
    const year = ("0" + today.getFullYear()).slice(-2);
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const date = ("0" + today.getDate()).slice(-2);
    const hours = ("0" + today.getHours()).slice(-2);
    const minutes = ("0" + today.getMinutes()).slice(-2);
    return `${year}-${month}-${date} ${hours}:${minutes}`;
  };

  const [disabled, setDisabled] = useState(true);

  const queryClient = useQueryClient();
  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const newPost = {
    id: shortid.generate(),
    body,
    userName,
    password,
    date: getToday(),
    kcal,
    exerciseHour,
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(newPost);
    closeModal();
  };

  return (
    <Modal>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>작성자명</label>
          <input value={userName} onChange={onChangeUserNameHandler} />
        </div>
        {userName.length < 2 && <p>이름을 2글자 이상 입력해 주세요</p>}
        {userName.length >= 2 && <p>사용 가능한 이름입니다</p>}
        <div>
          <label>비밀번호</label>
          <input type='password' value={password} onChange={onChangePasswordHandler} />
        </div>
        {password.length < 4 && <p>비밀번호를 4글자 이상 입력해 주세요</p>}
        {password.length >= 4 && <p>사용 가능한 비밀번호입니다</p>}
        <div>
          <label>내용</label>
          <input value={body} onChange={onChangeBodyHandler} />
        </div>
        {body.length < 5 && <p>5글자 이상 입력해 주세요</p>}
        <div>
          <label>오늘 소모한 칼로리</label>
          <input type='number' value={kcal} onChange={onChangeKcalHandler} />
          {!kcal.length && <p>숫자를 입력하세요</p>}
        </div>
        <div>
          <label>오늘 운동한 시간</label>
          <input type='number' value={exerciseHour} onChange={onChangeExerciseHourHandler} />
        </div>
        {!exerciseHour.length && <p>숫자를 입력하세요</p>}
        <Button disabled={body.length < 5 || password.length < 4 || userName.length < 2 || kcal.length < 1 || exerciseHour.length < 1}>저장</Button>
        <Button type='button' onClick={closeModal}>
          닫기
        </Button>
      </form>
    </Modal>
  );
};

export default Write;
