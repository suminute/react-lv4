import axios from "axios";

// 조회
const getPosts = async () => {
  const response = await axios.get("http://localhost:4000/posts");
  return response.data;
};

// 삭제
const deletePost = async (id) => {
  await axios.delete(`http://localhost:4000/posts/${id}`);
};

// 추가
const addPost = async (newTodo) => {
  await axios.post("http://localhost:4000/posts", newTodo);
};

// 수정
const modifyPost = async ({ id, modifiedPost }) => {
  await axios.patch(`http://localhost:4000/posts/${id}`, modifiedPost);
  console.log(modifiedPost);
};
export { getPosts, deletePost, addPost, modifyPost };
