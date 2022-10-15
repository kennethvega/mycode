import styles from "./PostContainer.module.scss";
import defaultImage from "../assets/blank profile.jpg";
import { RiHeart2Line } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { CgComment } from "react-icons/cg";
const PostContainer = () => {
  return (
    <div className={styles["post-container"]}>
      <img
        src={defaultImage}
        alt="author's image"
        className={styles["image"]}
      />
      <div className={styles["text-container"]}>
        <div className={styles["post-header"]}>
          <h2>Kenneth Vega</h2>
          <span className={styles.date}>October 14 2022</span>
        </div>
        <div className={styles["post-body"]}>
          <h2 className={styles["post-title"]}>
            This is a title This is a title This is a title atitle atitle atitle
            aThis is a title Thisa asd
          </h2>
          <div className={styles.tags}>
            <p>#react </p>
            <p>#nextjs </p>
            <p>#vercel </p>
          </div>
        </div>
        <div className={styles["post-footer"]}>
          <span className={styles.icons}>
            <RiHeart2Line /> 18 reactions
          </span>
          <span className={styles.icons}>
            <CgComment /> 18 comments
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
