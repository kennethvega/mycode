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
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
const Home = () => {
  const loggedIn = false;
  const navigate = useNavigate();
  return (
    <section className={styles[`home-container`]}>
      <div className={styles["side-bar"]}>
        {loggedIn ? (
          <>
            <div className={styles["side-bar-links"]}>
              <p>
                <AiFillHome />
                <strong>Home</strong>
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

            <Button disabled={false}>Create a document</Button>
          </>
        ) : (
          <>
            <p className={styles["welcome-message"]}>
              Welcome to <strong>Mycode👋</strong>This app is a documentation
              platform for developers. Login to create your own coding
              documentation and share it to the world.
            </p>
            <Button disabled={false}>Demo account</Button>
            <OutlineBtn disabled={false} onClick={() => navigate("/signup")}>
              Create account
            </OutlineBtn>
            <p onClick={() => navigate("/login")} className={styles.login}>
              Login
            </p>
          </>
        )}

       <Footer/>
      </div>
      <div>right</div>
    </section>
  );
};

export default Home;
