import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
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
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
// firebase
import { auth, db } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
// global state redux
import { useDispatch, useSelector } from "react-redux";
import { authIsReady, selectAuth, selectUser } from "./features/authSlice";
import Profiles from "./pages/Profiles";
import EditProfile from "./components/EditProfile";
import { Document } from "./pages/Document";
import EditDocument from "./components/EditDocument";
import RootLayout from "./pages/RootLayout";
import {
  collectionGroup,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { postToJSON } from "./services/firebase";
import PostFeed from "./components/PostFeed";

function App() {
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState<DocumentData | undefined>();

  const user = useSelector(selectUser);
  const authUser = useSelector(selectAuth);

  useEffect(() => {
    const q = query(collectionGroup(db, "posts"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const postsData: DocumentData = [];
      snapshot.forEach((doc) => {
        postsData.push(postToJSON(doc));
      });
      setDocuments(postsData);
    });
  }, [db]);

  console.log(documents);

  // check if authentication is ready
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(authIsReady(user));
      unsub();
    });
  }, [auth]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home documents={documents} />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/signup" element={user ? <Home /> : <SignUp />} />
          <Route path="/create" element={<CreateDocument />} />
          {/* dynamic routes */}
          <Route path="/profile/:id" element={<Profiles />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
          <Route path="/document/:id/:slug" element={<Document />} />
          <Route path="/edit/:id/:slug" element={<EditDocument />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
