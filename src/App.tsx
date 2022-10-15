import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// style
import "./styles/Global.scss";
import "./styles/Utility.scss";
import "./styles/TextEditor.scss";
import styles from "./App.module.scss";
import "tippy.js/dist/tippy.css";
// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import CreateDocument from "./pages/CreateDocument";
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
  const user = useSelector(selectUser);
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
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/signup" element={user ? <Home /> : <SignUp />} />
          <Route
            path="/create"
            element={!user ? <Login /> : <CreateDocument />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
