import styles from "./PostItem.module.scss";
import defaultImage from "../assets/blank profile.jpg";
import { RiHeart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CgComment } from "react-icons/cg";
import { Document } from "../ts/types/document";
type PostItemProps = {
  document: Document;
};
const PostItem = ({ document: post }: PostItemProps) => {
  return (
    <div className={styles["post-container"]}>
      <img
        src={defaultImage}
        alt="author's image"
        className={styles["image"]}
      />
      <div className={styles["text-container"]}>
        <div className={styles["post-header"]}>
          <Link to={`/profile/${post.id}`}>
            <h2>{post.username}</h2>
          </Link>
          <span className={styles.date}>{post.createdAt}</span>
        </div>
        <div className={styles["post-body"]}>
          <Link to={`/document/${post.slug}`}>
            <h2 className={styles["post-title"]}>{post.title}</h2>
          </Link>

          <div className={styles.tags}>
            {post.tags.map((tag, index) => {
              return <p key={index}>#{tag}</p>;
            })}
          </div>
        </div>
        <div className={styles["post-footer"]}>
          <Link to={`/document/${post.slug}`}>
            <span className={styles.icons}>
              <RiHeart2Line /> 18 reactions
            </span>
          </Link>
          <Link to={`/document/${post.slug}`}>
            <span className={styles.icons}>
              <CgComment /> 18 comments
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
