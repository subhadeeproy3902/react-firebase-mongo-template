import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const history = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      history("/role");
    }
  }, [currentUser, history]);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [notError, setNotError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { googleSignUp, isSigningIn } = useAuth();

  async function handleGoogleSignUp() {
    try {
      await googleSignUp();
      setTimeout(() => {
        history("/role");
      }, 900);
    } catch (error) {
      console.error("Google Sign Up failed:", error);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value.length < 6) {
      return setError("Passwords should have atleast 6 characters");
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      setNotError("Account created successfully. Log In");
      setSubmitted(true);
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      passwordConfirmRef.current.value = "";
      history("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already exists. Please log in");
      } else {
        setError("Failed to create an account");
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="bg-gradient-to-b from-white via-white to-sky-300 h-screen flex flex-col items-center justify-center">
        <div className="bg-gradient-to-t from-blue-200 to-blue-300 p-8 pt-6 rounded shadow-md w-96">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative"
              role="alert"
            >
              {error}
            </div>
          )}
          {submitted && notError && (
            <div
              className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 mb-4 rounded relative"
              role="alert"
            >
              {notError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 w-full border rounded"
                required
                ref={nameRef}
              />
            </div>
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

            <div className="mb-4">
              <label
                htmlFor="password-confirm"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password-confirm"
                className="mt-1 p-2 w-full border rounded"
                required
                ref={passwordConfirmRef}
              />
            </div>

            <button
              disabled={loading || notError}
              className={`w-full ${submitted && notError
                ? "bg-gray-500"
                : "bg-blue-600 hover:bg-blue-700 duration-75"
                } text-white p-2 rounded`}
              type="submit"
            >
              Sign Up
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
              disabled={loading || notError || isSigningIn}
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt=""
              />
              <span>Sign In With Google</span>
            </button>
          </div>
        </div>
        <div className="text-center text-slate-800 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800 font-bold tracking-wide">
            Log In
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;