import BaseSkeleton from "./BaseSkeleton";

const ProfileSidebarSkeleton = () => {
  return (
    <div className="sidebar-container util-height">
      <BaseSkeleton type="big-avatar" />
      <BaseSkeleton type="text" />
      <BaseSkeleton type="text-big" />
      <div className="buttons">
        <BaseSkeleton type="button" />
      </div>
    </div>
  );
};

export default ProfileSidebarSkeleton;
