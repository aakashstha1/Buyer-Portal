import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 py-4 text-center text-gray-600">
      &copy; {new Date().getFullYear()} My Real Estate Portal. All rights
      reserved.
    </footer>
  );
}

export default Footer;
