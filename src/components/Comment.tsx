import defaultImage from "../assets/blank profile.jpg";
import { DocumentData } from "firebase/firestore";
import styles from "./Comment.module.scss";
import useDateFormat from "../hooks/useDateFormat";
import { useNameFormat } from "../hooks/useNameFormat";
import { RiDeleteBin6Line, RiHeart2Line, RiHeart2Fill } from "react-icons/ri";

import Tippy from "@tippyjs/react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";

const Comment = ({ comment }: DocumentData) => {
  const name = useNameFormat(comment?.username);
  const user = useSelector(selectUser);
  // formating date
  const date = useDateFormat(comment?.createdAt);
  return (
    <div className={styles["comment-container"]}>
      <div className={styles["image-container"]}>
        <img
          src={comment.photoURL ? comment.photoURL : defaultImage}
          alt="user-image"
          className={styles.image}
        />
      </div>
      <div className={styles["content-container"]}>
        <div className={styles["comment-heading"]}>
          <p className={styles.name}>{name} </p>
          <span className={styles.date}>{date}</span>
          {comment?.id === user?.uid}
          <Tippy content="Delete comment">
            <div className={styles.delete}>
              <RiDeleteBin6Line />
            </div>
          </Tippy>
        </div>
        <div className={styles.message}>{comment.message}</div>
        <div className={styles["likes-container"]}>
          {comment.likes?.includes(user?.uid) ? (
            <Tippy content="Unlike">
              <div className={styles.likes}>
                <RiHeart2Fill className={styles.fill} />
              </div>
            </Tippy>
          ) : (
            <Tippy content="like" placement="left">
              <div className={styles.likes}>
                <RiHeart2Line />
              </div>
            </Tippy>
          )}
          <p>{comment.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
