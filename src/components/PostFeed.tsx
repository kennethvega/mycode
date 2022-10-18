import { useState, useEffect } from "react";
import styles from "./PostFeed.module.scss";
import PostItem from "./PostItem";
import {
  collectionGroup,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { postToJSON } from "../services/firebase";
import { Document } from "../ts/types/document";
import SkeletonElement from "./skeletons/SkeletonElement";
import SkeletonPost from "./skeletons/SkeletonPost";
const PostFeed = () => {
  const [documents, setDocuments] = useState<DocumentData | undefined>();
  // fetch data
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

  return (
    <div className={styles["posts-container"]}>
      {documents &&
        documents.map((document: Document) => {
          return <PostItem document={document} key={document.slug} />;
        })}
      {!documents && (
        <>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </>
      )}
    </div>
  );
};

export default PostFeed;
