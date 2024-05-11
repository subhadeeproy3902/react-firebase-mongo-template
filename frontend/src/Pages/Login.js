import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Login = () => {

  const { currentUser } = useAuth();
  const history = useNavigate();

  useEffect(() => {
    if (currentUser) {
      history("/role");
    }
  }, [currentUser, history]);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { googleSignUp, isSigningIn } = useAuth();

  async function handleGoogleSignUp() {
    try {
      await googleSignUp();
      setTimeout(() => {
        history("/role");
      }, 2000);
    }
    catch (error) {
      console.error("Google Sign Up failed:", error);
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setTimeout(() => {
        history("/role");
      }, 900);
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        setError("Wrong email or password");
      } else {
        setError("Email does not exist. Sign Up");
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="bg-gradient-to-b from-white via-white to-sky-300 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-gradient-to-t from-blue-200 to-blue-300 p-8 rounded shadow-md w-96">
          <h2 className="text-3xl font-bold mb-8 text-center">Log In</h2>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border rounded"
                required
                ref={emailRef}
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 p-2 w-full border rounded"
                required
                ref={passwordRef}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute text-slate-500 right-1 flex justify-center items-center h-[30px] w-[50px] top-7 cursor-pointer bg-white"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 duration-75 text-white p-2 rounded"
              type="submit"
            >
              Log In
            </button>
          </form>
          <div className="mt-4 text-center">
            <div className="flex items-center mb-2">
              <div className="w-full h-px bg-gray-600"></div>
              <div className="text-center text-gray-500 px-5 text-sm font-bold">
                Or
              </div>
              <div className="w-full h-px bg-gray-600"></div>
            </div>

            <button
              className="w-full px-4 py-2 bg-slate-800 border flex gap-4 justify-center items-center border-slate-700 rounded-lg text-slate-200 hover:border-slate-500 hover:text-slate-300 hover:shadow transition duration-150"
              onClick={handleGoogleSignUp}
              disabled={loading || isSigningIn}
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt=""
              />
              <span>Log In With Google</span>
            </button>
          </div>
        </div>
        <div className="text-center text-slate-800 mt-4">
          Need an account?{" "}
          <Link to="/signup" className="text-blue-800 font-bold tracking-wide">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
