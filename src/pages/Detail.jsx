import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPosts } from "../api/posts";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery("posts", getPosts);
  const detailPost = data.find((post) => post.id === id);

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>오류 발생...</div>;
  }

  return (
    <div>
      <p>디테일 페이지</p>
      <p>{id}</p>
      <p>{detailPost.userName}</p>
      <p>{detailPost.body}</p>
    </div>
  );
};

export default Detail;
