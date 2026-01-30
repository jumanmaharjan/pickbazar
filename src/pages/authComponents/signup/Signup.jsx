import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

const Signup = () => {
  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    country: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone) newErrors.phone = "Phone number is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const result = await signUpNewUser(formData);

      if (result?.success) {
        navigate("/");
      } else {
        setError(result?.error?.message || "Signup failed");
      }
    } catch {
      setError("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4">
      <form onSubmit={handleSignUp} className="max-w-250 m-auto pt-24">
        <h2 className="font-bold text-xl pb-2">Create Account</h2>
        <p className="pb-4">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
        <div className="grid grid-cols-2 gap-x-7">
          {/* Username */}
          <div className="flex flex-col py-2">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 border rounded  border-gray-500"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username}</span>
            )}
          </div>

          {/* First Name */}
          <div className="flex flex-col py-2">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="p-2 border rounded border-gray-500"
            />
            {errors.firstname && (
              <span className="text-red-500 text-sm">{errors.firstname}</span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col py-2">
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="p-2 border rounded border-gray-500"
            />
            {errors.lastname && (
              <span className="text-red-500 text-sm">{errors.lastname}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col py-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded border-gray-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col py-2">
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 border rounded border-gray-500"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col py-2">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="p-2 border rounded border-gray-500"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}
          </div>

          {/* Country */}
          <div className="flex flex-col py-2">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="p-2 border rounded border-gray-500"
            />
            {errors.country && (
              <span className="text-red-500 text-sm">{errors.country}</span>
            )}
          </div>

          {/* State */}
          <div className="flex flex-col py-2">
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="p-2 border rounded border-gray-500"
            />
            {errors.state && (
              <span className="text-red-500 text-sm">{errors.state}</span>
            )}
          </div>

          {/* City */}
          <div className="flex flex-col py-2">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="p-2 border rounded border-gray-500"
            />
            {errors.city && (
              <span className="text-red-500 text-sm">{errors.city}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col py-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border rounded border-gray-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col py-2">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-2 border rounded border-gray-500"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-black text-white py-3 rounded"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {error && <p className="text-red-600 text-center pt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
