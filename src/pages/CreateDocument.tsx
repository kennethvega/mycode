import { useState } from "react";
import TextEditor from "../components/TextEditor";
import styles from "./CreateDocument.module.scss";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import LoadingSpinner from "../components/LoadingSpinner";
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
const CreateDocument = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // firebase query
    const colRef = collection(db, "users", `${user?.uid}`, "posts");
    await addDoc(colRef, {
      title: title,
      summary: description,
      content: bodyContent,
      username: user?.displayName,
      slug: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      id: user?.uid,
      photoURL: user?.photoURL,
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   // firebase query
  //   const colRef = collection(db, "users", `${user.uid}`, "posts");
  //   await addDoc(colRef, {
  //     title: title,
  //     summary: summary,
  //     content: tiptapContent,
  //     username: user.displayName,
  //     slug: "",
  //     published: publicPost,
  //     createdAt: serverTimestamp(),
  //     updatedAt: serverTimestamp(),
  //     id: user.uid,
  //     photoURL: user.photoURL,
  //   })
  //     .then(async (docRef) => {
  //       // console.log(docRef.id);
  //       await updateDoc(docRef, {
  //         slug: docRef.id,
  //       });
  //       router.push("/");
  //     })

  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   setIsLoading(false);
  //   toast.success("Successfully created post.");
  // };

  return (
    <div className="container margin-top-big ">
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
          <span>Short description:</span>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              height: "8rem",
              width: "100%",
              backgroundColor: "var(--background-color)",
              fontSize: "1.7rem",
              fontFamily: "Inter, sans-serif",
            }}
            maxLength={180}
          />
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
    </div>
  );
};

export default CreateDocument;
