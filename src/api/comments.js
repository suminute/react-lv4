import axios from "axios";

// 조회
const getComments = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comments`);
  return response.data;
};

// 삭제
const deleteComment = async ({ id, deletedComment }) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`, deletedComment);
};

// 추가
const addComment = async (newComment) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/comments`, newComment);
};

export { getComments, deleteComment, addComment };
