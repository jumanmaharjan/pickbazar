import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword } = UserAuth();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      alert("Password reset email sent!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Reset Your Password
          </h2>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleResetPassword}
              className="w-full py-3 bg-[#019376] text-white font-medium rounded-lg hover:bg-[#02cca4] transition duration-200"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
