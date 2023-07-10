import PostItem from "./PostItem";
import { useQuery } from "react-query";
import getPosts from "../api/posts";

const Post = ({ posts, setPosts }) => {
  return (
    <>
      {posts?.map((post) => {
        return <PostItem key={post.id} posts={posts} post={post} setPosts={setPosts}></PostItem>;
      })}
    </>
  );
};

export default Post;
