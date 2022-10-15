import { useState, useEffect } from "react";
import styles from "./PostFeed.module.scss";
import PostContainer from "./PostContainer";
import {
  collectionGroup,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { postToJSON } from "../services/firebase";

const PostFeed = () => {
  const [documents, setDocuments] = useState<any[]>();

  useEffect(() => {
    const fetchData = async () => {
      const postQuery = query(
        collectionGroup(db, "posts"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(postQuery);
      const posts = querySnapshot.docs.map(postToJSON);
      setDocuments(posts);
    };

    fetchData();
  }, []);
  console.log(documents);
  return (
    <div className={styles["posts-container"]}>
      {documents?.map((document) => (
        <PostContainer document={document} />
      ))}
    </div>
  );
};

export default PostFeed;
