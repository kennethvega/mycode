import styles from "./PostItem.module.scss";
import defaultImage from "../assets/blank profile.jpg";
import { Link } from "react-router-dom";
import { RiHeart2Line } from "react-icons/ri";
import { CgComment } from "react-icons/cg";
import { Document } from "../ts/types/document";
import { useNameFormat } from "../hooks/useNameFormat";
import useDateFormat from "../hooks/useDateFormat";
type PostItemProps = {
  document: Document;
};
const PostItem = ({ document: post }: PostItemProps) => {
  // capitalizing the user username
  const name = useNameFormat(post?.username);
  // formating date
  const date = useDateFormat(post?.createdAt);

  return (
    <div className={styles["post-container"]}>
      <div className={styles["post-header"]}>
        <img
          src={post.photoURL ? post.photoURL : defaultImage}
          alt="author's image"
          className={styles["image"]}
        />
        <div>
          <Link to={`/profile/${post.id}`}>
            <h2>{name}</h2>
          </Link>
          <span className={styles.date}>{date}</span>
        </div>
      </div>

      <div className={styles["post-body"]}>
        <Link to={`/document/${post.id}/${post.slug}`}>
          <h2 className={styles["post-title"]}>{post.title}</h2>
        </Link>

        <div className={styles.tags}>
          {post.tags.map((tag, index) => {
            return <p key={index}>#{tag}</p>;
          })}
        </div>
      </div>
      <div className={styles["post-footer"]}>
        <Link to={`/document/${post.id}/${post.slug}`}>
          <span className={styles.icons}>
            <RiHeart2Line className={styles.icon} />
            {post?.likes.length === 0 ? "0" : post.likes?.length}
            <p className={styles["footer-text"]}>Reaction</p>
          </span>
        </Link>
        <Link to={`/document/${post.id}/${post.slug}`}>
          <span className={styles.icons}>
            <CgComment className={styles.icon} />{" "}
            {post?.comments ? post.comments : "0"}{" "}
            <p className={styles["footer-text"]}>Comments</p>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
