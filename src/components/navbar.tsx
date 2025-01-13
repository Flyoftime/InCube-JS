import { useState } from "react";
import { signIn } from "next-auth/react";

const Navbar = ({ scrollTop }: { scrollTop: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`navbar ${
        scrollTop < 50 ? "bg-transparent" : "bg-[#ffb800]"
      } max-w-screen w-full flex fixed top-0 left-0 right-0 z-50 justify-between items-center px-6 md:px-12 py-2 transition-colors duration-500`}
    >
      {/* Logo */}
      <div className="flex-1">
        <img src="/assets/logo2 2.png" alt="Logo" className="h-10 md:h-12" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4">
        <a
          href="/"
          className="text-white font-bold hover:underline transition-all duration-100"
        >
          Home
        </a>
        <a
          href="/features"
          className="text-white font-bold hover:underline transition-all duration-100"
        >
          Features
        </a>
        <a
          href="/about"
          className="text-white font-bold hover:underline transition-all duration-100"
        >
          About
        </a>
        <a
          href="/login"
          className="text-[#B21616] font-bold hover:underline transition-all duration-100"
        >
          Sign In
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#ffb800] flex flex-col items-center gap-4 py-4 md:hidden">
          <a
            href="/"
            className="text-white font-bold hover:underline transition-all duration-100"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="/features"
            className="text-white font-bold hover:underline transition-all duration-100"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a
            href="/about"
            className="text-white font-bold hover:underline transition-all duration-100"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="/login"
            className="text-[#B21616] font-bold hover:underline transition-all duration-100"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
