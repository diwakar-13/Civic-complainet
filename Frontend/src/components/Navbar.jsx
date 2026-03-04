import React, { useState } from "react";

const Navbar = ({ openLogin, openSignup }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="relative py-4 md:py-6 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <a
              href="#home"
              className="text-gray-900 flex text-3xl font-bold tracking-wide"
            >
              Smart civic
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-gray-900"
            >
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10">
            <div className="flex items-center space-x-12">
              <a
                href="#home"
                className="text-base font-medium text-gray-900 hover:text-opacity-50"
              >
                Home
              </a>
              <a
                href="#feature"
                className="text-base font-medium text-gray-900 hover:text-opacity-50"
              >
                Features
              </a>
              <a
                href="#howItWork"
                className="text-base font-medium text-gray-900 hover:text-opacity-50"
              >
                How it works?
              </a>
            </div>

            <div className="w-px h-5 bg-gray-300"></div>

            <button
              onClick={openLogin}
              className="cursor-pointer text-base font-medium text-gray-900 hover:text-opacity-50"
            >
              Login
            </button>

            <button
              onClick={openSignup}
              className="cursor-pointer px-5 py-2 text-base font-semibold text-gray-900 border border-gray-900 rounded-xl hover:bg-gray-900 hover:text-white transition-all"
            >
              Create free account
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileOpen && (
          <div className="lg:hidden mt-4 px-4 z-50 absolute right-0">
            <div className="bg-gray-300 shadow-lg rounded-xl p-6 space-y-5 ">
              <a href="#home" className="block text-gray-900">
                Home
              </a>

              <a href="#feature" className="block text-gray-900">
                Features
              </a>

              <a href="#howItWork" className="block text-gray-900">
                How it works?
              </a>

              <div className="border-t pt-4 space-y-4">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    openLogin();
                  }}
                  className="block w-full text-left text-gray-900"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    openSignup();
                  }}
                  className="md:block w-full text-left border border-gray-900 rounded-lg px-4 py-2"
                >
                  Create free account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
