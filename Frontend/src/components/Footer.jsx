import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Smart Civic Complaint Management System.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
