import {
  addDoc,
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../features/authSlice";

import { db } from "../lib/firebase";
import { postToJSON } from "../services/firebase";
import PrimaryButton from "./Buttons/PrimaryButton";
import Comment from "./Comment";
import styles from "./CommentsContainer.module.scss";
import LoadingSpinner from "./utility/LoadingSpinner";

type CommentsContainerProps = {
  id: string | undefined;
  slug: string | undefined;
};

const CommentsContainer = ({ id, slug }: CommentsContainerProps) => {
  const [comments, setComments] = useState<DocumentData | null | undefined>();
  const [loading, setLoading] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const user = useSelector(selectUser);
  // fetch all comments of individual post
  const commentsRef = query(
    collection(db, "users", `${id}`, "posts", `${slug}`, "comments"),
    orderBy("createdAt", "desc")
  );
  useEffect(() => {
    onSnapshot(commentsRef, (snapshot) => {
      const commentsData: any = [];
      snapshot.forEach((doc) => {
        commentsData.push(postToJSON(doc));
      });
      setComments(commentsData);
    });
  }, []);

  // post reference
  const postRef = doc(db, "users", `${id}`, "posts", `${slug}`);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (commentInput.length > 2) {
      setLoading(true);
      await addDoc(
        collection(db, "users", `${id}`, "posts", `${slug}`, "comments"),
        {
          username: user?.displayName,
          message: commentInput,
          likes: [],
          photoURL: user?.photoURL,
          slug: "",
          id: user?.uid,
          createdAt: serverTimestamp(),
          postId: slug,
        }
      )
        .then(async (docRef) => {
          // update document slug to equals document id
          await updateDoc(docRef, {
            slug: docRef.id,
          });
          // update comments value in the post
          await updateDoc(postRef, {
            comments: comments?.length + 1,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      setCommentInput("");
      setLoading(false);
    } else {
      toast.error("comments must be at least 3 characters long");
    }
  };

  return (
    <div className={styles.container} id="comments">
      <h2>Comments</h2>
      <textarea
        placeholder="add a comment to the discussion..."
        className={styles["comment-input"]}
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
      />
      <div className={styles["button-container"]}>
        {!loading && (
          <PrimaryButton type="button" disabled={false} onClick={handleSubmit}>
            Post
          </PrimaryButton>
        )}
        {loading && (
          <PrimaryButton type="button" disabled={false} onClick={handleSubmit}>
            <LoadingSpinner />
          </PrimaryButton>
        )}
      </div>

      {comments &&
        comments.map((comment: DocumentData) => (
          <div key={comment?.slug}>
            <Comment comment={comment} slug={slug} id={id} />
          </div>
        ))}
    </div>
  );
};

export default CommentsContainer;
