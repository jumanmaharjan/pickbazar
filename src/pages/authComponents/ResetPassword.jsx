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
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;
