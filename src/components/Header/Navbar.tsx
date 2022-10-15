import Tippy from "@tippyjs/react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  return (
    <nav className={styles.container}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.logo} onClick={() => navigate("/")}>
            {logo}
          </h1>

          <div className={styles["navbar-right-content"]}>
            {user ? (
              <>
                <Tippy content="Create account">
                  <div>
                    <IoMdAdd
                      className={styles.icon}
                      onClick={() => navigate("/create")}
                    />
                  </div>
                </Tippy>
                <Theme />
                <ProfileDropDown />
              </>
            ) : (
              <>
                <Theme />
                <p onClick={() => navigate("/login")}>Login</p>
                <SecondaryButton
                  disabled={false}
                  onClick={() => navigate("/signup")}
                >
                  Create account
                </SecondaryButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
