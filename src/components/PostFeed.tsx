import styles from "./PostFeed.module.scss";
import PostItem from "./PostItem";
import { DocumentData } from "firebase/firestore";
import { Document } from "../ts/types/document";
import PostItemSkeleton from "./skeletons/PostItemSkeleton";

const PostFeed = ({ documents }: DocumentData) => {
  return (
    <div className={styles["posts-container"]}>
      {documents &&
        documents.map((document: Document) => {
          return <PostItem document={document} key={document.slug} />;
        })}
      {!documents && (
        <>
          <PostItemSkeleton />
          <PostItemSkeleton />
          <PostItemSkeleton />
          <PostItemSkeleton />
          <PostItemSkeleton />
        </>
      )}
    </div>
  );
};

export default PostFeed;
