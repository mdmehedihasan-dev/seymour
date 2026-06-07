import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Smile,
  Brain,
  BarChart2,
  Settings
} from "lucide-react";

const Sidebar = ({ closeDrawer }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutGrid, label: "Dashboard", Link: "/" },
    { icon: Users, label: "Users", Link: "/user-management" },
    { icon: Smile, label: "Children", Link: "/children" },
    { icon: Brain, label: "AI Monitoring", Link: "/ai-monitoring" },
    { icon: BarChart2, label: "Reports", Link: "/reports" },
    { icon: Settings, label: "Settings", Link: "/settings" },
  ];

  return (
    <div className="w-72 bg-[#f4f4f4] h-screen flex flex-col font-sans">
      {/* Sidebar Header */}
      <div className="pt-10 px-8 mb-8">
        <h1 className="text-xl font-bold text-[#111] tracking-tight leading-none mb-1.5">
          KIDport
        </h1>
        <p className="text-[9px] text-gray-400 tracking-[0.15em] uppercase">
          Admin Terminal
        </p>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col px-4 space-y-1">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.Link ||
            (item.Link !== '/' && location.pathname.startsWith(item.Link));

          const Icon = item.icon;

          return (
            <React.Fragment key={item.label}>
              <Link
                to={item.Link}
                onClick={closeDrawer}
                className={`flex items-center gap-3.5 px-4 py-2.5 transition-colors ${isActive
                    ? "text-[#111] font-semibold"
                    : "text-gray-500 hover:text-gray-800 font-medium"
                  }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[13px]">{item.label}</span>
              </Link>
              {/* Specific separator below Dashboard */}
              {index === 0 && (
                <div className="mx-4 my-2 border-b border-[#111]"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-6 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#d4d4d4]"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#111] uppercase tracking-wide leading-tight">
              KIDPORT ADMIN
            </span>
            <span className="text-[9px] text-gray-500 italic mt-0.5">
              v2.4.0-stable
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

