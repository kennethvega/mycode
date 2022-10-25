import BaseSkeleton from "./BaseSkeleton";

const PostItemSkeleton = () => {
  return (
    <div className="post-skeleton-container">
      <BaseSkeleton type="small-avatar" />
      <div className="text-container">
        <div>
          <BaseSkeleton type="header" />
          <BaseSkeleton type="sub-title" />
        </div>
        <div>
          <BaseSkeleton type="title" />
          <div className="tags">
            <BaseSkeleton type="tags" />
            <BaseSkeleton type="tags" />
            <BaseSkeleton type="tags" />
          </div>
        </div>

        <div className="footer">
          <BaseSkeleton type="reactions" />
          <BaseSkeleton type="reactions" />
        </div>
      </div>
    </div>
  );
};

export default PostItemSkeleton;
