import React, { useState } from "react";
import styles from "./ProfileDropDown.module.scss";
import defaultImage from "../../assets/blank profile.jpg";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser, selectUsername } from "../../features/authSlice";
// icons
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { AiFillDownCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // global auth state
  const user = useSelector(selectUser);
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();
  console.log(defaultImage);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.container}>
      <div
        className={styles["profile-container"]}
        onClick={() => setOpen(!open)}
      >
        <AiFillDownCircle className={styles["down-circle-svg"]} />

        <img
          src={user?.photoURL ? user.photoURL : defaultImage}
          alt="profile avatar"
          className={styles.profile}
        />
      </div>

      {open && (
        <div
          className={styles["dropdown-container"]}
          onClick={() => setOpen(!open)}
        >
          <div className={styles.dropdown}>
            {/* edit this to react router dynamic page*/}
            <div
              onClick={() => navigate(`/${user?.displayName}`)}
              className={styles["dropdown-item"]}
            >
              <BsFillPersonFill /> <span>Profile</span>
            </div>

            <div className={styles["dropdown-item"]} onClick={handleLogout}>
              <IoMdLogOut /> <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
