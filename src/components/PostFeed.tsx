import styles from "./PostFeed.module.scss";
import PostContainer from "./PostContainer";

const PostFeed = () => {
  return (
    <div className={styles["posts-container"]}>
      <PostContainer />
      <PostContainer />
      <PostContainer />
    </div>
  );
};

export default PostFeed;
