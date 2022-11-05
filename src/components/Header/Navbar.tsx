import Tippy from "@tippyjs/react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import SecondaryButton from "../Buttons/SecondaryButton";

import styles from "./Navbar.module.scss";
import Theme from "./Theme";
// redux
import { useSelector } from "react-redux";
import { selectAuth, selectUser } from "../../features/authSlice";
import ProfileDropDown from "./ProfileDropDown";
import NavSkeleton from "../skeletons/NavSkeleton";

const Navbar = () => {
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const logo = "My< >";

  return (
    <nav className={styles.container}>
      <div className="container">
        <div className={styles.content}>
          <Link to="/">
            <h1 className={styles.logo}>{logo}</h1>
          </Link>
          <div className={styles["navbar-right-content"]}>
            {auth ? (
              <>
                {user ? (
                  <>
                    <Tippy content="Create a document">
                      <Link to="/create">
                        <IoMdAdd className={styles.icon} />
                      </Link>
                    </Tippy>
                    <Theme />
                    <ProfileDropDown />
                  </>
                ) : (
                  <>
                    <Theme />
                    <Link className={styles.login} to="/login">
                      Login
                    </Link>
                    <Link to="/signup">
                      <SecondaryButton disabled={false}>
                        Create account
                      </SecondaryButton>
                    </Link>
                  </>
                )}
              </>
            ) : (
              <NavSkeleton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
