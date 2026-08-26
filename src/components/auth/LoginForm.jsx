import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { authService } from "../../api/appwrite";
import { login as authLogin } from "../../store/slices/authSlice";
import { Button, Input, Logo } from "../common";

const EMAIL_PATTERN =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [error, setError] = useState("");

  const submitHandler = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-10">
      <div className="mx-auto w-full max-w-sm bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col items-center text-center mb-6">
          <Logo className="w-14 h-14 mb-3" />
          <h1 className="text-xl font-semibold text-slate-900">Sign in</h1>
          <p className="text-sm text-slate-500 mt-1">
            New here?{" "}
            <Link to="/signup" className="text-indigo-600 font-medium hover:text-indigo-700">
              Create an account
            </Link>
          </p>
        </div>

        {error && (
          <p className="mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="you@example.com"
            label="Email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => EMAIL_PATTERN.test(value) || "Please enter a valid email",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: true,
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
