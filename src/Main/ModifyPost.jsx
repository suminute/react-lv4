import React from "react";
import useInput from "../hooks/useInput";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import { useMutation, useQueryClient } from "react-query";
import { modifyPost } from "../api/posts";

const ModifyPost = ({ posts, post, closeModal, id }) => {
  const [title, onChangeTitleHandler] = useInput(post.title);
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
    // const newPost = posts.map((post) => {
    //   if (post.postId === postId) {
    //     const modifiedPost = {
    //       title,
    //       body,
    //       userName,
    //       kcal,
    //       exerciseHour,
    //     };
    //     return { ...post, ...modifiedPost };
    //   } else {
    //     return post;
    //   }
    // });
    // setPosts(newPost);
    let modifiedPost = posts.find((post) => post.id === id);
    modifiedPost = { ...modifiedPost, title, body, userName, kcal, exerciseHour };
    console.log(modifiedPost);
    mutation.mutate({ id, modifiedPost });
    closeModal();
  };
  return (
    <Modal>
      <form onSubmit={updatePost}>
        <div>
          <label>작성자명</label>
          <input value={userName} onChange={onChangeUserNameHandler} />
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

export default ModifyPost;
