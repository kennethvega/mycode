import React from "react";

import SkeletonElement from "./SkeletonElement";
import styles from "./SkeletonSidebar.module.scss";

const SkeletonSidebar = () => {
  return (
    <div className={styles["sidebar-container"]}>
      <SkeletonElement type="box" />
      <div className={styles.buttons}>
        <SkeletonElement type="button" />
        <SkeletonElement type="button" />
      </div>
    </div>
  );
};

export default SkeletonSidebar;
