import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";
import adminImage from "../../assets/image/adminkickclick.jpg";

const Header = () => {
  return (
    <div className="h-16 flex items-center justify-between px-8 bg-[#fafafa] border-b border-gray-100 font-sans">
      
      {/* Left side: Title */}
      <div className="flex items-center">
        <h1 className="text-[13px] font-bold text-[#111] tracking-[0.15em] uppercase">
          KIDPORT ADMIN
        </h1>
      </div>

      {/* Middle: Search Box */}
      <div className="flex-1 max-w-3xl px-12">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 text-gray-400" size={15} strokeWidth={2} />
          <input 
            type="text"
            placeholder="Global search entities..." 
            className="w-full h-10 pl-9 pr-4 text-[13px] text-gray-700 bg-white border-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 transition-shadow"
          />
        </div>
      </div>

      {/* Right side: Icons and Profile */}
      <div className="flex items-center gap-6">
        <button className="text-gray-500 hover:text-black transition-colors focus:outline-none">
          <Bell size={18} strokeWidth={2} />
        </button>
        <button className="text-gray-500 hover:text-black transition-colors focus:outline-none">
          <HelpCircle size={18} strokeWidth={2} />
        </button>
        <div className="w-8 h-8 rounded-sm overflow-hidden bg-[#1e293b] cursor-pointer shadow-sm">
          <img src={adminImage} alt="Admin Profile" className="w-full h-full object-cover" />
        </div>
      </div>
      
    </div>
  );
};

export default Header;
