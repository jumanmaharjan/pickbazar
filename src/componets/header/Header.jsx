import React from "react";
import { Link, Outlet } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import HeaderCart from "./HeaderCart";
import HeaderSignin from "./HeaderSignin";

function Header() {
  return (
    <>
      <header className="header-wrapper  bg-primary ">
        <div className="container">
          <div className="top-header flex items-center ">
            <figure className="brand-logo min-w-25 t-left mr-4 lg:mr-8">
              <Link to="/">
                <img src="Logo-new.png" alt="brand logo" />
              </Link>
            </figure>

            <HeaderNav />

            <div className="t-right flex gap-x-4 lg:gap-x-5 items-center justify-end">
              <HeaderSearch />
              <HeaderCart />
              <HeaderSignin />
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
