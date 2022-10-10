import { IoMdAdd } from "react-icons/io";
import OutlineBtn from "../Buttons/OutlineBtn";

import styles from "./Navbar.module.scss";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.logo}>MYCODEGO</h1>
          <div className={styles["navbar-right-content"]}>
            {/* <IoMdAdd className={styles.icon} title="Create a document" /> */}
            <Theme />
            <p>Login</p>
            <OutlineBtn onClick={() => {}}>Create account</OutlineBtn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
