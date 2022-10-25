import { login } from "./../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { checkUserWithUsername } from "../services/firebase";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../lib/firebase";
import { auth } from "../lib/firebase.js";

import { useDispatch } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

// types

export const useSignup = () => {
  const navigate = useNavigate();

  // global state action
  const dispatch = useDispatch();
  // hook state
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);
  const signUp = async (
    email: string,
    password: string,
    username: string,
    profilePicture: any
  ) => {
    setError(null);
    setIsPending(true);
    // check if username already exist
    const userNameTaken = await checkUserWithUsername(username);
    if (!userNameTaken) {
      try {
        // 3.signup user
        await createUserWithEmailAndPassword(auth, email, password).then(
          async ({ user }) => {
            // upload image to storage
            let imageURL: string | null | undefined;
            const userRef = doc(db, "users", `${user?.uid}`);
            const fileRef = ref(storage, `${user?.uid}`);

            if (profilePicture) {
              await uploadBytes(fileRef, profilePicture);
              imageURL = await getDownloadURL(fileRef);
            } else {
              imageURL = "";
            }
            // update both profile
            await updateProfile(user, {
              displayName: username,
              photoURL: imageURL,
            });

            await setDoc(doc(db, "users", `${user.uid}`), {
              id: user.uid,
              username: username.toLowerCase(),
              emailAddress: email.toLowerCase(),
              dateCreated: Date.now(),
              bio: "",
              photoURL: imageURL,
            });

            dispatch(login(user));
            navigate("/");
            toast.success("Successfully created account🎊.");
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
