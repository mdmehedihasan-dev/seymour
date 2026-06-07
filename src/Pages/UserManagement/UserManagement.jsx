import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Loader2, Search, Filter, Mail, Phone, Calendar, Edit, MoreVertical, UserCheck, UserX } from 'lucide-react';

const UserManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  const role = localStorage.getItem("role") || "terminal";

  // Search, Filter, and Pagination State (Terminal)
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Search, Filter, and Pagination State (Dashboard)
  const [dashSearch, setDashSearch] = useState('');
  const [dashRole, setDashRole] = useState('All Roles');
  const [dashStatus, setDashStatus] = useState('All Status');
  const [dashPage, setDashPage] = useState(1);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        setData({
          // Terminal Data
          totalUsers: 1284,
          growthPct: '+12%',
          users: [
            { id: 1, initials: 'JA', name: 'Julianna Abrams', email: 'j.abrams@example.com', role: 'PARENT', status: 'ACTIVE' },
            { id: 2, initials: 'MT', name: 'Marcus Thorne', email: 'm.thorne@careset.io', role: 'PROVIDER', status: 'SUSPENDED' },
            { id: 3, initials: 'SL', name: 'Sarah Lin', email: 'lin.sarah@gmail.com', role: 'SITTER', status: 'ACTIVE' },
            { id: 4, initials: 'WK', name: 'William Kessler', email: 'w.kessler@family.org', role: 'FAMILY', status: 'ACTIVE' }
          ],
          rolesDistribution: [
            { label: 'Parents', percentage: 40 },
            { label: 'Sitters', percentage: 30 },
            { label: 'Providers', percentage: 25 }
          ],
          auditLogs: [
            { time: '12:44 PM', text: <>User <span className="font-bold">j.abrams</span> updated profile security settings</> },
            { time: '11:02 AM', text: <>New registration: <span className="font-bold">linda.v@care.com</span> (Provider)</> }
          ],

          // Dashboard Data
          dashStats: {
            total: "1,247",
            active: "1,089",
            new: "87",
            inactive: "158"
          },
          dashUsers: [
            { id: 1, initials: 'SM', color: 'bg-[#06b6d4]', name: 'Sarah Martinez', email: 'sarah.martinez@email.com', phone: '+1 (555) 123-4567', role: 'Parent', roleColor: 'bg-[#cffafe] text-[#0891b2]', status: 'Active', children: 2, observations: 45, joinDate: 'Jan 15, 2025' },
            { id: 2, initials: 'JD', color: 'bg-[#f97316]', name: 'John Davidson', email: 'john.davidson@email.com', phone: '+1 (555) 234-5678', role: 'Parent', roleColor: 'bg-[#cffafe] text-[#0891b2]', status: 'Active', children: 1, observations: 32, joinDate: 'Feb 3, 2025' },
            { id: 3, initials: 'EC', color: 'bg-[#fca5a5]', name: 'Emily Chen', email: 'emily.chen@email.com', phone: '+1 (555) 345-6789', role: 'Caregiver', roleColor: 'bg-[#fef3c7] text-[#d97706]', status: 'Active', children: 5, observations: 128, joinDate: 'Dec 8, 2024' },
            { id: 4, initials: 'MR', color: 'bg-[#a78bfa]', name: 'Michael Roberts', email: 'michael.roberts@email.com', phone: '+1 (555) 456-7890', role: 'Daycare Provider', roleColor: 'bg-[#ffe4e6] text-[#e11d48]', status: 'Active', children: 15, observations: 342, joinDate: 'Nov 22, 2024' },
            { id: 5, initials: 'JL', color: 'bg-[#fbbf24]', name: 'Jennifer Lee', email: 'jennifer.lee@email.com', phone: '+1 (555) 567-8901', role: 'Parent', roleColor: 'bg-[#cffafe] text-[#0891b2]', status: 'Inactive', children: 1, observations: 12, joinDate: 'Oct 5, 2024' },
            { id: 6, initials: 'DT', color: 'bg-[#15803d]', name: 'David Thompson', email: 'david.thompson@email.com', phone: '+1 (555) 678-9012', role: 'Family Member', roleColor: 'bg-[#d1fae5] text-[#059669]', status: 'Active', children: 2, observations: 18, joinDate: 'Mar 1, 2025' }
          ]
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Filter and Search Logic (Terminal)
  const filteredUsers = useMemo(() => {
    if (!data) return [];
    return data.users.filter(user => {
      const matchesRole = selectedRole === 'All Roles' || user.role.toLowerCase() === selectedRole.toLowerCase();
      const searchLower = globalSearch.toLowerCase();
      const matchesSearch = 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower) ||
        user.initials.toLowerCase().includes(searchLower);
      return matchesRole && matchesSearch;
    });
  }, [data, globalSearch, selectedRole]);

  // Filter and Search Logic (Dashboard)
  const dashFilteredUsers = useMemo(() => {
    if (!data) return [];
    return data.dashUsers.filter(user => {
      const matchesRole = dashRole === 'All Roles' || user.role === dashRole;
      const matchesStatus = dashStatus === 'All Status' || user.status === dashStatus;
      const searchLower = dashSearch.toLowerCase();
      const matchesSearch = 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower);
      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [data, dashSearch, dashRole, dashStatus]);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Loading Directory...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // TERMINAL DASHBOARD
  // ==========================================
  if (role === "terminal") {
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    return (
      <div className="min-h-screen p-8 bg-white font-sans text-[#111]">
        <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">User Management</h1>
              <p className="text-xs text-gray-500">
                Directory of all ecosystem participants and access levels.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-gray-200 hover:bg-gray-300 text-black text-[10px] font-bold tracking-wider uppercase px-5 py-2.5 transition-colors">
                EXPORT CSV
              </button>
              <button className="bg-black hover:bg-gray-800 text-white text-[10px] font-bold tracking-wider uppercase px-5 py-2.5 transition-colors">
                CREATE NEW USER
              </button>
            </div>
          </div>

          <div className="bg-[#f4f4f4] p-6 flex justify-between items-start mb-6">
            <div className="flex gap-8 w-2/3">
              <div className="flex-1">
                <label className="block text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-2">
                  SEARCH DIRECTORY
                </label>
                <input
                  type="text"
                  placeholder="Name, email, or unique ID..."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border-none text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-200 transition-shadow"
                />
              </div>
              <div className="w-48">
                <label className="block text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-2">
                  ROLE
                </label>
                <div className="relative">
                  <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border-none text-[13px] appearance-none focus:outline-none focus:ring-1 focus:ring-gray-200 transition-shadow cursor-pointer"
                  >
                    <option value="All Roles">All Roles</option>
                    <option value="PARENT">Parent</option>
                    <option value="PROVIDER">Provider</option>
                    <option value="SITTER">Sitter</option>
                    <option value="FAMILY">Family</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-end justify-end gap-6 mb-2">
                <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mb-1">TOTAL USERS</span>
                <span className="text-3xl font-bold tracking-tight">{data.totalUsers.toLocaleString()}</span>
              </div>
              <div className="h-1 w-full bg-black mb-1"></div>
              <p className="text-[9px] text-gray-500">{data.growthPct} growth this month</p>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-[#e8e8e8] px-6 py-4 flex items-center">
              <div className="w-1/4 text-[9px] font-bold text-gray-500 tracking-widest uppercase">NAME</div>
              <div className="w-1/4 text-[9px] font-bold text-gray-500 tracking-widest uppercase">EMAIL</div>
              <div className="w-[15%] text-[9px] font-bold text-gray-500 tracking-widest uppercase">ROLE</div>
              <div className="w-1/4 text-[9px] font-bold text-gray-500 tracking-widest uppercase">STATUS</div>
              <div className="w-[10%] text-right text-[9px] font-bold text-gray-500 tracking-widest uppercase">ACTIONS</div>
            </div>
            
            <div className="flex flex-col min-h-[280px]">
              {currentUsers.length > 0 ? (
                currentUsers.map((user, i) => (
                  <div key={user.id} className={`px-6 py-5 flex items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#fbfbfb]'} hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0`}>
                    <div className="w-1/4 flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#e8e8e8] flex items-center justify-center text-[11px] font-bold tracking-wider">
                        {user.initials}
                      </div>
                      <span className="text-[13px] font-bold">{user.name}</span>
                    </div>
                    <div className="w-1/4 text-[13px] text-gray-600 truncate pr-4">
                      {user.email}
                    </div>
                    <div className="w-[15%]">
                      <span className="bg-[#e8e8e8] text-black text-[9px] font-bold px-2 py-1 tracking-widest uppercase">
                        {user.role}
                      </span>
                    </div>
                    <div className="w-1/4 flex items-center gap-2">
                      {user.status === 'ACTIVE' ? (
                        <>
                          <div className="w-1.5 h-1.5 bg-black"></div>
                          <span className="text-[10px] font-bold tracking-widest uppercase">ACTIVE</span>
                        </>
                      ) : (
                        <>
                          <div className="w-1.5 h-1.5 border border-gray-400"></div>
                          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">SUSPENDED</span>
                        </>
                      )}
                    </div>
                    <div className="w-[10%] flex justify-end gap-3 text-[9px] font-bold tracking-widest uppercase">
                      <button className="text-gray-400 hover:text-black hover:underline transition-all">VIEW</button>
                      <button className="text-red-400 hover:text-red-600 transition-colors">DISABLE</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-1 items-center justify-center bg-white text-sm text-gray-400 font-medium">
                  No users found matching your criteria.
                </div>
              )}
            </div>

            <div className="bg-[#f4f4f4] px-6 py-4 flex justify-between items-center mt-2">
              <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">
                SHOWING {totalItems > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, totalItems)} OF {totalItems} USERS
              </span>
              <div className="flex gap-1.5">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-100 transition-colors text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center transition-colors text-[10px] font-bold ${
                      currentPage === page 
                        ? 'bg-black text-white' 
                        : 'bg-white text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="w-8 h-8 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-100 transition-colors text-[10px] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ADMIN DASHBOARD
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 font-sans text-[#1e293b]">
      <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
        
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0f172a] mb-1">User Management</h1>
          <p className="text-[13px] text-[#64748b]">Manage all platform users and their accounts</p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <p className="text-[12px] font-medium text-[#64748b] mb-2">Total Users</p>
            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">{data.dashStats.total}</h3>
            <div className="absolute bottom-0 left-6 right-6 h-1 bg-[#06b6d4]"></div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <p className="text-[12px] font-medium text-[#64748b] mb-2">Active Users</p>
            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">{data.dashStats.active}</h3>
            <div className="absolute bottom-0 left-6 right-6 h-1 bg-[#10b981]"></div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <p className="text-[12px] font-medium text-[#64748b] mb-2">New This Month</p>
            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">{data.dashStats.new}</h3>
            <div className="absolute bottom-0 left-6 right-6 h-1 bg-[#fbbf24]"></div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <p className="text-[12px] font-medium text-[#64748b] mb-2">Inactive</p>
            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">{data.dashStats.inactive}</h3>
            <div className="absolute bottom-0 left-6 right-6 h-1 bg-[#94a3b8]"></div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm flex items-center justify-between gap-4">
          
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={16} />
            <input 
              type="text"
              placeholder="Search by name, email, or phone..."
              value={dashSearch}
              onChange={(e) => setDashSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-gray-100 rounded-full text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-200 transition-colors"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <select 
                value={dashRole}
                onChange={(e) => setDashRole(e.target.value)}
                className="pl-4 pr-10 py-2.5 bg-[#f8fafc] border border-gray-100 rounded-full text-[13px] font-medium text-[#475569] appearance-none focus:outline-none focus:ring-1 focus:ring-gray-200 cursor-pointer min-w-[140px]"
              >
                <option value="All Roles">All Roles</option>
                <option value="Parent">Parent</option>
                <option value="Caregiver">Caregiver</option>
                <option value="Daycare Provider">Daycare Provider</option>
                <option value="Family Member">Family Member</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                value={dashStatus}
                onChange={(e) => setDashStatus(e.target.value)}
                className="pl-4 pr-10 py-2.5 bg-[#f8fafc] border border-gray-100 rounded-full text-[13px] font-medium text-[#475569] appearance-none focus:outline-none focus:ring-1 focus:ring-gray-200 cursor-pointer min-w-[140px]"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
            </div>

            <button className="bg-[#06b6d4] hover:bg-[#0891b2] text-white px-6 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-colors">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-[#f8fafc] text-[10px] font-bold text-[#64748b] tracking-wider uppercase">
            <div className="col-span-3 pl-2">USER</div>
            <div className="col-span-3">CONTACT</div>
            <div className="col-span-2">ROLE</div>
            <div className="col-span-1">STATUS</div>
            <div className="col-span-1">ACTIVITY</div>
            <div className="col-span-1">JOIN DATE</div>
            <div className="col-span-1 text-right pr-2">ACTIONS</div>
          </div>

          <div className="divide-y divide-gray-100">
            {dashFilteredUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                
                {/* User Column */}
                <div className="col-span-3 flex items-center gap-3 pl-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[13px] ${user.color}`}>
                    {user.initials}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#1e293b]">{user.name}</h4>
                    <p className="text-[12px] text-[#94a3b8]">ID: {user.id}</p>
                  </div>
                </div>

                {/* Contact Column */}
                <div className="col-span-3 space-y-1">
                  <div className="flex items-center gap-2 text-[12px] text-[#475569]">
                    <Mail size={12} className="text-[#94a3b8]" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[#475569]">
                    <Phone size={12} className="text-[#94a3b8]" />
                    {user.phone}
                  </div>
                </div>

                {/* Role Column */}
                <div className="col-span-2 flex items-center">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${user.roleColor}`}>
                    {user.role}
                  </span>
                </div>

                {/* Status Column */}
                <div className="col-span-1 flex items-center">
                  {user.status === 'Active' ? (
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#10b981]">
                      <UserCheck size={14} /> Active
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#64748b]">
                      <UserX size={14} /> Inactive
                    </div>
                  )}
                </div>

                {/* Activity Column */}
                <div className="col-span-1">
                  <div className="text-[12px] text-[#1e293b]">{user.children} Children</div>
                  <div className="text-[11px] text-[#94a3b8]">{user.observations} Observations</div>
                </div>

                {/* Join Date Column */}
                <div className="col-span-1 flex items-center gap-2 text-[12px] text-[#475569]">
                  <Calendar size={12} className="text-[#94a3b8]" />
                  {user.joinDate}
                </div>

                {/* Actions Column */}
                <div className="col-span-1 flex items-center justify-end gap-3 pr-2 text-[#94a3b8]">
                  <button className="hover:text-[#06b6d4] transition-colors"><Edit size={16} /></button>
                  <button className="hover:text-[#1e293b] transition-colors"><MoreVertical size={16} /></button>
                </div>

              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[12px] text-[#64748b]">
              Showing 1 to 6 of 1,247 users
            </span>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 text-[13px] font-medium text-[#64748b] bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="w-8 h-8 rounded-full bg-[#06b6d4] text-white text-[13px] font-medium flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded-full bg-white border border-gray-200 text-[#475569] text-[13px] font-medium flex items-center justify-center hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="w-8 h-8 rounded-full bg-white border border-gray-200 text-[#475569] text-[13px] font-medium flex items-center justify-center hover:bg-gray-50 transition-colors">
                3
              </button>
              <button className="px-4 py-1.5 text-[13px] font-medium text-[#64748b] bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
