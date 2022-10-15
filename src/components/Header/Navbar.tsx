import Tippy from "@tippyjs/react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import SecondaryButton from "../Buttons/SecondaryButton";

import styles from "./Navbar.module.scss";
import Theme from "./Theme";
// redux
import { useSelector } from "react-redux";
import { selectUser } from "../../features/authSlice";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
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
            {user ? (
              <>
                <Tippy content="Create account">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
