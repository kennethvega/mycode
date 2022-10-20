import defaultImage from "../assets/blank profile.jpg";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/utility/Container";
import { db } from "../lib/firebase";
import { postToJSON } from "../services/firebase";
import DOMPurify from "dompurify";
import styles from "./Document.module.scss";
import useDateFormat from "../hooks/useDateFormat";
import Likes from "../components/Likes";

import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import { MdOutlineInsertComment } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import Tippy from "@tippyjs/react";
export const Document = () => {
  const user = useSelector(selectUser);
  const [post, setPost] = useState<DocumentData>();
  const date = useDateFormat(post?.createdAt);
  const { id, slug } = useParams();
  // fetch postdetail
  useEffect(() => {
    const docRef = doc(db, "users", `${id}`, "posts", `${slug}`);
    onSnapshot(docRef, (snapshot) => {
      const data = postToJSON(snapshot);
      setPost(data);
    });
  }, []);

  return (
    <Container>
      <div className={styles["document-container"]}>
        <div className={styles["left-col"]}>
          <div className={styles["reactions-container"]}>
            <Likes />
            <Tippy content="Jump to comments">
              <div className={styles["comment-container"]}>
                <MdOutlineInsertComment className={styles.comment} />
                <span>11</span>
              </div>
            </Tippy>
          </div>
        </div>
        <div className={styles["main-col"]}>
          <div className={styles["post-image-container"]}>
            <img
              src={post?.photoURL ? post.photoURL : defaultImage}
              alt="Author's image"
              className={styles.image}
            />
            <div className={styles["author-container"]}>
              <p className={styles.name}>{post?.username}</p>
              <span>{date}</span>
            </div>
            {/* edit delete buttons */}
            {post?.id === user?.uid && (
              <div className={styles["buttons-container"]}>
                <Tippy content="Edit this post">
                  <div>
                    <TbEdit className={styles.edit} />
                  </div>
                </Tippy>
                <Tippy content="Delete this post">
                  <div>
                    <RiDeleteBin6Line className={styles.delete} />
                  </div>
                </Tippy>
              </div>
            )}
          </div>
          <h1 className={styles["post-title"]}>{post?.title}</h1>
          <div
            className="scrollbar"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post?.content),
            }}
          ></div>
        </div>
      </div>
    </Container>
  );
};
