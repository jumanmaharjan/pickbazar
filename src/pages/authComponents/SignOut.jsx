import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const { signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SignOut;
