import styles from "./PostItem.module.scss";
import defaultImage from "../assets/blank profile.jpg";
import { RiHeart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CgComment } from "react-icons/cg";
import { Document } from "../ts/types/document";
import { capitalizeUsername } from "../services/capitalizeUsername";
type PostItemProps = {
  document: Document;
};
const PostItem = ({ document: post }: PostItemProps) => {
  // capitalizing the user username
  const name = capitalizeUsername(post.username);
  // formating date
  const d = new Date(post.createdAt);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  const date = `${month} ${day} ${year}`;
  return (
    <div className={styles["post-container"]}>
      <img
        src={post.photoURL ? post.photoURL : defaultImage}
        alt="author's image"
        className={styles["image"]}
      />
      <div className={styles["text-container"]}>
        <div className={styles["post-header"]}>
          <Link to={`/profile/${post.id}`}>
            <h2>{name}</h2>
          </Link>
          <span className={styles.date}>{date}</span>
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
