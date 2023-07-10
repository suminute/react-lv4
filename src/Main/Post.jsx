import PostItem from "./PostItem";

const Post = ({ posts }) => {
  return (
    <>
      {posts.map((post) => {
        return <PostItem key={post.id} posts={posts} post={post}></PostItem>;
      })}
    </>
  );
};

export default Post;
