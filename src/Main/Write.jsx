import React from "react";
import Modal from "../components/common/Modal";
import useInput from "../hooks/useInput";
import Button from "../components/common/Button";
import shortid from "shortid";

const Write = ({ setIsOpen, setPosts, getToday, posts }) => {
  const [title, onChangeTitleHandler] = useInput();
  const [body, onChangeBodyHandler] = useInput();
  const [userName, onChangeUserNameHandler] = useInput();
  const [kcal, onChangeKcalHandler] = useInput();
  const [exerciseHour, onChangeExerciseHourHandler] = useInput();

  const closeModal = () => {
    setIsOpen(false);
  };

  const newPost = {
    postId: shortid.generate(),
    title,
    body,
    userName,
    date: getToday(),
    kcal,
    exerciseHour,
    isDeleted: false,
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setPosts([...posts, newPost]);
    closeModal();
  };

  return (
    <Modal>
      <form onSubmit={onSubmitHandler}>
        <label>제목</label>
        <input value={title} onChange={onChangeTitleHandler} />
        <label>내용</label>
        <input value={body} onChange={onChangeBodyHandler} />
        <label>작성자명</label>
        <input value={userName} onChange={onChangeUserNameHandler} />
        <label>오늘 소모한 칼로리</label>
        <input value={kcal} onChange={onChangeKcalHandler} />
        <label>오늘 운동한 시간</label>
        <input value={exerciseHour} onChange={onChangeExerciseHourHandler} />
        <Button>저장</Button>
        <Button type='button' onClick={closeModal}>
          닫기
        </Button>
      </form>
    </Modal>
  );
};

export default Write;
