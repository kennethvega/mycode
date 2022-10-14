import styles from "./Home.module.scss";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import {
  BsFileEarmarkCodeFill,
  BsFileEarmarkCode,
  BsFillPersonFill,
  BsPerson,
} from "react-icons/bs";

import Button from "../components/Buttons/PrimaryButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useLogin } from "../hooks/useLogin";
import LoadingSpinner from "../components/LoadingSpinner";
const Home = () => {
  const { loginUser, error, isPending } = useLogin();
  const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
  const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;

  const handleDemoLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await loginUser(demoEmail, demoPassword);
  };
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
            {isPending ? (
              <Button disabled={true}>
                <LoadingSpinner />
              </Button>
            ) : (
              <Button disabled={false} onClick={handleDemoLogin}>
                Demo account
              </Button>
            )}

            <SecondaryButton
              disabled={false}
              onClick={() => navigate("/signup")}
            >
              Create account
            </SecondaryButton>
            <p onClick={() => navigate("/login")} className={styles.login}>
              Login
            </p>
          </>
        )}

        <Footer />
      </div>
      <div>right</div>
    </section>
  );
};

export default Home;
