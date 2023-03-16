import "./Skeleton.scss";
type BaseSkeletonProps = {
  type: string;
};
const BaseSkeleton = ({ type }: BaseSkeletonProps) => {
  const classes = `skeleton ${type}`;
  return <div className={classes}></div>;
};

export default BaseSkeleton;
