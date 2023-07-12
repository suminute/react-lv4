import PostItem from "./PostItem";

const Post = ({ posts }) => {
  return (
    <>
      {posts
        .filter((post) => post.isDeleted === false)
        .map((post) => {
          return <PostItem key={post.id} posts={posts} post={post}></PostItem>;
        })}
    </>
  );
};

export default Post;
