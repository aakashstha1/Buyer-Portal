import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Heart, LayoutDashboardIcon } from "lucide-react";
function Sidebar() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboardIcon /> },
    {
      name: "My Favourites",
      path: "/favourites",
      icon: <Heart />,
    },
  ];
  return (
    <div
      className={`bg-white shadow-lg h-screen flex flex-col transition-width duration-300 mt-16 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-center px-4 py-3 border-b">
        <button
          className="text-gray-600 hover:text-gray-800 transition"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "⬅ Collapse" : "➡"}
        </button>
      </div>

      <nav className="mt-4 flex flex-col flex-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-2 rounded-md m-1 hover:bg-indigo-100 transition-colors duration-200 ${
              location.pathname === item.path
                ? "bg-indigo-200 font-semibold"
                : ""
            }`}
          >
            <div className="flex-shrink-0">{item.icon}</div>

            <span
              className={`ml-2 overflow-hidden transition-all duration-300 ${
                sidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
