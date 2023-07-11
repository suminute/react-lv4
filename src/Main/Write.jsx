import React, { useState } from "react";
import Modal from "../components/common/Modal";
import useInput from "../hooks/useInput";
import ButtonComp from "../components/common/ButtonComp";
import shortid from "shortid";
import { useMutation, useQueryClient } from "react-query";
import { addPost } from "../api/posts";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Write = ({ closeModal }) => {
  const [body, onChangeBodyHandler] = useInput("");
  const [userName, onChangeUserNameHandler] = useInput("");
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
    userName,
    userId: user.uid,
    date: getToday(),
    kcal,
    exerciseHour,
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
    <Modal>
      <form>
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
        <ButtonComp disabled={body.length < 5 || userName.length < 2 || kcal.length < 1 || exerciseHour.length < 1} onClick={onSubmitHandler}>
          저장
        </ButtonComp>
        <ButtonComp type='button' onClick={closeModal}>
          닫기
        </ButtonComp>
      </form>
    </Modal>
  ) : (
    <Modal>
      로그인 후 작성 가능합니다
      <ButtonComp onClick={navigateLogin}>로그인</ButtonComp>
      <ButtonComp onClick={closeModal}>닫기</ButtonComp>
    </Modal>
  );
};

export default Write;
