import { styled } from "styled-components";
import PostItem from "./PostItem";

const Post = ({ posts }) => {
  return (
    <StDiv>
      {posts
        .sort((a, b) => b.currentTime - a.currentTime)
        .filter((post) => post.isDeleted === false)
        .map((post) => {
          return <PostItem key={post.id} posts={posts} post={post}></PostItem>;
        })}
    </StDiv>
  );
};

export default Post;

const StDiv = styled.div`
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
`;
