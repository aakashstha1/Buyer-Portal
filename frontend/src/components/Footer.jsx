import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-6 text-center text-sm text-gray-400">
      &copy; {new Date().getFullYear()} RealEstate. All rights reserved.
    </footer>
  );
}

export default Footer;
