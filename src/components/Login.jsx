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
        const userData = await authService.getCurrentUser();
        if (userData) {
          console.log(userData);
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
        className={`mx-auto w-full max-w-lg bg-zinc-800/90 rounded-xl p-10 border border-black/40  `}
      >
        <div className="logo mb-2 flex justify-between items-center w-full">
          <div className="left">
            <h2 className="text-cente text-2xl font-semibold"> Sign in </h2>
            <Link
              to="/signup"
              className="font-medium transition-all duration-200 hover:underline mt-2 text-primary text-blue-600/40"
            >
              Register if new
            </Link>
          </div>
          <Logo className="w-[80px]" />
        </div>
        {error && (
          <p className="errorMessage px-4 py-2 text-red-700 font-semibold text-center">
            {error}
          </p>
        )}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="mt-6 flex-col justify-center gap-2"
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
          <Input
            label="Password"
            type="password"
            placeholder="password please"
            {...register("password", {
              required: true,
              minLength: 6 || "password must have atleast 6 digits!",
            })}
          />
          <Button children="Submit" type="submit" className="w-full my-4" />
        </form>
      </div>
    </div>
  );
};

export default Login;
