import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

function HeaderSignin() {
  return (
    <>
      <div className="signin-wrapper flex items-center justify-center gap-1.5 ">
        <figure className="signin-logo">
          <FaRegUserCircle className="w-5 h-5" />
        </figure>
        <span className="signin-text hidden lg:inline-block">Signin</span>
      </div>
    </>
  );
}

export default HeaderSignin;
