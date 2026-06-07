import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

const UserManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  // Search, Filter, and Pagination State
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Mocked comprehensive data
        setData({
          totalUsers: 1284,
          growthPct: '+12%',
          users: [
            // Page 1
            { id: 1, initials: 'JA', name: 'Julianna Abrams', email: 'j.abrams@example.com', role: 'PARENT', status: 'ACTIVE' },
            { id: 2, initials: 'MT', name: 'Marcus Thorne', email: 'm.thorne@careset.io', role: 'PROVIDER', status: 'SUSPENDED' },
            { id: 3, initials: 'SL', name: 'Sarah Lin', email: 'lin.sarah@gmail.com', role: 'SITTER', status: 'ACTIVE' },
            { id: 4, initials: 'WK', name: 'William Kessler', email: 'w.kessler@family.org', role: 'FAMILY', status: 'ACTIVE' },
            // Page 2
            { id: 5, initials: 'CD', name: 'Charles Darwin', email: 'c.darwin@example.com', role: 'PARENT', status: 'ACTIVE' },
            { id: 6, initials: 'EP', name: 'Elena Powell', email: 'e.powell@care.com', role: 'PROVIDER', status: 'ACTIVE' },
            { id: 7, initials: 'RJ', name: 'Richard Jones', email: 'r.jones@mail.com', role: 'SITTER', status: 'SUSPENDED' },
            { id: 8, initials: 'AS', name: 'Anna Smith', email: 'a.smith@family.org', role: 'PARENT', status: 'ACTIVE' },
            // Page 3
            { id: 9, initials: 'BW', name: 'Bruce Wayne', email: 'b.wayne@enterprise.com', role: 'PROVIDER', status: 'ACTIVE' },
            { id: 10, initials: 'CK', name: 'Clark Kent', email: 'c.kent@dailyplanet.com', role: 'SITTER', status: 'ACTIVE' }
          ],
          rolesDistribution: [
            { label: 'Parents', percentage: 40 },
            { label: 'Sitters', percentage: 30 },
            { label: 'Providers', percentage: 25 }
          ],
          auditLogs: [
            { time: '12:44 PM', text: <>User <span className="font-bold">j.abrams</span> updated profile security settings</> },
            { time: '11:02 AM', text: <>New registration: <span className="font-bold">linda.v@care.com</span> (Provider)</> },
            { time: '09:15 AM', text: <>System auto-suspended user <span className="font-bold">k.smith</span> for inactivity</> }
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

  // Filter and Search Logic
  const filteredUsers = useMemo(() => {
    if (!data) return [];
    
    return data.users.filter(user => {
      // Role Filter
      const matchesRole = selectedRole === 'All Roles' || user.role.toLowerCase() === selectedRole.toLowerCase();
      
      // Search Filter
      const searchLower = globalSearch.toLowerCase();
      const matchesSearch = 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower) ||
        user.initials.toLowerCase().includes(searchLower);

      return matchesRole && matchesSearch;
    });
  }, [data, globalSearch, selectedRole]);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [globalSearch, selectedRole]);

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

  // Pagination calculations on filtered list
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen p-8 bg-white font-sans text-[#111]">
      <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
        
        {/* Header Section */}
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

        {/* Filter Bar */}
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

        {/* Table Section */}
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

        {/* Bottom Widgets */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          {/* Roles Distribution */}
          <div className="col-span-1 bg-[#e8e8e8] p-6 flex flex-col justify-between">
            <h3 className="text-[9px] font-bold text-gray-500 tracking-widest uppercase leading-relaxed w-1/2">
              USER ROLES<br/>DISTRIBUTION
            </h3>
            
            <div className="space-y-4 mt-8">
              {data.rolesDistribution.map((dist, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[11px] font-bold mb-2">
                    <span>{dist.label}</span>
                    <span>{dist.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-300 h-0.5">
                    <div className="bg-black h-0.5 transition-all duration-1000" style={{ width: `${dist.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Log Preview */}
          <div className="col-span-3 bg-[#f4f4f4] p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-[9px] font-bold text-black tracking-widest uppercase mb-1">
                  AUDIT LOG PREVIEW
                </h3>
                <p className="text-[10px] text-gray-500">
                  Last activity recorded 4 minutes ago
                </p>
              </div>
              <button className="text-[9px] font-bold text-black tracking-widest uppercase border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">
                FULL LOGS
              </button>
            </div>

            <div className="space-y-4">
              {data.auditLogs.map((log, idx) => (
                <div key={idx} className="flex gap-6 text-[11px]">
                  <span className="font-bold w-16">{log.time}</span>
                  <span className="text-gray-600">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserManagementPage;
