import { doc, DocumentData, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { db } from "../lib/firebase";

import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import TagsInput from "./TagsInput";
import TextEditor from "./TextEditor";
import SecondaryButton from "./Buttons/SecondaryButton";
import PrimaryButton from "./Buttons/PrimaryButton";
import LoadingSpinner from "./utility/LoadingSpinner";
import styles from "../pages/CreateDocument.module.scss";

const EditDocument = ({ post, setOpenEditForm }: DocumentData) => {
  const [title, setTitle] = useState(post?.title);
  const [tags, setTags] = useState<string[]>(post?.tags);
  const [bodyContent, setBodyContent] = useState(post?.content);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector(selectUser);
  // handle Update Doc

  const handleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "users", `${post.id}`, "posts", `${post.slug}`), {
        title: title,
        tags: tags,
        content: bodyContent,
      });
      setOpenEditForm(false);
      // setOpenEditForm(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {user && (
        <form className={styles.form} onSubmit={handleUpdate}>
          <p className={styles.preview} onClick={() => setOpenEditForm(false)}>
            <BsArrowLeft /> Cancel Edit
          </p>
          <h2>Edit document</h2>
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
          <SecondaryButton disabled={false}>Edit this post</SecondaryButton>
        </div>
      )}
    </>
  );
};

export default EditDocument;
