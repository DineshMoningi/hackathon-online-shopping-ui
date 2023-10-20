import React from "react";
import { githubLogo, googleLogo } from "../assets";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/gapSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        dispatch(
          addUser({
            _id: result.user.uid,
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
        toast.success("Logedin successfully!");
      })
      .catch((error) => {
        toast.error("Logedin failed!");
      });
  };

  const handleGoogleLogout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then((result) => {
        console.log("Google user logout successfully");
        toast.success("Logedout successfully!");
        dispatch(removeUser());
      })
      .catch((error) => {
        console.error(error);
        toast.error("Logout failed!");
      });
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
      <div className="w-full flex items-center justify-center gap-10">
        <div
          onClick={handleGoogleLogin}
          className="text-base  w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
        >
          <img className="w-8" src={googleLogo} alt="googleLogo" />
          <span className="text-sm text-gray-900">Sign in with google</span>
        </div>
        <button
          onClick={handleGoogleLogout}
          className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
        >
          Sign Out
        </button>
      </div>
      <div className="w-full flex items-center justify-center gap-10">
        <div className="text-base  w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300">
          <img className="w-8" src={githubLogo} alt="githubLogo" />
          <span className="text-sm text-gray-900">Sign in with Github</span>
        </div>
        <button className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Login;
