import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        console.log("user signed out");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { logoutUser };
};
