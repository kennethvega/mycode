import BaseSkeleton from "./BaseSkeleton";

const HomeSidebarSkeleton = () => {
  return (
    <div className="sidebar-container">
      <BaseSkeleton type="box" />
      <div className="buttons">
        <BaseSkeleton type="button" />
        <BaseSkeleton type="button" />
      </div>
    </div>
  );
};

export default HomeSidebarSkeleton;
