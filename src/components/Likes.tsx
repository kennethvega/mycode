import Tippy from "@tippyjs/react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

import { RiHeart2Line, RiHeart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../features/authSlice";
import { db } from "../lib/firebase";
import styles from "./Likes.module.scss";
type LikesProps = {
  id: string;
  likes: string[] | undefined;
  slug: string;
};

const Likes = ({ id, likes, slug }: LikesProps) => {
  const user = useSelector(selectUser);
  const likesRef = doc(db, "users", `${id}`, "posts", `${slug}`);

  const handleLike = () => {
    if (user?.uid) {
      if (likes?.includes(user.uid)) {
        updateDoc(likesRef, {
          likes: arrayRemove(user.uid),
        }).catch((e) => {
          console.log(e);
        });
      } else {
        updateDoc(likesRef, {
          likes: arrayUnion(user.uid),
        }).catch((e) => {
          console.log(e);
        });
      }
    }
  };
  return (
    <div className={styles["likes-container"]}>
      {user && (
        <>
          {!likes?.includes(user?.uid!) && (
            <Tippy content="Like post">
              <div onClick={handleLike}>
                <RiHeart2Line className={styles.like} />
              </div>
            </Tippy>
          )}
          {likes?.includes(user?.uid!) && (
            <Tippy content="Unlike post">
              <div onClick={handleLike}>
                <RiHeart2Fill className={styles.unlike} />
              </div>
            </Tippy>
          )}
        </>
      )}
      {!user && (
        <Link to="/login">
          <Tippy content="Login to like this post">
            <div>
              <RiHeart2Line className={styles.like} />
            </div>
          </Tippy>
        </Link>
      )}
      <span>{likes ? likes.length : "0"}</span>
    </div>
  );
};

export default Likes;
