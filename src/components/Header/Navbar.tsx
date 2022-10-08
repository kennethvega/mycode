import { IoMdAdd } from "react-icons/io";
import Button from "../Buttons/Button";
import OutlineBtn from "../Buttons/OutlineBtn";
import Container from "../Container";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <Container>
        <div className={styles.content}>
          <h1 className={styles.logo}>MYCODEGO</h1>
          <div className={styles["navbar-right-content"]}>
            {/* <IoMdAdd className={styles.icon} title="Create a document" /> */}
            <p>Login</p>
            <OutlineBtn onClick={() => {}}>Create account</OutlineBtn>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
