import { useState } from "react";
import TextEditor from "../components/TextEditor";
import styles from "./CreateDocument.module.scss";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import LoadingSpinner from "../components/utility/LoadingSpinner";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
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
const CreateDocument = () => {
  const [title, setTitle] = useState("");

  const [bodyContent, setBodyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const navigate = useNavigate();

  const user = useSelector(selectUser);
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
      updatedAt: serverTimestamp(),
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create a document</h2>
        <label>
          <span>Title:</span>
          <input
            type="text"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
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
    </Container>
  );
};

export default CreateDocument;
