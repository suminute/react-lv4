import React from "react";
import Modal from "../components/common/Modal";
import useInput from "../hooks/useInput";
import Button from "../components/common/Button";
import shortid from "shortid";
import { useMutation, useQueryClient } from "react-query";
import { addPost } from "../api/posts";

const Write = ({ setIsOpen, setPosts, getToday, posts }) => {
  const [title, onChangeTitleHandler] = useInput("");
  const [body, onChangeBodyHandler] = useInput("");
  const [userName, onChangeUserNameHandler] = useInput("");
  const [kcal, onChangeKcalHandler] = useInput("");
  const [exerciseHour, onChangeExerciseHourHandler] = useInput("");
  const [password, onChangePasswordHandler] = useInput("");

  const closeModal = () => {
    setIsOpen(false);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const newPost = {
    id: shortid.generate(),
    title,
    body,
    userName,
    password,
    date: getToday(),
    kcal,
    exerciseHour,
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // setPosts([...posts, newPost]);
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
        <div>
          <label>비밀번호</label>
          <input value={password} onChange={onChangePasswordHandler} />
        </div>
        <div>
          <label>제목</label>
          <input value={title} onChange={onChangeTitleHandler} />
        </div>
        <div>
          <label>내용</label>
          <input value={body} onChange={onChangeBodyHandler} />
        </div>
        <div>
          <label>오늘 소모한 칼로리</label>
          <input value={kcal} onChange={onChangeKcalHandler} />
        </div>
        <div>
          <label>오늘 운동한 시간</label>
          <input value={exerciseHour} onChange={onChangeExerciseHourHandler} />
        </div>
        <Button>저장</Button>
        <Button type='button' onClick={closeModal}>
          닫기
        </Button>
      </form>
    </Modal>
  );
};

export default Write;
