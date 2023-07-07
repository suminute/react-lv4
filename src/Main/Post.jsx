import React from "react";
import { Link } from "react-router-dom";

const Post = ({ posts }) => {
  const divCard = { border: "1px solid black", padding: "10px", margin: "10px" };

  return (
    <>
      {posts.map((post) => {
        return (
          <Link to={`/detail/${post.postId}`}>
            <div style={divCard} key={post.postId}>
              <p>{post.title}</p>
              <p>{post.body}</p>
              <p>{post.userName}</p>
              <p>{post.kcal}</p>
              <p>{post.exerciseHour}</p>
              <p>{post.date}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Post;
