import { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import {
  BsFileEarmarkCodeFill,
  BsFillPersonFill,
  BsFileEarmarkCode,
} from "react-icons/bs";
// components
import LoadingSpinner from "../components/utility/LoadingSpinner";
import Button from "../components/Buttons/PrimaryButton";
import PostFeed from "../components/PostFeed";
import Footer from "../components/Footer";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
// redux
import { useSelector } from "react-redux";
import { selectAuth, selectUser } from "../features/authSlice";
// skeleton

import HomeSidebarSkeleton from "../components/skeletons/HomeSidebarSkeleton";
import { DocumentData } from "firebase/firestore";

const Home = ({ documents }: DocumentData) => {
  const { loginUser, isPending } = useLogin();
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);
  const [activeLink, setActiveLink] = useState<string>("home");

  // demo
  const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
  const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;
  const handleDemoLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await loginUser(demoEmail, demoPassword);
  };
  const navigate = useNavigate();

  // filter users document only
  const userDocs: DocumentData = [];
  if (documents) {
    documents.forEach((item: DocumentData) => {
      if (item.id === user?.uid) {
        userDocs.push(item);
      }
    });
  }
  console.log(userDocs);
  return (
    <section className={styles[`home-container`]}>
      <div className={styles["side-bar"]}>
        {/* if auth === false then return SkeletonSidebar */}
        {auth ? (
          <>
            {user && (
              <>
                <div className={styles["side-bar-links"]}>
                  <p
                    onClick={() => setActiveLink("home")}
                    className={`${
                      activeLink == "home" ? `${styles.active}` : " "
                    }`}
                  >
                    {activeLink == "home" ? <AiFillHome /> : <AiOutlineHome />}
                    Home
                  </p>
                  <p
                    onClick={() => setActiveLink("docs")}
                    className={`${
                      activeLink == "docs" ? `${styles.active}` : " "
                    }`}
                  >
                    {activeLink == "docs" ? (
                      <BsFileEarmarkCodeFill />
                    ) : (
                      <BsFileEarmarkCode />
                    )}
                    My documents
                  </p>
                  <Link to={`/profile/${user.uid}`}>
                    <p>
                      <BsFillPersonFill />
                      Profile
                    </p>
                  </Link>
                </div>

                <Button disabled={false} onClick={() => navigate("/create")}>
                  Create a document
                </Button>
              </>
            )}
            {!user && (
              <>
                <p className={styles["welcome-message"]}>
                  Welcome to <strong>Mycode👋</strong>This app is a
                  documentation platform for developers. Login to create your
                  own coding documentation and share it to the world.
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
                <Link to="/signup" className={styles.link}>
                  <SecondaryButton disabled={false}>
                    Create account
                  </SecondaryButton>
                </Link>
                <Link to="/login" className={styles.login}>
                  Login
                </Link>
              </>
            )}
          </>
        ) : (
          <HomeSidebarSkeleton />
        )}
        <Footer />
      </div>
      <PostFeed documents={activeLink == "home" ? documents : userDocs} />
    </section>
  );
};

export default Home;
