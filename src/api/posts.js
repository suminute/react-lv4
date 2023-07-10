import axios from "axios";

// 조회
const getPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);
  return response.data;
};

// 삭제
const deletePost = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`);
};

// 추가
const addPost = async (newTodo) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, newTodo);
};

// 수정
const modifyPost = async ({ id, modifiedPost }) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`, modifiedPost);
};

export { getPosts, deletePost, addPost, modifyPost };
