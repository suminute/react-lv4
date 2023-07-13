import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getPosts } from "../../api/posts";
import ButtonComp from "../common/ButtonComp";

const DetailPost = () => {
  const { id } = useParams();
  const { isLoading, isError, data } = useQuery("posts", getPosts);
  const detailPost = data.find((post) => post.id === id);

  // const []

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>오류 발생...</div>;
  }

  return (
    <>
      <div>
        DetailPost
        <p>디테일 페이지</p>
        <p>{detailPost.userName}</p>
        <p>{detailPost.body}</p>
      </div>
      <input />
      <ButtonComp>저장</ButtonComp>
    </>
  );
};

export default DetailPost;
