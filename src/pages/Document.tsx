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
export const Document = () => {
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
        <div className={styles["left-col"]}>left</div>
        <div className={styles["middle-col"]}>
          <div className={styles["post-image-container"]}>
            <img
              src={post?.photoURL ? post.photoURL : defaultImage}
              alt="Author's image"
              className={styles.image}
            />
            <div className={styles["author-container"]}>
              <p>{post?.username}</p>
              <span>{date}</span>
            </div>
          </div>
          <h1 className={styles["post-title"]}>{post?.title}</h1>
          <div
            className="scrollbar"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post?.content),
            }}
          ></div>
        </div>
        <div className={styles["right-col"]}>right</div>
      </div>
    </Container>
  );
};
