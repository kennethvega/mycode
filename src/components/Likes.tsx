import Tippy from "@tippyjs/react";
import React from "react";
import { RiHeart2Line } from "react-icons/ri";
import styles from "./Likes.module.scss";
const Likes = () => {
  return (
    <div className={styles["likes-container"]}>
      <Tippy content="Like">
        <div>
          <RiHeart2Line className={styles.like} />
        </div>
      </Tippy>
      <span>11</span>
    </div>
  );
};

export default Likes;
