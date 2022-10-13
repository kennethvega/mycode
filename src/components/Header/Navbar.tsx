import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "../Buttons/SecondaryButton";

import styles from "./Navbar.module.scss";
import Theme from "./Theme";

const Navbar = () => {
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
            {/* <IoMdAdd className={styles.icon} title="Create a document" /> */}
            <Theme />
            <p onClick={() => navigate("/login")}>Login</p>
            <SecondaryButton onClick={() => navigate("/signup")}>
              Create account
            </SecondaryButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
