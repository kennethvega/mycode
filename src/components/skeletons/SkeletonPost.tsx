import React from "react";
import SkeletonElement from "./SkeletonElement";
import styles from "./SkeletonPost.module.scss";
const SkeletonPost = () => {
  return (
    <div className={styles["skeleton-wrapper"]}>
      <SkeletonElement type="small-avatar" />
      <div className={styles["text-container"]}>
        <div>
          <SkeletonElement type="header" />
          <SkeletonElement type="sub-title" />
        </div>
        <div>
          <SkeletonElement type="title" />
          <div className={styles.tags}>
            <SkeletonElement type="tags" />
            <SkeletonElement type="tags" />
            <SkeletonElement type="tags" />
          </div>
        </div>

        <div className={styles.footer}>
          <SkeletonElement type="reactions" />
          <SkeletonElement type="reactions" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPost;
