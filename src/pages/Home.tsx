import styles from "./Home.module.scss";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import {
  BsFileEarmarkCodeFill,
  BsFileEarmarkCode,
  BsFillPersonFill,
  BsPerson,
} from "react-icons/bs";
import Button from "../components/Buttons/Button";
import OutlineBtn from "../components/Buttons/OutlineBtn";
const Home = () => {
  const loggedIn = false;
  return (
    <section className={styles[`home-container`]}>
      <div className={styles["side-bar"]}>
        {loggedIn ? (
          <>
            <div className={styles["side-bar-links"]}>
              <p>
                <AiFillHome />
                <strong> Home</strong>
              </p>
              <p>
                <BsFileEarmarkCode />
                My documents
              </p>
              <p>
                <BsPerson />
                Profile
              </p>
            </div>
            {/* add functionality later */}

            <Button>Create a document</Button>
          </>
        ) : (
          <>
            <p className={styles["welcome-message"]}>
              Welcome to <strong>Mycodego 👋</strong>This app is a documentation
              platform for developers. Login to create your own coding
              documentation and share it to the world.
            </p>
            <Button>Demo account</Button>
            <OutlineBtn>Create account</OutlineBtn>
            <p className={styles.login}>Login</p>
          </>
        )}

        <p className="footer-mark">Built and designed by Kenneth Vega</p>
      </div>
      <div>right</div>
    </section>
  );
};

export default Home;
