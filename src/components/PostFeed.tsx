import { useEffect, useState } from "react";
import styles from "./PostFeed.module.scss";
import PostItem from "./PostItem";
import { DocumentData } from "firebase/firestore";
import { Document } from "../ts/types/document";
import PostItemSkeleton from "./skeletons/PostItemSkeleton";

const PostFeed = ({ documents }: DocumentData) => {
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [filters, setFilters] = useState({ s: "" });
  // search function
  useEffect(() => {
    if (documents) {
      let docs = documents.filter(
        (doc: any) =>
          doc.title.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
      );
      setFilteredDocs(docs);
    }
  }, [filters]);
  //

  const search = (s: any) => {
    setFilters({
      s,
    });
  };

  return (
    <div className={styles["posts-container"]}>
      <input
        type="text"
        className={styles.search}
        placeholder="Search a doc"
        onKeyUp={(e) => search((e.target as HTMLInputElement).value)}
      />

      {filteredDocs?.length
        ? filteredDocs?.map((document: Document) => {
            return <PostItem document={document} key={document.slug} />;
          })
        : documents?.map((document: Document) => {
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
