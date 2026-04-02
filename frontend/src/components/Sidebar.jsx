import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Heart,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "My Favourites", path: "/favourites", icon: <Heart size={20} /> },
  ];

  return (
    <div
      className={`bg-white border-r border-gray-100 h-screen flex flex-col mt-16 shrink-0 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-56" : "w-16"
      }`}
    >
      {/* Toggle button */}
      <div className="flex items-center justify-end px-3 py-3 border-b border-gray-100">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex flex-col gap-1 p-2 mt-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <div
                className={`shrink-0 ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              >
                {item.icon}
              </div>

              <span
                className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  sidebarOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
                }`}
              >
                {item.name}
              </span>

              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
