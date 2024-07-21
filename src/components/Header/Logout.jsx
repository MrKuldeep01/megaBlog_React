import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth_service";
import { logout } from "../../../store/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then((result) => {
      if (result === true) {
        dispatch(logout());
      }
    });
  };
  return <button onClick={logoutHandler} className=" px-3 py-2 bg-black/70 text-white rounded-lg duration-200 hover:bg-black text-sm sm:text-base "> Logout </button>;
};

export default Logout;
