import React, { useState } from "react";
import {
  SquarePen,
  ClipboardList,
  LogOut,
  Menu,
  PanelLeft,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useAuth } from "../context/authContext";
import { NavLink, Outlet } from "react-router-dom";

const ComponentName = () => {
  const { logout, user } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ===============================
  // ROLE BASED MENU CONFIG
  // ===============================
  const menuByRole = {
    USER: [
      {
        name: "Submit Complaint",
        path: "/dashboard/submit-complaint",
        icon: SquarePen,
      },
      {
        name: "My Complaints",
        path: "/dashboard/my-complaint",
        icon: ClipboardList,
      },
    ],

    ADMIN: [
      {
        name: "Overview",
        path: "/dashboard/admin-overview",
        icon: LayoutDashboard,
      },
      {
        name: "All Complaints",
        path: "/dashboard/admin-complaints",
        icon: ClipboardList,
      },
    ],

    SUPER_ADMIN: [
      {
        name: "Overview",
        path: "/dashboard/admin-overview",
        icon: LayoutDashboard,
      },
      {
        name: "All Complaints",
        path: "/dashboard/admin-complaints",
        icon: ClipboardList,
      },
      {
        name: "Manage Admins",
        path: "/dashboard/manage-admins",
        icon: Users,
      },
    ],
  };

  const menuItems = menuByRole[user?.role] || [];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Hamburger */}
      <div
        className={`md:hidden fixed top-4 left-4 z-50 ${
          isMobileOpen ? "hidden" : "block"
        }`}
      >
        <button
          onClick={() => setIsMobileOpen(true)}
          className="text-gray-900 active:scale-95"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform bg-white shadow-lg transition-all duration-300
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${isCollapsed ? "md:w-20" : "md:w-64"}
        md:relative md:flex md:flex-col`}
      >
        <div className="flex flex-col h-full pt-5">
          {/* Logo + Toggle */}
          <div className="flex items-center justify-between px-4">
            {!isCollapsed && (
              <h2 className="text-xl leading-loose font-bold">
                Smart Civic Portal
              </h2>
            )}

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:block text-gray-600 hover:text-gray-900"
            >
              <PanelLeft
                size={20}
                className={`transition-transform ${
                  isCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Username */}
          <div className="px-4 mt-3">
            <h2 className="text-lg md:font-semibold">
              <span className="font-semibold text-xl">
                {isCollapsed ? user?.name?.charAt(0) : user?.name}
              </span>
            </h2>
          </div>

          <div className="px-4 mt-2">
            <hr className="border-gray-200" />
          </div>

          {/* Navigation */}
          <div className="flex flex-col justify-between flex-1 px-3 mt-6">
            <nav className="flex-1 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-900 hover:bg-gray-200"
                      }`
                    }
                  >
                    <Icon size={20} />
                    {!isCollapsed && item.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="pb-4 mt-20">
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-gray-900 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                <LogOut size={20} />
                {!isCollapsed && "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <main className="py-6">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComponentName;