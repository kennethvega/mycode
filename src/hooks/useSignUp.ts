import { selectUser, login } from "./../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { checkUserWithUsername } from "../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/firebase.js";

import { useDispatch } from "react-redux";

// types

export const useSignup = () => {
  const navigate = useNavigate();

  // global state action

  const dispatch = useDispatch();
  // hook state
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);

  const signUp = async (email: string, password: string, username: string) => {
    setError(null);
    setIsPending(true);
    // check if username already exist
    const userNameTaken = await checkUserWithUsername(username);
    if (!userNameTaken) {
      try {
        // 3.signup user
        await createUserWithEmailAndPassword(auth, email, password).then(
          async ({ user }) => {
            await updateProfile(user, {
              displayName: username,
            });
            // add to database users
            await setDoc(doc(db, "users", `${user.uid}`), {
              id: user.uid,
              username: username.toLowerCase(),
              emailAddress: email.toLowerCase(),
              dateCreated: Date.now(),
              bio: "",
              photoURL: "",
            });

            dispatch(login(user));
            navigate("/");
          }
        );
        setIsPending(false);
        setError(null);

        // toast.success("Successfully created an account🎊.");
      } catch (err: any) {
        // error message
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("Email is already taken. please try again");
        } else {
          setError(err.message);
        }
        setIsPending(false);
        // toast.error(`${err.message}`);
      }
    } else {
      setError("username is already taken. please try again");
      setIsPending(false);
    }
  };
  return { signUp, error, isPending };
};
