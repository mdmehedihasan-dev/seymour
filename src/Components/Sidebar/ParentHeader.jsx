import React from "react";
import { Search, Bell, HelpCircle, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import adminImage from "../../assets/image/adminkickclick.jpg";

const ParentHeader = ({ showDrawer }) => {
  const navigate = useNavigate();
  return (
    <div className="h-16 flex items-center justify-between px-4 md:px-8 bg-[#fafafa] border-b border-gray-100 font-sans">

      {/* Left side: Title & Hamburger */}
      <div className="flex items-center gap-3">
        <button onClick={showDrawer} className="lg:hidden text-gray-500 hover:text-black transition-colors">
          <Menu size={20} strokeWidth={2} />
        </button>
        <h1 className="text-[13px] font-bold text-[#111] tracking-[0.15em] uppercase hidden sm:block">
          KIDPORT ADMIN
        </h1>
      </div>

      {/* Middle: Search Box */}
      <div className="flex-1 max-w-3xl px-4 md:px-12">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 text-gray-400" size={15} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-9 pr-4 text-[13px] text-gray-700 bg-white border-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 transition-shadow"
          />
        </div>
      </div>

      {/* Right side: Icons and Profile */}
      <div className="flex items-center gap-6">
        <button onClick={() => navigate('/notifications')} className="text-gray-500 hover:text-black transition-colors focus:outline-none">
          <Bell size={18} strokeWidth={2} />
        </button>

        <div onClick={() => navigate('/settings')} className="w-8 h-8 rounded-sm overflow-hidden bg-[#1e293b] cursor-pointer shadow-sm hover:opacity-80 transition-opacity">
          <img src={adminImage} alt="Admin Profile" className="w-full h-full object-cover" />
        </div>
      </div>

    </div>
  );
};

export default ParentHeader;

