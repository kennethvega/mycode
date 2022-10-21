import { useEffect } from "react";
import {
  Routes,
  Route,
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
import Navbar from "./components/Header/Navbar";
// firebase
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
// global state redux
import { useDispatch, useSelector } from "react-redux";
import { authIsReady, selectAuth, selectUser } from "./features/authSlice";
import Profiles from "./pages/Profiles";
import EditProfile from "./components/EditProfile";
import { Document } from "./pages/Document";
import EditDocument from "./components/EditDocument";
import RootLayout from "./pages/RootLayout";

function App() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const authUser = useSelector(selectAuth);

  // check if authentication is ready
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(authIsReady(user));
      unsub();
    });
  }, [auth]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/signup" element={user ? <Home /> : <SignUp />} />
        <Route path="/create" element={<CreateDocument />} />

        <Route path="profile/:id" element={<Profiles />} />
        <Route path="/document/:id/:slug" element={<Document />} />
        <Route path="/edit/:id/:slug" element={<EditDocument />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
