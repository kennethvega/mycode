import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./../features/authSlice";
import { toast } from "react-toastify";
export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const loginUser = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch(login(res.user));
        setIsPending(false);
        setError(null);
        navigate("/");
        toast.success("Successfully logged in.");
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { loginUser, error, isPending };
};
