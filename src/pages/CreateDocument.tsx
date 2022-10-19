import { useState } from "react";
import TextEditor from "../components/TextEditor";
import styles from "./CreateDocument.module.scss";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import LoadingSpinner from "../components/utility/LoadingSpinner";
import { useSelector } from "react-redux";
import { selectAuth, selectUser } from "../features/authSlice";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import TagsInput from "../components/TagsInput";
import Container from "../components/utility/Container";
import BaseSkeleton from "../components/skeletons/BaseSkeleton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
const CreateDocument = () => {
  const [title, setTitle] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  //
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // firebase query
    const colRef = collection(db, "users", `${user?.uid}`, "posts");
    await addDoc(colRef, {
      title: title,
      tags: tags,
      content: bodyContent,
      username: user?.displayName,
      slug: "",
      createdAt: serverTimestamp(),
      id: user?.uid,
      photoURL: user?.photoURL ? user.photoURL : "",
    })
      .then(async (docRef) => {
        await updateDoc(docRef, {
          slug: docRef.id,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <Container>
      {user && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Create a document</h2>
          <label>
            <span>Title:</span>
            <input
              type="text"
              required={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={70}
            />
          </label>
          <label>
            <span>Tags:</span>
            <TagsInput tags={tags} setTags={setTags} />
          </label>
          <label>
            <span>Content:</span>
            <div>
              <TextEditor
                setBodyContent={setBodyContent}
                bodyContent={bodyContent}
              />
            </div>
          </label>
          {isLoading ? (
            <PrimaryButton disabled={true}>
              <LoadingSpinner />
            </PrimaryButton>
          ) : (
            <PrimaryButton disabled={false} type="submit">
              Post document
            </PrimaryButton>
          )}
        </form>
      )}
      {!user && (
        <div className={styles.error}>
          <h1>You need to create an account to create a post!</h1>
          <SecondaryButton onClick={() => navigate("/login")} disabled={false}>
            Login to create an account
          </SecondaryButton>
        </div>
      )}
      {!auth && (
        <form className={styles.form}>
          <h2>Create a document</h2>
          <div className={styles["button-skeleton"]}>
            <BaseSkeleton type="button" />
            <BaseSkeleton type="button" />
          </div>
          <BaseSkeleton type="big-box" />
          <BaseSkeleton type="button" />
        </form>
      )}
    </Container>
  );
};

export default CreateDocument;
