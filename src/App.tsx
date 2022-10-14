import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// style
import "./styles/Global.scss";
import "./styles/Utility.scss";
import styles from "./App.module.scss";
// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
//
import Navbar from "./components/Header/Navbar";
// firebase
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
// global state redux
import { useDispatch, useSelector } from "react-redux";
import { authIsReady, selectAuth, selectUser } from "./features/authSlice";

function App() {
  const dispatch = useDispatch();
  const isAuthReady = useSelector(selectAuth);
  // check if authentication is ready
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // dispatch({ type: "AUTH_IS_READY", payload: user });
      dispatch(authIsReady(user));
      unsub();
    });
  }, []);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
