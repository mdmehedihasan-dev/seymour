import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/sign-in");
  };
  return (
    <div className="h-[72px] flex items-center justify-between px-8 bg-white border-b border-gray-100 font-sans">
      
      {/* Left: Search Box */}
      <div className="flex-1 max-w-[500px]">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-4 text-[#94a3b8]" size={18} strokeWidth={2} />
          <input 
            type="text"
            placeholder="Search users, children, observations..." 
            className="w-full h-[42px] pl-11 pr-4 text-[13px] text-gray-700 bg-[#f8fafc] border border-[#e2e8f0] rounded-full focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-white transition-all placeholder:text-[#94a3b8]"
          />
        </div>
      </div>

      {/* Right side: Icons and Profile */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Notification Bell */}
        <button className="relative text-[#64748b] hover:text-[#0f172a] transition-colors focus:outline-none mt-1">
          <Bell size={22} strokeWidth={1.5} />
          <span className="absolute -top-0.5 right-0 w-2.5 h-2.5 bg-[#f87171] rounded-full border-2 border-white"></span>
        </button>
        
        {/* Profile Section */}
        <div 
          onClick={handleLogout}
          className="flex items-center gap-3 cursor-pointer pl-6 border-l border-gray-100 hover:bg-gray-50 p-2 -my-2 rounded-lg transition-colors"
        >
          {/* Avatar */}
          <div className="w-[38px] h-[38px] rounded-full bg-[#00a99d] flex items-center justify-center text-white font-bold text-[14px] shadow-sm">
            AD
          </div>
          {/* Name/Role */}
          <div className="flex flex-col pr-1">
            <span className="text-[13px] font-bold text-[#1e293b] leading-tight">Admin User</span>
            <span className="text-[11px] text-[#64748b]">Super Admin</span>
          </div>
          {/* Chevron */}
          <ChevronDown size={14} className="text-[#94a3b8]" />
        </div>
      </div>
      
    </div>
  );
};

export default AdminHeader;
