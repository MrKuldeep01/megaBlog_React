import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth_service";
import { useForm } from "react-hook-form";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const submitHandler = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="logo mb-2 flex justify-center">
          <span className="max-w-[100px] inline-block w-full">
            <Logo />
          </span>
        </div>
        <h2 className="text-cente text-2xl font-semibold"> Sign in </h2>
        <Link
          to="/signup"
          className="font-medium transition-all duration-200 hover:underline mt-2 text-primary text-black/60"
        >
          register if new
        </Link>
        {error && (
          <p className="errorMessage px-4 py-2 text-red-700 font-semibold text-center">
            {error}
          </p>
        )}
        <form
          action="#"
          onSubmit={handleSubmit(submitHandler)}
          className="mt-8"
        >
          <Input
            type="email"
            placeholder="email"
            label="Email : "
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                    value
                  ) || "please enter properly!",
              },
            })}  
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
