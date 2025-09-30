import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import asgardeoLogo from "../assets/asgardeo.svg";

//C:\Users\rosni\Desktop\Projects\readify-mern-project\frontend\src\assets\asgardeo.svg

const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle, signInWithAsgardeo } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleAsgardeoSignIn = async () => {
    try {
      await signInWithAsgardeo(); // will redirect
    } catch (e) {
      alert("Asgardeo sign in failed!");
      console.error(e);
    }
  };

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Google sign in failed!");
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            />
          </div>
          {message && (
            <p className="text-xs text-red-500 italicmb-3">{message}</p>
          )}
          <div>
            <button className="px-8 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none">
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 mb-4 text-sm font-medium align-baseline">
          Haven't an account? Please
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            {" "}
            Register
          </Link>
        </p>

        <div>
          {/*Google Sign-in*/}
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 font-bold text-black bg-gray-300 rounded hover:bg-blue-700 focus:outline-none"
          >
            <FaGoogle />
            <span>Sign in with Google</span>
          </button>

          {/*Asgardeo Sign-in*/}
          <button
            onClick={handleAsgardeoSignIn}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 font-bold text-black bg-gray-300 rounded hover:bg-blue-700 focus:outline-none"
          >
            <img src={asgardeoLogo} alt="Asgardeo" width={20} height={20} />
            <span>Sign in with Asgardeo</span>
          </button>
        </div>
        <p className="mt-5 text-xs text-center text-gray-500">
          &copy; 2025 Readify. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
