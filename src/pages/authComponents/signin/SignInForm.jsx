import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { supabase } from "../../../SupabaseClient";
import { FcGoogle } from "react-icons/fc";

function SignInForm() {
  const { signInUser } = UserAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted:", formData);
      const { session, error } = await signInUser(
        formData.email,
        formData.password,
      );
      if (error) {
        setErrors(error);

        // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
        setTimeout(() => {
          setErrors("");
        }, 3000); // 3000 milliseconds = 3 seconds
      } else {
        navigate("/");
      }

      if (session) {
        setErrors("");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div className="signin-wrapper m-auto text-center flex items-center shadows justify-center bg-white max-w-250">
      <figure className="sm:basis-[60%] basis-[40%]">
        <img src="assets/img/login.png" alt="Login illustration" />
      </figure>
      <div className="sm:basis-[40%] basis-[60%]">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col justify-center gap-3 sm:py-10 sm:px-12 p-6"
        >
          <figure className="brand-logo mx-auto">
            <img src="Logo-new.png" alt="Brand logo" />
          </figure>

          <h3>Welcome Back!</h3>

          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="bold-green">
              Create Account
            </Link>
          </p>

          <div className="block">
            <label
              htmlFor="email"
              className="block text-left font-normal text-sm mb-3 cursor-pointer text-brand-dark text-opacity-70"
            >
              Email Address
            </label>
            <input
              id="email"
              className="py-2 px-4 w-full border text-input text-13px font-body rounded min-h-12"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="block">
            <label
              htmlFor="password"
              className="block text-left font-normal text-sm mb-3 cursor-pointer text-brand-dark text-opacity-70"
            >
              Password
            </label>
            <input
              id="password"
              className="py-2 px-4 w-full border text-input text-13px font-body rounded min-h-12"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="button"
            className="inline-block text-sm text-primary-color"
          >
            Forgot password?
          </button>

          <button
            type="submit"
            className="block cursor-pointer bg-primary-color p-3 text-white rounded w-full"
          >
            Sign in
          </button>
        </form>
        <div className="flex items-center justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-2 px-4 py-2 transition"
          >
            <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
