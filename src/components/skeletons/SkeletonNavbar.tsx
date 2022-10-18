import React from "react";
import SkeletonElement from "./SkeletonElement";
import styles from "./SkeletonNavbar.module.scss";
const SkeletonNavbar = () => {
  return (
    <div className={styles.nav}>
      <SkeletonElement type="navigation" />
    </div>
  );
};

export default SkeletonNavbar;
