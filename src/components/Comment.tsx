import defaultImage from "../assets/blank profile.jpg";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  DocumentData,
  increment,
  updateDoc,
} from "firebase/firestore";
import styles from "./Comment.module.scss";
import useDateFormat from "../hooks/useDateFormat";
import { useNameFormat } from "../hooks/useNameFormat";
import { RiDeleteBin6Line, RiHeart2Line, RiHeart2Fill } from "react-icons/ri";

import Tippy from "@tippyjs/react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import { db } from "../lib/firebase";
import { Link } from "react-router-dom";

const Comment = ({ comment, slug, id }: DocumentData) => {
  const name = useNameFormat(comment?.username);
  const user = useSelector(selectUser);
  // formating date
  const date = useDateFormat(comment?.createdAt);

  const handleLike = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (comment.slug) {
      if (user?.uid) {
        if (comment.likes?.includes(user.uid)) {
          updateDoc(
            doc(db, `users/${id}/posts/${slug}/comments/${comment?.slug}`),
            {
              likes: arrayRemove(user.uid),
            }
          ).catch((e) => {
            console.log(e);
          });
        } else {
          updateDoc(
            doc(db, `users/${id}/posts/${slug}/comments/${comment?.slug}`),
            {
              likes: arrayUnion(user.uid),
            }
          ).catch((e) => {
            console.log(e);
          });
        }
      }
    }
  };

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (comment.slug) {
      const commentRef = doc(
        db,
        "users",
        `${id}`,
        "posts",
        `${slug}`,
        "comments",
        `${comment?.slug}`
      );
      await deleteDoc(commentRef);
      await updateDoc(doc(db, "users", `${id}/posts/${slug}`), {
        comments: increment(-1),
      });
    }
  };



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
          {comment?.id === user?.uid && (
            <Tippy content="Delete comment">
              <div className={styles.delete} onClick={handleDelete}>
                <RiDeleteBin6Line />
              </div>
            </Tippy>
          )}
        </div>
        <div className={styles.message}>{comment.message}</div>
        {user ? (
          <div className={styles["likes-container"]}>
            {comment.likes?.includes(user?.uid) ? (
              <Tippy content="Unlike">
                <div className={styles.likes} onClick={handleLike}>
                  <RiHeart2Fill className={styles.fill} />{" "}
                </div>
              </Tippy>
            ) : (
              <Tippy content="Like" placement="left">
                <div className={styles.likes} onClick={handleLike}>
                  <RiHeart2Line />
                </div>
              </Tippy>
            )}
            <p>{comment.likes.length}</p>
          </div>
        ) : (
          <div className={styles["likes-container"]}>
            <Tippy content="Login to like this comment" placement="left">
              <Link to="/login" className={styles.likes}>
                <RiHeart2Line />
              </Link>
            </Tippy>
            <p>{comment.likes.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
