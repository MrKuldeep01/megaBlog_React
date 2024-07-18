import React, { useState } from "react";
import { login } from "../../store/authSlice";
import authService from "../appwrite/auth_service";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Signup = () => {
  const {register,handleSubmit,} = useForm()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function submitHandler(data) {
    setError("");
    try {
      const user = await authService.createAccount(data);
      if (user) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login((userData = currentUser)));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-slate-300 rounded-xl p-10 border border-black/40  `}
      >
        <div className="logo mb-2 flex justify-center">
          <span className="max-w-[100px] inline-block w-full">
            <Logo />
          </span>
        </div>
        <h2 className="text-cente text-2xl font-semibold"> Sign up </h2>
        <Link
          to="/login"
          className="font-medium transition-all duration-200 hover:underline mt-2 text-primary text-black/60"
        >
          Login if have an account
        </Link>
        {error && (
          <p className="errorMessage px-4 py-2 text-red-700 font-semibold text-center">
            {error}
          </p>
        )}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="mt-6"
        >
            <Input type="text" placeholder="full name please " label="Name : " {...register("name",{required:true})} />
          <Input
            type="email"
            placeholder="email"
            label="Email : "
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>(
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                    value
                  ) || "please enter properly!"),
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
          <Button children="Create Account" type="submit" className="w-full" />
        </form>
      </div>
    </div>
  );
};

export default Signup;