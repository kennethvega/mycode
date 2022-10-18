import React from "react";
import "./SkeletonElement.scss";

type SkeletonElementProps = {
  type: string;
};

const SkeletonElement = ({ type }: SkeletonElementProps) => {
  const classes = `skeleton ${type}`;

  return <div className={classes}></div>;
};

export default SkeletonElement;
