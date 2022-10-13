import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { checkUserWithUsername } from "../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/firebase.js";
import { useAppSelector, useAppDispatch } from "../app/appHooks";
// types

export const useSignup = () => {
  const navigate = useNavigate();
  // global state
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  // hook state
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (email: string, password: string, username: string) => {
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

            dispatch({ type: "LOGIN", payload: user });
            // router.push("/");
          }
        );
        setIsPending(false);
        setError(null);
        navigate("/");
        // toast.success("Successfully created an account🎊.");
      } catch (err: any) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
        // toast.error(`${err.message}`);
      }
    } else {
      setError("username is already taken. please try again");
      setIsPending(false);
    }
  };
  return { signup, error, isPending };
};
