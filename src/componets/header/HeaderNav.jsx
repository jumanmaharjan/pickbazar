import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuData } from "./menudata";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";

function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav
      className={
        menuOpen
          ? "fixed top-0 left-0 right-0 bottom-0 z-10 bg-white"
          : "md:relative grow"
      }
    >
      {/* Mobile Toggle */}
      <div className="md:hidden md:top-0 md:right-0 flex justify-end p-4">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      <ul
        className={`md:flex items-center capitalize  gap-4 
        ${menuOpen ? "block" : "hidden"} 
        md:block bg-white md:bg-transparent px-4 md:px-0`}
      >
        {menuData.map((item) => (
          <li key={item.label} className="relative py-3 md:py-6 group">
            <div
              className={`flex items-center gap-2 cursor-pointer ${menuOpen ? "justify-between" : ""}`}
              onClick={() => item.children && toggleDropdown(item.label)}
            >
              <NavLink to={item.path}>{item.label}</NavLink>
              {item.children && <IoIosArrowDown size={14} />}
            </div>

            {/* Dropdown */}
            {item.children && (
              <ul
                className={`
                md:absolute md:top-full md:left-0
                bg-white rounded shadow-xl w-56 px-3 py-2
                md:opacity-0 md:invisible
                md:group-hover:opacity-100 md:group-hover:visible
                transition-all duration-200
                ${openDropdown === item.label ? "block" : "hidden md:block"}
                `}
              >
                {item.children.map((child) => (
                  <li key={child.label} className="py-2">
                    <NavLink to={child.path}>{child.label}</NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default HeaderNav;
