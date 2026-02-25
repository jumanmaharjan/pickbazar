import React, { useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { UserAuth } from "../../context/AuthContext";
import Signin from "../../pages/authComponents/signin/Signin";
import SignOut from "../../pages/authComponents/SignOut";

function HeaderSignin() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState(null);

  const { session } = UserAuth();
  const user = session?.user;

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single(); // expect one row

      if (!error && data) {
        setUsername(data.username);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <>
      {!user ? (
        <>
          <div
            onClick={() => setShow(true)}
            className="signin-wrapper flex items-center gap-1.5 cursor-pointer"
          >
            <FaRegUserCircle className="w-5 h-5" />
            <span className="hidden lg:inline-block">Signin</span>
          </div>

          {show && (
            <div
              onClick={() => setShow(false)}
              className="fixed flex justify-center items-center inset-0 h-full w-full bg-gray-700/70 z-10"
            >
              <IoClose
                onClick={(e) => {
                  e.stopPropagation();
                  setShow(false);
                }}
                className="absolute top-[5%] right- text-2xl cursor-pointer primary-color"
              />
              <div onClick={(e) => e.stopPropagation()}>
                <Signin />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="signin-wrapper group flex items-center gap-1.5 relative">
          <FaRegUserCircle className="w-5 h-5" />
          <span className="hidden lg:inline-block">
            Hi, {username || user.email}
          </span>

          <div
            className="absolute w-[320px] top-full  left-1/2 -translate-x-1/2
                  opacity-0 group-hover:opacity-100
                  pointer-events-none group-hover:pointer-events-auto
                  transition-all duration-200
                  text-center p-2 rounded border bg-white shadow-md"
          >
            <SignOut />
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderSignin;
