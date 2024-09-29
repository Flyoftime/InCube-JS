import { signIn } from "next-auth/react";
import React, { useState } from "react";

const Navbar = ({ scrollTop }: { scrollTop: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={
        scrollTop < 50
          ? `navbar bg-transparent max-w-screen w-full flex fixed top-0 left-0 right-0 z-50 justify-between items-center px-6 py-4 transition-colors duration-200`
          : `navbar bg-[#ffb800] max-w-screen w-full flex fixed top-0 left-0 right-0 z-50 justify-between items-center px-6 py-4 transition-colors duration-500`
      }
    >
      <div className="flex-1">
        <img src="/assets/logo2 2.png" alt="Logo" className="h-12" />
      </div>

      {/* Hamburger Button */}
      <div className="block lg:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:flex flex-col lg:flex-row gap-4 absolute lg:static top-full left-0 w-full lg:w-auto bg-[#ffb800] lg:bg-transparent transition-all duration-500 `}
      >
        <a
          href="/"
          className="block text-white font-bold hover:underline transition-all duration-100 py-1 pl-6"
        >
          Home
        </a>
        <a
          href="/features"
          className="block text-white font-bold hover:underline transition-all duration-100 py-1 pl-6"
        >
          Features
        </a>
        <a
          href="/about"
          className="block text-white font-bold hover:underline transition-all duration-100 py-1 pl-6"
        >
          About
        </a>
        <a
          href="/login"
          className="block text-[#B21616] font-bold hover:underline transition-all duration-100 py-1 pl-6"
        >
          Sign In
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
